-- OnDecide Supabase Schema
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS watchlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  ticker TEXT NOT NULL,
  asset_type TEXT NOT NULL CHECK (asset_type IN ('stock', 'crypto')),
  company_name TEXT,
  sector TEXT,
  current_price DECIMAL(18,4),
  report_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, ticker)
);

CREATE INDEX IF NOT EXISTS idx_watchlist_user ON watchlist(user_id);
CREATE INDEX IF NOT EXISTS idx_watchlist_ticker ON watchlist(ticker);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_watchlist_updated_at
  BEFORE UPDATE ON watchlist
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Note: We are using Clerk for auth and service role key server-side.
-- RLS is optional but recommended. If you want RLS with Clerk JWT:
-- Enable Clerk as third-party auth provider in Supabase dashboard first.
ALTER TABLE watchlist ENABLE ROW LEVEL SECURITY;

-- Service role key bypasses RLS, so these policies protect against
-- direct Supabase client access with anon key
CREATE POLICY "Users can view own watchlist"
  ON watchlist FOR SELECT
  USING (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Users can insert own watchlist"
  ON watchlist FOR INSERT
  WITH CHECK (auth.jwt() ->> 'sub' = user_id);

CREATE POLICY "Users can delete own watchlist"
  ON watchlist FOR DELETE
  USING (auth.jwt() ->> 'sub' = user_id);
