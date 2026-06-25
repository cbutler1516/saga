-- Saga assessment lead capture
-- Run in Supabase SQL editor or via migration tooling.

create extension if not exists "pgcrypto";

create table if not exists public.assessment_submissions (
  id uuid primary key default gen_random_uuid(),
  assessment_type text not null,
  score integer not null,
  tier text not null,
  answers jsonb not null default '{}'::jsonb,
  contact jsonb not null default '{}'::jsonb,
  utm jsonb null,
  source text null,
  created_at timestamptz not null default now()
);

create index if not exists assessment_submissions_assessment_type_idx
  on public.assessment_submissions (assessment_type);

create index if not exists assessment_submissions_created_at_idx
  on public.assessment_submissions (created_at desc);

comment on table public.assessment_submissions is
  'Lead capture for Saga assessment funnels.';

comment on column public.assessment_submissions.assessment_type is
  'independence | existing-broker | correspondent';

comment on column public.assessment_submissions.contact is
  'JSON: firstName, lastName, email, phone, company?, note?';

comment on column public.assessment_submissions.utm is
  'JSON: utm_source, utm_medium, utm_campaign, utm_term, utm_content';

-- Enable RLS; service role bypasses for API inserts.
alter table public.assessment_submissions enable row level security;

-- No public policies by default. Inserts via service role key from API route only.
