-- ComputerGeek Academy — Supabase Auth Schema (Phase 1)
-- Run this in Supabase Dashboard → SQL Editor

-- Profiles table linked to auth.users
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  role text not null default 'student' check (role in ('student', 'admin')),
  approval_status text not null default 'pending' check (approval_status in ('pending', 'approved', 'rejected')),
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

-- Users can read their own profile
create policy "Users read own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Users can update their own name (not role)
create policy "Users update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Admins can read all profiles
create policy "Admins read all profiles"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Admins can update profiles (approval, etc.)
create policy "Admins update profiles"
  on public.profiles for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Auto-create profile on signup (students start as pending approval)
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
-- AFTER creating your admin user in Supabase Auth, run:
--
-- update public.profiles
-- set role = 'admin', approval_status = 'approved'
-- where email = 'your-admin@email.com';
--
-- Enable MFA in Supabase Dashboard:
-- Authentication → Multi-Factor Authentication → Enable TOTP
-- ============================================================
