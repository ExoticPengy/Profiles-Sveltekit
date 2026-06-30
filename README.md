# Profiles 🔗

> Your own link-in-bio page — like Linktree — that you build in a few clicks.

🔗 **Live:** [profiles.exoticpengy.me](https://profiles.exoticpengy.me)

## About

One link to share everywhere. Sign in, claim a username, add a photo and a short bio, then collect all your important links onto a single clean page you can hand out on any platform.

What you can do:

- **Sign in with Google** — no new password to remember
- **Claim a username** — pick your `@handle`, checked for availability as you type
- **Add a profile photo** — upload with a live preview and progress bar
- **Manage your links** — add, delete, and **drag to reorder** them
- **Write a bio** — a short intro, validated up to 260 characters
- **Go public or stay private** — flip a switch to publish or hide your page
- **Recognizable icons** — Twitter, YouTube, TikTok, LinkedIn, GitHub, and custom URLs
- **Dark theme** — clean, easy on the eyes

Your finished page lives at `/@yourname` — share that, and visitors see your photo, bio, and links.

---

## Tech

| Layer | Technology |
|-------|-----------|
| Framework | SvelteKit 2 (Svelte 4) |
| Language | TypeScript |
| Styling | Tailwind CSS + DaisyUI |
| Auth | Firebase Authentication (Google) with server-side session cookies |
| Database | Firebase Firestore |
| Storage | Firebase Storage |
| Hosting | Vercel (`@sveltejs/adapter-vercel`) |

Usernames are enforced unique via a dedicated `usernames` collection (`{ username: uid }`); profile data lives in `users` (`{ username, bio, photoURL, published, links[] }`).

### Run locally

```bash
npm install
npm run dev      # SvelteKit dev server
npm run build    # build for Vercel
```

Create a Firebase project with Authentication (Google), Firestore, and Storage, then set the Firebase Admin SDK credentials as environment variables (used in `src/lib/server/admin.ts`).
