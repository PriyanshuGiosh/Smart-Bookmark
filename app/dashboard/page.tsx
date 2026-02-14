'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../Lib/supabaseClient'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'
import BookmarkForm from '@/app/components/BookmarkForm'
import BookmarkList from '@/app/components/BookmarkList'
import { motion } from 'framer-motion'

export interface Bookmark {
    id: string
    title: string
    url: string
    user_id: string
    created_at: string
}

export default function Dashboard() {
    const router = useRouter()

    const [user, setUser] = useState<User | null>(null)
    const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
    const [loading, setLoading] = useState(true)

    /* 🔐 Get User + Initial Bookmarks */
    useEffect(() => {
        const getUserAndBookmarks = async () => {
            const { data } = await supabase.auth.getUser()

            if (!data.user) {
                router.replace('/')
                return
            }

            setUser(data.user)

            const { data: bookmarksData, error } = await supabase
                .from('bookmarks')
                .select('*')
                .eq('user_id', data.user.id)
                .order('created_at', { ascending: false })

            if (error) {
                console.error('Initial fetch error:', error.message)
            }

            if (bookmarksData) {
                setBookmarks(bookmarksData)
            }

            setLoading(false)
        }

        getUserAndBookmarks()
    }, [router])

    /* ⚡ Realtime Subscription */
    useEffect(() => {
        if (!user?.id) return

        const channel = supabase
            .channel(`bookmarks-${user.id}`)
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'bookmarks',
                    filter: `user_id=eq.${user.id}`,
                },
                (payload) => {
                    console.log('Realtime event:', payload)

                    if (payload.eventType === 'INSERT' && payload.new) {
                        setBookmarks((prev) => {
                            if (prev.some((b) => b.id === payload.new.id)) return prev
                            return [payload.new as Bookmark, ...prev]
                        })
                    }

                    if (payload.eventType === 'DELETE' && payload.old) {
                        setBookmarks((prev) =>
                            prev.filter((b) => b.id !== payload.old.id)
                        )
                    }

                    if (payload.eventType === 'UPDATE' && payload.new) {
                        setBookmarks((prev) =>
                            prev.map((b) =>
                                b.id === payload.new.id
                                    ? (payload.new as Bookmark)
                                    : b
                            )
                        )
                    }
                }
            )

        channel.subscribe((status) => {
            console.log('Realtime status:', status)
        })

        return () => {
            supabase.removeChannel(channel)
        }
    }, [user?.id])


    /* 🗑 Delete Handler */
    const handleDelete = async (id: string) => {
        const { error } = await supabase
            .from('bookmarks')
            .delete()
            .eq('id', id)

        if (error) {
            console.error(error.message)
            return
        }

        // ✅ manually remove from state
        setBookmarks((prev) => prev.filter((b) => b.id !== id))
    }




    const logout = async () => {
        await supabase.auth.signOut()
        router.replace('/')
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-linear-to-br from-black to-gray-900">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"
                />
            </div>
        )
    }

    if (!user) return null

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="min-h-screen bg-linear-to-br from-black via-gray-900 to-black text-white p-6 md:p-10"
        >
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-bold">Smart Bookmark</h1>
                        <p className="text-sm text-gray-400 mt-1">
                            Logged in as {user.email}
                        </p>
                    </div>

                    <button
                        onClick={logout}
                        className="px-4 py-2 bg-red-500/10 border border-red-500 text-red-400 rounded-lg hover:bg-red-500/20 transition"
                    >
                        Logout
                    </button>
                </div>

                {/* Stats */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
                    <h2 className="text-lg font-semibold mb-2">Your Statistics</h2>
                    <p className="text-gray-400 text-sm">Total Bookmarks</p>
                    <p className="text-3xl font-bold mt-2">
                        {bookmarks.length}
                    </p>
                </div>

                {/* Add Bookmark */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
                    <h2 className="text-lg font-semibold mb-4">
                        Add New Bookmark
                    </h2>
                    <BookmarkForm user={user} />
                </div>

                {/* List */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <h2 className="text-lg font-semibold mb-4">
                        Your Bookmarks
                    </h2>

                    {bookmarks.length === 0 ? (
                        <p className="text-gray-400 text-sm">
                            No bookmarks yet. Start adding some 🚀
                        </p>
                    ) : (
                        <BookmarkList
                            bookmarks={bookmarks}
                            onDelete={handleDelete}
                        />
                    )}
                </div>
            </div>
        </motion.div>
    )
}
