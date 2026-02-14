'use client'

import { Bookmark } from '@/app/dashboard/page'
import BookmarkCard from './BookmarkCard'

interface Props {
    bookmarks: Bookmark[]   // ✅ plural
    onDelete: (id: string) => void
}

export default function BookmarkList({ bookmarks, onDelete }: Props) {
    return (
        <div className="space-y-4">
            {bookmarks.map((bookmark) => (
                <BookmarkCard
                    key={bookmark.id}
                    bookmark={bookmark}
                    onDelete={onDelete}
                />
            ))}
        </div>
    )
}
