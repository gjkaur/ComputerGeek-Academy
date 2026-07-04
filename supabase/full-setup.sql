-- ComputerGeek Academy — Complete Database Setup
-- Run ONCE in Supabase Dashboard → SQL Editor (new projects)

-- ============================================================
-- PROFILES
-- ============================================================
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  role text not null default 'student' check (role in ('student', 'admin')),
  approval_status text not null default 'pending' check (approval_status in ('pending', 'approved', 'rejected')),
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users read own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "Admins read all profiles"
  on public.profiles for select
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

create policy "Admins update profiles"
  on public.profiles for update
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role, approval_status)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    'student',
    'pending'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- ENROLLMENTS, REQUESTS, SESSIONS
-- ============================================================
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

create table if not exists public.enrollment_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  course_id text not null,
  course_title text not null,
  status text not null default 'pending' check (status in ('pending', 'enrolled', 'declined')),
  requested_at timestamptz not null default now(),
  resolved_at timestamptz
);

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

create policy "Students read own enrollments"
  on public.course_enrollments for select
  using (auth.uid() = user_id);

create policy "Admins read all enrollments"
  on public.course_enrollments for select
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

create policy "Admins manage enrollments"
  on public.course_enrollments for all
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

create policy "Students read own requests"
  on public.enrollment_requests for select
  using (auth.uid() = user_id);

create policy "Students create requests"
  on public.enrollment_requests for insert
  with check (auth.uid() = user_id);

create policy "Admins manage requests"
  on public.enrollment_requests for all
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

create policy "Users manage own session"
  on public.user_sessions for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index if not exists idx_enrollments_expires on public.course_enrollments(expires_at);
create index if not exists idx_requests_status on public.enrollment_requests(status);

-- ============================================================
-- AFTER first admin signup, run:
--
-- update public.profiles
-- set role = 'admin', approval_status = 'approved'
-- where email = 'your-admin@email.com';
-- ============================================================
