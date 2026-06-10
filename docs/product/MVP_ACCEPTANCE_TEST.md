# MVP Acceptance Test

This checklist confirms that Fencepac Knowledge Platform v0.1 works as a local MVP.

## Setup test

- [ ] OrbStack or Docker Desktop is running
- [ ] Supabase local stack starts
- [ ] Database resets successfully from migrations and seed data
- [ ] Next.js app starts locally
- [ ] Lint passes
- [ ] Production build passes

Commands:

```bash
npx supabase start
npx supabase db reset
npm run lint
npm run build
npm run dev
```

## Route test

Open each route:

- [ ] `/`
- [ ] `/wall-systems`
- [ ] `/wall-systems/concrete-crib-walls`
- [ ] `/sources`
- [ ] `/sources/concrete-crib-units-pdf`
- [ ] `/evidence`
- [ ] `/review`
- [ ] `/glossary`
- [ ] `/search`
- [ ] `/training`
- [ ] `/training/retaining-wall-basics`
- [ ] `/governance`

## Wall systems test

- [ ] Wall systems load from Supabase
- [ ] Wall system cards show images
- [ ] Wall system detail pages show:
  - [ ] Description
  - [ ] System type
  - [ ] Typical use
  - [ ] Key components
  - [ ] Installation basics
  - [ ] QA checks
  - [ ] Common risks
  - [ ] Evidence notes
  - [ ] Linked sources

## Source register test

- [ ] Sources page loads
- [ ] Source detail pages load
- [ ] Source detail pages show linked wall systems
- [ ] Source detail pages show evidence notes from that source

## Evidence test

- [ ] Evidence Library loads
- [ ] Filter by `needs_review`
- [ ] Filter by `reviewed`
- [ ] Filter by confidence
- [ ] Evidence notes link to wall systems
- [ ] Evidence notes link to source records

## Review workflow test

- [ ] Open `/review`
- [ ] Add a review decision note
- [ ] Mark an evidence note as reviewed
- [ ] Confirm it disappears from Review Queue
- [ ] Confirm it appears in `/evidence?status=reviewed`
- [ ] Confirm wall system page shows the updated review status

## Search test

Try:

- [ ] `gabion`
- [ ] `geogrid`
- [ ] `crib`
- [ ] `drainage`
- [ ] `surcharge`
- [ ] `sleeper`

Expected:

- [ ] Matching wall systems appear
- [ ] Matching sources appear
- [ ] Matching glossary terms appear

## Training test

Open `/training/retaining-wall-basics`.

Check:

- [ ] Lessons load
- [ ] Related wall systems appear
- [ ] Supporting evidence notes appear
- [ ] Quiz is interactive
- [ ] Quiz calculates score
- [ ] Quiz can reset
- [ ] Competency checklist can be ticked
- [ ] Checklist persists after refresh
- [ ] Checklist can reset

## Governance test

Open `/governance`.

Check:

- [ ] Source counts appear
- [ ] Evidence counts appear
- [ ] Review status counts appear
- [ ] Confidence counts appear
- [ ] Training status counts appear
- [ ] MVP readiness checklist appears

## Legacy route test

Old product routes should redirect:

- [ ] `/products`
- [ ] `/products/concrete-crib-walls`

Expected:

- [ ] Redirects to `/wall-systems`
- [ ] Redirects to `/wall-systems/concrete-crib-walls`

## MVP completion decision

The MVP is accepted when:

- [ ] `npm run lint` passes
- [ ] `npm run build` passes
- [ ] Supabase reset works
- [ ] Main routes load
- [ ] Review workflow works
- [ ] Training quiz/checklist works
- [ ] Governance dashboard loads
- [ ] Repo is committed and pushed
- [ ] Git tag `v0.1-local-mvp` is created and pushed
