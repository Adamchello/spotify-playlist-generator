![githubBannerv2](https://user-images.githubusercontent.com/62244281/224165761-948564e8-5e40-442f-8c59-e904bc2cd528.png)

## Overview 🎉

The playlist generator is a project designed to help music lovers expand their musical horizons by creating personalized playlists that introduce them to new sounds and artists. If you're tired of listening to the same old songs on repeat, this tool is perfect for you.

Whether you're looking for new music to work out to, to study with, or simply to relax, the playlist generator has got you covered. The playlist generator is perfect for anyone looking to break out of their musical comfort zone and discover new sounds and artists. Try it out today and add a little bit of new sound to your Spotify playlist!

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
