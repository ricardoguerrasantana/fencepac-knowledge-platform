# Claude Instructions - Fencepac Knowledge Platform

You are helping implement a Next.js + Supabase app.

## Working style

- Make small, reviewable changes.
- Explain what files changed.
- Do not rewrite the whole app unless asked.
- Keep TypeScript strict and clean.
- Prefer simple server components where possible.
- Use Tailwind CSS for styling.
- Keep UI clean, practical, construction/engineering focused.

## Hard rules

- Do not use SQLite.
- Do not add authentication yet.
- Do not add AI chat yet.
- Do not add Microsoft 365 integration yet.
- Do not commit or expose .env.local.
- Do not create fake engineering claims.
- Product pages must show source status and source links/cards.
- Draft/not-for-construction material must be visibly marked.

## Current MVP

Build:
- Home dashboard
- Products index
- Product detail pages
- Sources register
- Glossary
- Training module index
- Retaining Wall Basics module

## Database

Use Supabase Postgres.
Use migrations and seed data.
Keep schema simple first.
