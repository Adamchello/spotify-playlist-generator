## Overview 🎉

The Spotify playlist generator app that creates random playlist based on user's selected genre.

## Technologies 🔧

- Next.js (React)
- TypeScript
- Prisma
- NextAuth
- Tailwind
- Spotify API

## App functionalities 🦾

- Authentication via email and password
- Database handling with prisma
- Generating playlist with random songs using Spotify API

## App overview 🎥

https://user-images.githubusercontent.com/62244281/223718011-13283264-57c2-48b7-a79c-c8b16f98cb96.mov

## Installation 💾

```bash
git clone https://github.com/Adamchello/spotify-playlist-generator.git
```

Fill your `.env` variables:

```
# https://developer.spotify.com/dashboard/applications
SPOTIFY_CLIENT_ID =
SPOTIFY_CLIENT_SECRET =

DATABASE_URL =

# https://next-auth.js.org/configuration/options
NEXTAUTH_URL =
NEXTAUTH_SECRET =

# development or production
NODE_ENV =
```

Install deps:

```bash
npm install
```

Generate Prisma Client:

```bash
npx prisma generate
```

Run Next dev server:

```bash
npm run dev
```

## Live 🖥️

https://spotify-playlist-generator-app.vercel.app/
