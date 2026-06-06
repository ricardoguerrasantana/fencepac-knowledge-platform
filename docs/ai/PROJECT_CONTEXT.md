# Fencepac Knowledge Platform - Project Context

## Purpose

Fencepac Knowledge Platform is a local-first web app for organising retaining wall knowledge, source documents, photos, product topics, glossary terms, and training content.

The first version is a simple internal knowledge browser. It has no login, no roles, no AI chat, and no Microsoft 365 integration yet.

## MVP Goal

Workers should be able to:
- Open the web app locally
- Browse retaining wall product/system topics
- View source-backed product notes
- Search glossary terms
- Open source cards
- Complete a simple Retaining Wall Basics training module

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Supabase local Postgres
- Supabase seed data
- Future deployment target: Vercel + hosted Supabase

## First Product Topics

1. Crib Walls
2. Cut Sandstone Walls
3. Keystone 133 Elite
4. MagnumStone
5. Gabion Gravity Walls
6. Gabion Reinforced Earth / MSE
7. Terra Mesh Natural
8. Terra Mesh Rock Faced
9. Geogrid Reinforced Earth Slopes
10. Concrete Panel Walls
11. Concrete Sleeper Walls
12. Holmview TerraMesh Case Study

## Important Content Rules

- Do not present content as final engineering advice.
- Mark draft drawings and not-for-construction documents clearly.
- Every product page should show its source documents.
- Keep supplier/external content separate from Fencepac/company-specific content.
- Do not commit .env.local or secrets to GitHub.
- Do not commit confidential source documents unless approval is given.
