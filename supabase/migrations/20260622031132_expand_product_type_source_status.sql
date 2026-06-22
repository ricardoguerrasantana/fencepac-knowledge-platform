alter table public.product_types
drop constraint if exists product_types_source_status_check;

alter table public.product_types
alter column source_status set default 'needs_review';

alter table public.product_types
add constraint product_types_source_status_check
check (
  source_status in (
    'draft',
    'needs_review',
    'external_research',
    'verified_company_knowledge',
    'unresolved_question',
    'superseded',

    -- temporary legacy values kept so existing production data does not break
    'seeded',
    'reviewed'
  )
);
