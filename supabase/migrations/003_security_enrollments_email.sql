-- Migration 003: Enrollments, session tracking, enrollment requests
-- Run in Supabase SQL Editor

-- Course enrollments with 1-year expiry
create table if not exists public.course_enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  course_id text not null,
  enrolled_at timestamptz not null default now(),
  expires_at timestamptz not null,
  enrolled_by text not null default 'admin',
  payment_note text,
  unique (user_id, course_id)
);

-- Enrollment requests from students
create table if not exists public.enrollment_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  course_id text not null,
  course_title text not null,
  status text not null default 'pending' check (status in ('pending', 'enrolled', 'declined')),
  requested_at timestamptz not null default now(),
  resolved_at timestamptz
);

-- Single active session per user (one IP at a time)
create table if not exists public.user_sessions (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  ip_address text not null,
  session_token text not null,
  user_agent text,
  last_seen timestamptz not null default now(),
  created_at timestamptz not null default now()
);

alter table public.course_enrollments enable row level security;
alter table public.enrollment_requests enable row level security;
alter table public.user_sessions enable row level security;

-- Students read own enrollments
create policy "Students read own enrollments"
  on public.course_enrollments for select
  using (auth.uid() = user_id);

-- Admins read all enrollments
create policy "Admins read all enrollments"
  on public.course_enrollments for select
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- Admins insert/update enrollments
create policy "Admins manage enrollments"
  on public.course_enrollments for all
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- Students read/create own enrollment requests
create policy "Students read own requests"
  on public.enrollment_requests for select
  using (auth.uid() = user_id);

create policy "Students create requests"
  on public.enrollment_requests for insert
  with check (auth.uid() = user_id);

-- Admins manage all requests
create policy "Admins manage requests"
  on public.enrollment_requests for all
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- Users manage own session row only
create policy "Users manage own session"
  on public.user_sessions for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Index for expiry checks
create index if not exists idx_enrollments_expires on public.course_enrollments(expires_at);
create index if not exists idx_requests_status on public.enrollment_requests(status);

-- Optional: DB webhook for new profile → call edge function notify-admin
-- Configure in Supabase Dashboard → Database → Webhooks on profiles INSERT
