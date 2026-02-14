'use client'

import { useState } from 'react'
import { supabase } from '../Lib/supabaseClient'
import { User } from '@supabase/supabase-js'
import { motion } from 'framer-motion'

interface Props {
    user: User
}

export default function BookmarkForm({ user }: Props) {
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [error, setError] = useState('')

    const isValidUrl = (value: string) => {
        try {
            new URL(value)
            return true
        } catch {
            return false
        }
    }

    const addBookmark = async () => {
        if (!title || !url) return

        if (!isValidUrl(url)) {
            setError('Invalid URL')
            return
        }

        setError('')

        const { error } = await supabase
            .from('bookmarks')
            .insert({
                title,
                url,
                user_id: user.id,
            })

        if (error) {
            setError(error.message)
            return
        }

        setTitle('')
        setUrl('')
    }

    return (
        <motion.div>
            <div className="flex gap-2">
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    className="p-2 rounded bg-gray-800 w-1/3"
                />

                <input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="p-2 rounded bg-gray-800 w-2/3"
                />

                <button
                    onClick={addBookmark}
                    className="bg-blue-600 px-4 rounded"
                >
                    Add
                </button>
            </div>

            {error && (
                <p className="text-red-400 text-sm mt-2">{error}</p>
            )}
        </motion.div>
    )
}
