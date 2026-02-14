'use client'

import { Bookmark } from '@/app/dashboard/page'
import { motion } from 'framer-motion'

interface Props {
    bookmark: Bookmark
    onDelete: (id: string) => void
}

export default function BookmarkCard({ bookmark, onDelete }: Props) {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800 p-4 rounded-xl border border-white/10 flex justify-between items-center hover:bg-gray-700 transition"
        >
            <div>
                <p className="font-semibold text-white">
                    {bookmark.title}
                </p>
                <a
                    href={bookmark.url}
                    target="_blank"
                    className="text-blue-400 text-sm hover:underline"
                >
                    {bookmark.url}
                </a>
            </div>

            <button
                onClick={() => onDelete(bookmark.id)}
                className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition"
            >
                Delete
            </button>
        </motion.div>
    )
}
