create table if not exists word_progress (
  word_id text primary key,
  box smallint not null default 1,
  due_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table word_progress enable row level security;

-- Single-user personal app for now: anon key can read/write freely.
-- Revisit with per-user auth policies before this app is exposed beyond one person.
create policy "anon full access" on word_progress
  for all
  using (true)
  with check (true);
