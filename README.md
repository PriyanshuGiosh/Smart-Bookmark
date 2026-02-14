Smart Bookmark App

A simple full-stack bookmark manager built using Next.js App Router, Supabase, and Tailwind CSS.

This project allows users to securely log in using Google OAuth, manage private bookmarks, and experience real-time updates across browser tabs.

🚀 Live Demo

Deployed on Vercel
(Add your live URL here)

🛠 Tech Stack

Frontend: Next.js (App Router)

Authentication: Supabase Auth (Google OAuth only)

Database: Supabase PostgreSQL

Realtime: Supabase Realtime (Postgres changes)

Styling: Tailwind CSS

Deployment: Vercel

✨ Features
🔐 Authentication

Google OAuth login only

No email/password authentication

Session managed by Supabase

📌 Bookmark Management

Add a bookmark (URL + Title)

Delete your own bookmarks

Each bookmark is private per user

🔄 Realtime Updates

When a bookmark is added, it updates instantly across multiple open tabs

Realtime implemented using Supabase postgres_changes

Only listens to changes for the logged-in user

🗑 Delete Behavior

Delete is handled manually (optimistic UI update)

When a user deletes a bookmark:

It is immediately removed from local state

Then removed from the database

Delete does not rely on realtime syncing (manual UI update for better responsiveness)

🧠 How It Works
1️⃣ Authentication Flow

User logs in using Google OAuth via Supabase

Supabase creates and manages user session

User ID is used to associate bookmarks

2️⃣ Database Structure

Table: bookmarks

Column	Type
id	uuid (PK)
title	text
url	text
user_id	uuid (FK)
3️⃣ Row Level Security (RLS)

RLS is enabled to ensure data privacy.

Policies:

Users can select their own bookmarks

Users can insert their own bookmarks

Users can delete their own bookmarks

Policy condition:

auth.uid() = user_id


This ensures:

User A cannot see User B’s bookmarks

Users can only modify their own data

4️⃣ Realtime Workflow

Supabase Realtime listens to database changes:

On INSERT → Adds new bookmark to state

Filtered by user_id

Uses Supabase channel subscription

This enables:

Instant syncing across browser tabs

No page refresh required

5️⃣ Delete Workflow

Delete works as:

Remove bookmark from local state (instant UI response)

Send delete request to Supabase

Database removes record

This approach prevents delay in UI updates.

📂 Project Structure (Simplified)
app/
├── login/
├── dashboard/
├── layout.tsx
└── page.tsx

lib/
└── supabaseClient.ts

⚙️ Environment Variables

Add in .env.local:

NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key


Also configure these in Vercel dashboard.

🚀 Deployment

Push project to GitHub

Import repository into Vercel

Add environment variables

Deploy

🧩 Challenges Faced

Handling realtime updates without duplicating bookmarks

Managing state correctly with Supabase subscriptions

Fixing TypeScript prop mismatch errors

Ensuring RLS policies correctly restrict user data

Debugging delete functionality and syncing behavior

⏳ Time Taken

Completed within the 72-hour requirement.

📌 Future Improvements

Edit bookmark feature

Loading states

Toast notifications

Better error handling

UI enhancements

👨‍💻 Author

Priyanshu Ghosh