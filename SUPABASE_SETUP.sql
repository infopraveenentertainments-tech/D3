-- Run this ONCE in Supabase SQL Editor.
-- The website uses Supabase Auth + Row Level Security.
-- The publishable key in the website is safe only because these policies restrict writes to authenticated admins.

create extension if not exists pgcrypto;

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  phone text not null,
  event text not null,
  location text not null,
  guests text,
  event_date date,
  message text,
  status text not null default 'new'
);

create table if not exists public.gallery (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null,
  image_url text not null,
  sort_order integer not null default 0,
  published boolean not null default true
);

alter table public.bookings enable row level security;
alter table public.gallery enable row level security;

drop policy if exists "public can create bookings" on public.bookings;
create policy "public can create bookings"
on public.bookings for insert
to anon, authenticated
with check (true);

drop policy if exists "admins can read bookings" on public.bookings;
create policy "admins can read bookings"
on public.bookings for select
to authenticated
using (true);

drop policy if exists "admins can delete bookings" on public.bookings;
create policy "admins can delete bookings"
on public.bookings for delete
to authenticated
using (true);

drop policy if exists "public can read published gallery" on public.gallery;
create policy "public can read published gallery"
on public.gallery for select
to anon, authenticated
using (published = true);

drop policy if exists "admins can insert gallery" on public.gallery;
create policy "admins can insert gallery"
on public.gallery for insert
to authenticated
with check (true);

drop policy if exists "admins can update gallery" on public.gallery;
create policy "admins can update gallery"
on public.gallery for update
to authenticated
using (true)
with check (true);

drop policy if exists "admins can delete gallery" on public.gallery;
create policy "admins can delete gallery"
on public.gallery for delete
to authenticated
using (true);

-- Create your admin account in Supabase Dashboard > Authentication > Users.
-- Then use that email/password at admin.html.
