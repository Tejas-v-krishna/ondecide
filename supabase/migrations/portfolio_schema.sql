-- Portfolio tracking table
create table portfolio (
  id uuid default gen_random_uuid() primary key,
  user_id text not null, -- matches clerk user id
  ticker text not null,
  asset_type text not null, -- 'stock', 'crypto', 'etf', 'mutual-fund'
  company_name text,
  quantity numeric not null check (quantity > 0),
  average_buy_price numeric not null check (average_buy_price >= 0),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- user_id + ticker should be unique (we aggregate holdings per ticker)
  unique(user_id, ticker)
);

-- Turn on RLS
alter table portfolio enable row level security;

-- Policy: Users can only select their own portfolio items
create policy "Users can view their own portfolio items"
on portfolio for select
using (auth.uid()::text = user_id);

-- Policy: Users can insert their own portfolio items
create policy "Users can insert their own portfolio items"
on portfolio for insert
with check (auth.uid()::text = user_id);

-- Policy: Users can update their own portfolio items
create policy "Users can update their own portfolio items"
on portfolio for update
using (auth.uid()::text = user_id)
with check (auth.uid()::text = user_id);

-- Policy: Users can delete their own portfolio items
create policy "Users can delete their own portfolio items"
on portfolio for delete
using (auth.uid()::text = user_id);
