-- Subscribers table for OSChoices newsletter
create table if not exists subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  confirmed boolean default false,
  confirm_token text unique,
  source text default 'hub',
  created_at timestamptz default now()
);

create index if not exists subscribers_email_idx on subscribers(email);
create index if not exists subscribers_confirm_token_idx on subscribers(confirm_token);

-- Row-Level Security
alter table subscribers enable row level security;

-- Deny public reads
create policy "No public reads"
  on subscribers for select
  using (false);

-- Allow inserts via anon key (newsletter signups)
create policy "Allow anon inserts"
  on subscribers for insert
  with check (true);

-- Updates only via service role (confirmation flow)
-- Service role bypasses RLS by default — no explicit policy needed.
