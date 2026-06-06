create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.product_types (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category text not null,
  system_type text not null,
  short_description text not null,
  typical_use text,
  key_components text[] not null default '{}',
  installation_basics text[] not null default '{}',
  qa_checks text[] not null default '{}',
  common_risks text[] not null default '{}',
  source_status text not null default 'needs_review'
    check (source_status in ('seeded', 'needs_review', 'reviewed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger product_types_set_updated_at
before update on public.product_types
for each row execute function public.set_updated_at();

create table public.sources (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  source_type text not null
    check (source_type in ('pdf', 'docx', 'image', 'web', 'email', 'manual', 'drawing', 'other')),
  source_owner text,
  supplier text,
  url text,
  local_file_name text,
  status text not null default 'needs_review'
    check (status in (
      'external_reference',
      'company_source',
      'draft_not_for_construction',
      'needs_review',
      'reviewed',
      'superseded'
    )),
  notes text,
  is_confidential boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger sources_set_updated_at
before update on public.sources
for each row execute function public.set_updated_at();

create table public.product_sources (
  product_type_id uuid not null references public.product_types(id) on delete cascade,
  source_id uuid not null references public.sources(id) on delete cascade,
  relationship_type text not null default 'reference'
    check (relationship_type in (
      'primary',
      'supplier_example',
      'reference',
      'image_example',
      'manual',
      'brochure',
      'training_source'
    )),
  note text,
  created_at timestamptz not null default now(),
  primary key (product_type_id, source_id)
);

create table public.glossary_terms (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  term text not null,
  plain_definition text not null,
  technical_note text,
  related_product_slugs text[] not null default '{}',
  source_status text not null default 'seeded'
    check (source_status in ('seeded', 'needs_review', 'reviewed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger glossary_terms_set_updated_at
before update on public.glossary_terms
for each row execute function public.set_updated_at();

create table public.training_modules (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null,
  module_status text not null default 'draft'
    check (module_status in ('draft', 'reviewed', 'published')),
  estimated_minutes integer not null default 30,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger training_modules_set_updated_at
before update on public.training_modules
for each row execute function public.set_updated_at();

create table public.training_lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.training_modules(id) on delete cascade,
  lesson_order integer not null,
  title text not null,
  summary text not null,
  content text not null,
  related_product_slugs text[] not null default '{}',
  source_status text not null default 'seeded'
    check (source_status in ('seeded', 'needs_review', 'reviewed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (module_id, lesson_order)
);

create trigger training_lessons_set_updated_at
before update on public.training_lessons
for each row execute function public.set_updated_at();

create table public.quiz_questions (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.training_modules(id) on delete cascade,
  question_order integer not null,
  question text not null,
  options jsonb not null,
  correct_answer text not null,
  explanation text not null,
  source_status text not null default 'seeded'
    check (source_status in ('seeded', 'needs_review', 'reviewed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (module_id, question_order)
);

create trigger quiz_questions_set_updated_at
before update on public.quiz_questions
for each row execute function public.set_updated_at();

create index product_types_slug_idx on public.product_types(slug);
create index sources_slug_idx on public.sources(slug);
create index glossary_terms_slug_idx on public.glossary_terms(slug);
create index training_modules_slug_idx on public.training_modules(slug);
