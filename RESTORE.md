# Restore Guide

Use this if setting up the project on a fresh laptop.

## Clone

```bash
git clone https://github.com/ricardoguerrasantana/fencepac-knowledge-platform
cd fencepac-knowledge-platform
```

## Install dependencies

```bash
npm install
```

## Environment

Create `.env.local`:

```bash
cp .env.example .env.local
```

Update `.env.local` with local Supabase values from:

```bash
npx supabase status
```

## Start services

Make sure OrbStack or Docker Desktop is running.

```bash
npx supabase start
npx supabase db reset
npm run dev
```

Open:

```text
http://localhost:3000
```

Supabase Studio:

```text
http://127.0.0.1:54323
```

## Check

```bash
npm run lint
```

## Normal development loop

```bash
npm run dev
```

After changes:

```bash
npm run lint
git status
git add .
git commit -m "Describe the change"
git push
```

## Notes

- `.env.local` is not backed up to GitHub.
- Supabase local database state is recreated from migrations and `supabase/seed.sql`.
- Temporary images are for local MVP testing only.
- Do not commit confidential Fencepac documents unless approval is given.
