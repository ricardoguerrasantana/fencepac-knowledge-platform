insert into storage.buckets (id, name, public)
values ('source-files', 'source-files', false)
on conflict (id) do nothing;

alter table public.sources
add column if not exists source_kind text default 'manual_reference',
add column if not exists external_url text,
add column if not exists storage_bucket text,
add column if not exists storage_path text,
add column if not exists original_file_name text,
add column if not exists file_mime_type text,
add column if not exists file_size_bytes bigint,
add column if not exists uploaded_at timestamptz,
add column if not exists is_confidential boolean default false,
add column if not exists notes text;

alter table public.sources
drop constraint if exists sources_source_kind_check;

alter table public.sources
add constraint sources_source_kind_check
check (
  source_kind in (
    'manual_reference',
    'external_link',
    'uploaded_file'
  )
);
