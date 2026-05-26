# Profiles · SvelteKit

A link-in-bio profile page builder — like Linktree — built with SvelteKit. Sign in with Google, claim a username, upload a photo, and share a personalized page of links.

## Features

- **Google Sign-In** — Firebase Authentication with server-side session cookies
- **Username Registration** — Unique @handle with real-time availability checking
- **Profile Photo Upload** — Firebase Storage with live preview and progress
- **Link Management** — Add, reorder (drag-and-drop), and delete social/media links
- **Bio Editor** — Server-side form with 260-character validation
- **Public/Private Toggle** — Publish or hide your profile
- **Custom Icons** — Twitter, YouTube, TikTok, LinkedIn, GitHub, plus custom URLs
- **Dark Theme** — Tailwind CSS + DaisyUI

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | SvelteKit 2 (Svelte 4) |
| Language | TypeScript |
| Styling | Tailwind CSS + DaisyUI |
| Auth | Firebase Authentication (Google pop-up) |
| Database | Firebase Firestore |
| Storage | Firebase Storage |
| Hosting | Vercel (`@sveltejs/adapter-vercel`) |

## Firebase Collections

- **`usernames`** — `{ username: uid }` for uniqueness enforcement
- **`users`** — `{ username, bio, photoURL, published, links[] }`

## Setup

1. `npm install`
2. Create a Firebase project with Authentication (Google), Firestore, and Storage
3. Set environment variables for Firebase Admin SDK credentials (used in `src/lib/server/admin.ts`)
4. `npm run dev` — starts the SvelteKit dev server
5. `npm run build` — builds for Vercel deployment

## Routes

`/` → `/login` → `/login/username` → `/login/photo` → `/[username]` → `/[username]/edit` → `/[username]/bio`
