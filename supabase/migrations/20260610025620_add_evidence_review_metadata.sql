alter table public.evidence_notes
add column if not exists reviewed_at timestamptz,
add column if not exists review_decision_note text;
