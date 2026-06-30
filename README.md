<h1 align="center">🔗 Profiles</h1>
<h3 align="center"><em>Your own link-in-bio page — like Linktree — built in a few clicks.</em></h3>

<p align="center">
  <a href="https://profiles.exoticpengy.me"><img src="https://img.shields.io/badge/live-profiles.exoticpengy.me-FF3E00?style=for-the-badge&logo=svelte" alt="Live"/></a>
  <img src="https://img.shields.io/badge/SvelteKit-2-FF3E00?style=for-the-badge&logo=svelte" alt="SvelteKit"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Tailwind%20%2B%20DaisyUI-06B6D4?style=for-the-badge&logo=tailwindcss" alt="Tailwind + DaisyUI"/>
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase" alt="Firebase"/>
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel" alt="Vercel"/>
</p>

---

## 📖 About The Project

**Profiles** is a link-in-bio page builder — like Linktree. One link to share everywhere: sign in, claim a username, add a photo and a short bio, then collect all your important links onto a single clean page you can hand out on any platform.

It's built with **SvelteKit 2** and **TypeScript**, styled with **Tailwind CSS + DaisyUI**, and powered by **Firebase** for authentication, data, and image storage. Sign-in uses Google with **server-side session cookies**, so protected pages render securely on the server. It's deployed on **Vercel** and live at **[profiles.exoticpengy.me](https://profiles.exoticpengy.me)**.

---

## ✨ Features

|  | Feature | Description |
|--|---------|-------------|
| 🔐 | **Google Sign-In** | Firebase Authentication with server-side session cookies. |
| 🏷️ | **Username Registration** | Claim a unique `@handle`, checked for availability as you type. |
| 📸 | **Profile Photo Upload** | Upload to Firebase Storage with a live preview and progress bar. |
| 🔗 | **Link Management** | Add, delete, and **drag to reorder** your links. |
| 📝 | **Bio Editor** | A server-validated bio, up to 260 characters. |
| 👁️ | **Public / Private Toggle** | Publish your page or keep it hidden with one switch. |
| 🎨 | **Custom Icons** | Twitter, YouTube, TikTok, LinkedIn, GitHub, plus custom URLs. |
| 🌙 | **Dark Theme** | A clean, easy-on-the-eyes look out of the box. |

---

## 🧭 User Flow

```
   ┌──────────┐
   │    /     │  landing
   └────┬─────┘
        ▼
   ┌──────────┐
   │  /login  │  Google sign-in
   └────┬─────┘
        ▼
   ┌──────────────────┐
   │ /login/username  │  claim @handle (availability checked)
   └────┬─────────────┘
        ▼
   ┌──────────────────┐
   │ /login/photo     │  upload profile photo
   └────┬─────────────┘
        ▼
   ┌──────────────────┐      ┌────────────────────┐
   │ /[username]      │◄────►│ /[username]/edit   │  links + drag-reorder
   │ public page      │      ├────────────────────┤
   └──────────────────┘      │ /[username]/bio    │  edit bio
                             └────────────────────┘
```

---

## 🛠️ Technology Stack

| Category | Technology | Purpose |
|:---------|:-----------|:--------|
| **Framework** | SvelteKit 2 (Svelte 4) | Full-stack framework with SSR |
| **Language** | TypeScript | Type-safe development |
| **Styling** | Tailwind CSS + DaisyUI | Utility-first styling + components |
| **Auth** | Firebase Authentication (Google) | Sign-in with server session cookies |
| **Database** | Firebase Firestore | Profile and username data |
| **Storage** | Firebase Storage | Profile photos |
| **Admin** | firebase-admin | Server-side session verification |
| **Hosting** | Vercel (`@sveltejs/adapter-vercel`) | Deployment |

---

## 📂 Project Structure

```
Profiles-Sveltekit/
└── src/
    ├── hooks.server.ts                 # Session handling on every request
    ├── lib/
    │   ├── firebase.ts                 # Client Firebase init
    │   ├── server/admin.ts             # Firebase Admin (server-only)
    │   ├── components/
    │   │   ├── SortableList.svelte      # Drag-and-drop link reordering
    │   │   ├── UserLink.svelte          # A single rendered link
    │   │   ├── AuthCheck.svelte         # Guard for signed-in UI
    │   │   └── AnimatedRoute.svelte     # Page transitions
    │   └── actions/imageFallback.ts     # Image error fallback
    └── routes/
        ├── +page.svelte                # Landing
        ├── login/                      # Sign-in → username → photo
        ├── api/signin/+server.ts       # Session cookie endpoint
        └── [username]/                 # Public page, edit, bio
```

### Firebase Collections

- **`usernames`** — `{ username: uid }`, enforcing handle uniqueness
- **`users`** — `{ username, bio, photoURL, published, links[] }`

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- A **Firebase** project with Authentication (Google), Firestore, and Storage

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ExoticPengy/Profiles-Sveltekit.git
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure Firebase** — set the Firebase Admin SDK credentials as environment variables (used in `src/lib/server/admin.ts`), and your client config in `src/lib/firebase.ts`.

4. **Run**

   ```bash
   npm run dev      # dev server
   npm run build    # build for Vercel
   ```

---

## 📝 License

Private project — all rights reserved.
