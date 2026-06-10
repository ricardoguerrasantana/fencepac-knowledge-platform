# Fencepac Knowledge Platform

Local MVP knowledge and training platform for retaining wall systems.

This app organises retaining wall systems, sources, evidence notes, review status, glossary terms, search, training, quiz, competency checklist and governance dashboard.

## Current MVP scope

The current version is local-first and has no login, no roles, no Microsoft 365 integration and no AI chat.

Included:

- Wall systems catalogue
- Wall system detail pages
- Source register
- Source detail pages
- Evidence notes
- Review Queue
- Evidence Library
- Glossary
- Search
- Training module
- Interactive quiz
- Competency checklist
- Governance dashboard

## Tech stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Supabase local Postgres
- Supabase migrations and seed data
- OrbStack or Docker-compatible runtime
- Private GitHub repo backup

## Local project path

```bash
/Users/pradhanaholdings/MEGA/Fencepac/Dev/fencepac-knowledge-platform
```

## Prerequisites

Install:

- Node.js
- npm
- Git
- GitHub CLI or normal GitHub access
- OrbStack or Docker Desktop
- Supabase CLI

OrbStack or Docker Desktop must be running before Supabase local services can start.

## Environment variables

Create `.env.local` from `.env.example`:

```bash
cp .env.example .env.local
```

Local Supabase values usually look like this:

```env
DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:54322/postgres"

NEXT_PUBLIC_SUPABASE_URL="http://127.0.0.1:54321"
NEXT_PUBLIC_SUPABASE_ANON_KEY="replace_with_local_publishable_key"

SUPABASE_SERVICE_ROLE_KEY="replace_with_local_secret_key"
```

Do not commit `.env.local`.

## Start local development

```bash
npm install
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

## Useful routes

```text
/                                  Dashboard
/wall-systems                      Wall systems catalogue
/sources                           Source register
/evidence                          Evidence Library
/review                            Review Queue
/glossary                          Glossary
/search                            Search
/training                          Training module index
/training/retaining-wall-basics    Retaining Wall Basics module
/governance                        Governance Dashboard
```

## Development checks

Run before every commit:

```bash
npm run lint
npm run dev
```

## Git workflow

After a working change:

```bash
git status
git add .
git commit -m "Describe the change"
git push
```

## Fresh laptop restore

1. Install Homebrew, Node.js, Git, OrbStack and Supabase CLI.
2. Start OrbStack.
3. Clone the private repo:

```bash
git clone <PRIVATE_REPO_URL>
cd fencepac-knowledge-platform
```

4. Install dependencies:

```bash
npm install
```

5. Create `.env.local`:

```bash
cp .env.example .env.local
```

6. Start Supabase:

```bash
npx supabase start
```

7. Reset database from migrations and seed data:

```bash
npx supabase db reset
```

8. Run the app:

```bash
npm run dev
```

9. Open:

```text
http://localhost:3000
```

## Important limitations

This MVP is not engineering advice.

Supplier brochures, seeded notes, temporary images and draft content must not be treated as final company-approved knowledge until reviewed by the appropriate person.

Temporary third-party images are for local MVP testing only and should be replaced with approved Fencepac project photos or licensed images before public deployment.

## Future work

- Add login and roles
- Add Supabase Auth
- Add new starter progress tracking
- Add Supabase Storage for controlled file uploads
- Add Microsoft Graph integration for SharePoint, OneDrive, Teams and Outlook content
- Add document ingestion
- Add source extraction workflow
- Add AI-assisted evidence drafting
- Add reviewer approval workflow with audit trail
- Add deployment to Vercel and hosted Supabase
