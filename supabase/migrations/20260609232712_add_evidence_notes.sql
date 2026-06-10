create table if not exists public.evidence_notes (
  id uuid primary key default gen_random_uuid(),

  product_type_id uuid references public.product_types(id) on delete cascade,
  source_id uuid references public.sources(id) on delete set null,

  title text not null,
  body text not null,

  evidence_type text not null default 'general_note'
    check (evidence_type in (
      'general_note',
      'component_note',
      'installation_note',
      'qa_note',
      'safety_note',
      'terminology_note',
      'risk_note'
    )),

  page_reference text,
  section_reference text,

  confidence text not null default 'medium'
    check (confidence in ('low', 'medium', 'high')),

  review_status text not null default 'needs_review'
    check (review_status in ('draft', 'needs_review', 'reviewed', 'superseded')),

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  check (product_type_id is not null or source_id is not null)
);

create trigger evidence_notes_set_updated_at
before update on public.evidence_notes
for each row execute function public.set_updated_at();

create index if not exists evidence_notes_product_type_id_idx
on public.evidence_notes(product_type_id);

create index if not exists evidence_notes_source_id_idx
on public.evidence_notes(source_id);

create index if not exists evidence_notes_review_status_idx
on public.evidence_notes(review_status);
