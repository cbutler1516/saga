-- Foundry Client Portal — future-ready schema
-- Run after enabling Supabase Auth and mapping portal users to companies.
-- TODO: Implement RLS policies before exposing any client-facing API routes.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- client_companies
-- ---------------------------------------------------------------------------
create table if not exists public.client_companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  status text not null default 'active',
  nmls_company_id text null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.client_companies is
  'Foundry client mortgage companies with portal access.';

-- TODO RLS: enable row level security on client_companies.
-- TODO RLS policy: authenticated portal users may select only their company row
--   where client_users.auth_user_id = auth.uid() and client_users.company_id = id.

-- ---------------------------------------------------------------------------
-- client_users
-- ---------------------------------------------------------------------------
create table if not exists public.client_users (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.client_companies (id) on delete cascade,
  auth_user_id uuid not null,
  email text not null,
  full_name text null,
  role text not null default 'member',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (auth_user_id)
);

create index if not exists client_users_company_id_idx
  on public.client_users (company_id);

comment on table public.client_users is
  'Portal users linked to Supabase Auth identities and client companies.';

-- TODO RLS: enable row level security on client_users.
-- TODO RLS policy: users may read/update their own client_users row (auth_user_id = auth.uid()).
-- TODO RLS policy: company admins may read users within the same company_id.

-- ---------------------------------------------------------------------------
-- client_documents
-- ---------------------------------------------------------------------------
create table if not exists public.client_documents (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.client_companies (id) on delete cascade,
  category text not null,
  name text not null,
  storage_path text not null,
  uploaded_by uuid null references public.client_users (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists client_documents_company_id_idx
  on public.client_documents (company_id);

create index if not exists client_documents_category_idx
  on public.client_documents (category);

comment on table public.client_documents is
  'Metadata for client document vault files. Binary storage via Supabase Storage private buckets.';

-- TODO RLS: enable row level security on client_documents.
-- TODO RLS policy: portal users may select documents where company_id matches their company.
-- TODO RLS policy: restrict inserts/updates to authorized roles within company.
-- TODO: Never create public storage URLs for client documents.

-- ---------------------------------------------------------------------------
-- client_tasks
-- ---------------------------------------------------------------------------
create table if not exists public.client_tasks (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.client_companies (id) on delete cascade,
  title text not null,
  status text not null default 'open',
  due_date date null,
  priority text not null default 'medium',
  owner_label text null,
  compliance_area text null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists client_tasks_company_id_idx
  on public.client_tasks (company_id);

create index if not exists client_tasks_due_date_idx
  on public.client_tasks (due_date);

comment on table public.client_tasks is
  'Compliance and operating tasks visible in the client portal.';

-- TODO RLS: enable row level security on client_tasks.
-- TODO RLS policy: portal users may read tasks for their company_id only.

-- ---------------------------------------------------------------------------
-- client_compliance_status
-- ---------------------------------------------------------------------------
create table if not exists public.client_compliance_status (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.client_companies (id) on delete cascade,
  overall_status text not null,
  policy_library_status text null,
  mcr_hmda_status text null,
  licensing_status text null,
  exam_readiness_status text null,
  open_items integer not null default 0,
  last_review_date date null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (company_id)
);

comment on table public.client_compliance_status is
  'Aggregated compliance readiness snapshot per client company.';

-- TODO RLS: enable row level security on client_compliance_status.
-- TODO RLS policy: portal users may read the row where company_id matches their company.

-- ---------------------------------------------------------------------------
-- client_metrics
-- ---------------------------------------------------------------------------
create table if not exists public.client_metrics (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.client_companies (id) on delete cascade,
  active_states integer not null default 0,
  loan_officers_tracked integer not null default 0,
  reports_completed integer not null default 0,
  upcoming_renewals integer not null default 0,
  open_exceptions integer not null default 0,
  documents_stored integer not null default 0,
  snapshot_date date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists client_metrics_company_id_idx
  on public.client_metrics (company_id);

comment on table public.client_metrics is
  'High-level operating metrics for portal dashboards. No borrower-level fields.';

-- TODO RLS: enable row level security on client_metrics.
-- TODO RLS policy: portal users may read metrics rows for their company_id only.

-- ---------------------------------------------------------------------------
-- updated_at trigger helper
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
