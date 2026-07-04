-- Migration: student approval + admin enrollment support
-- Run in Supabase SQL Editor if you already ran schema.sql

alter table public.profiles
  add column if not exists approval_status text not null default 'pending'
  check (approval_status in ('pending', 'approved', 'rejected'));

-- Approve existing accounts (run once after migration)
-- update public.profiles set approval_status = 'approved';

-- Admins can update student approval status
create policy "Admins update profiles"
  on public.profiles for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Replace signup trigger to set pending approval for new students
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
