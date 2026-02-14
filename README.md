Smart Bookmark App

A modern, full-stack bookmark manager built with Next.js App Router, Supabase, and Tailwind CSS.

Smart Bookmark enables users to securely authenticate using Google OAuth, manage private bookmarks, and experience seamless real-time synchronization across multiple browser tabs.

🌐 Live Demo

🔗 https://bookmark-nine-pied.vercel.app

Deployed on Vercel

🛠 Tech Stack

Frontend: Next.js (App Router)

Authentication: Supabase Auth (Google OAuth)

Database: Supabase PostgreSQL

Realtime: Supabase Realtime (postgres_changes)

Styling: Tailwind CSS

Deployment: Vercel

✨ Features
🔐 Authentication

Google OAuth login only

No email/password authentication

Secure session management via Supabase

📌 Bookmark Management

Add bookmarks (Title + URL)

Delete your own bookmarks

Fully private bookmarks per user

Secured using Row Level Security (RLS)

🔄 Real-Time Updates

Instant sync across multiple open tabs

Powered by Supabase Realtime (postgres_changes)

Subscriptions filtered by user_id

No page refresh required

🗑 Optimized Delete Workflow

To ensure better responsiveness:

Bookmark is immediately removed from local state (Optimistic UI)

Delete request is sent to Supabase

Database record is removed

This prevents UI delay and improves user experience.

🧠 Architecture & Implementation
1️⃣ Authentication Flow

User logs in via Google OAuth using Supabase

Supabase manages session lifecycle

user_id is used to associate bookmarks

2️⃣ Database Structure

Table: bookmarks

Column	Type	Description
id	uuid (PK)	Bookmark ID
title	text	Bookmark title
url	text	Bookmark URL
user_id	uuid (FK)	Associated user
3️⃣ Row Level Security (RLS)

RLS is enabled to enforce strict data privacy.

Policies Implemented:

Users can select their own bookmarks

Users can insert their own bookmarks

Users can delete their own bookmarks

Policy Condition:

auth.uid() = user_id


This ensures:

Users cannot access others' bookmarks

Full data isolation per account

4️⃣ Realtime Workflow

Supabase Realtime listens for:

INSERT events → Adds new bookmark to state

Filtered by user_id

This enables:

Instant cross-tab synchronization

Clean, efficient state updates

No duplicate data rendering

📂 Project Structure
app/
├── login/
├── dashboard/
├── layout.tsx
└── page.tsx

lib/
└── supabaseClient.ts

⚙️ Environment Variables

Create a .env.local file:

NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key


Add the same variables in your Vercel dashboard before deployment.

🚀 Deployment

Push project to GitHub

Import repository into Vercel

Add environment variables

Deploy

🧩 Challenges & Solutions

Preventing duplicate bookmarks during realtime sync

Managing Supabase channel subscriptions efficiently

Handling optimistic UI updates correctly

Fixing TypeScript prop mismatches

Configuring secure and correct RLS policies

⏳ Development Timeline

Completed within the 72-hour requirement.

🔮 Future Improvements

✏️ Edit bookmark feature

🔄 Loading states

🔔 Toast notifications

🛡 Improved error handling

🎨 Enhanced UI/UX

👨‍💻 Author

Priyanshu Ghosh
