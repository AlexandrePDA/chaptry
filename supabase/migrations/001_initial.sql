-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── USERS ───────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'creator', 'pro', 'agency')),
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT,
  generations_used_this_month INT DEFAULT 0 CHECK (generations_used_this_month >= 0),
  generations_reset_at TIMESTAMPTZ,
  language_preference TEXT DEFAULT 'fr'
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS users_updated_at ON public.users;
CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email)
  VALUES (NEW.id, NEW.email)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ─── GENERATIONS ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.generations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  video_url TEXT NOT NULL,
  video_id TEXT NOT NULL,
  video_title TEXT,
  channel_name TEXT,
  duration_seconds INT,
  transcript TEXT,
  chapters JSONB,
  description TEXT,
  tags TEXT[],
  generation_metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  is_deleted BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_generations_user_id ON public.generations(user_id);
CREATE INDEX idx_generations_created_at ON public.generations(created_at DESC);
CREATE INDEX idx_generations_video_id ON public.generations(video_id);

-- ─── USAGE EVENTS ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.usage_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('generation', 'regeneration', 'export', 'upgrade', 'downgrade', 'cancellation')),
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_usage_events_user_id ON public.usage_events(user_id);
CREATE INDEX idx_usage_events_created_at ON public.usage_events(created_at DESC);
CREATE INDEX idx_usage_events_type ON public.usage_events(event_type);

-- ─── RLS (Row Level Security) ─────────────────────────────────────────────────
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_events ENABLE ROW LEVEL SECURITY;

-- Users: can only read/update their own row
CREATE POLICY "users_select_own" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "users_update_own" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Generations: CRUD on own generations only
CREATE POLICY "generations_select_own" ON public.generations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "generations_insert_own" ON public.generations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "generations_update_own" ON public.generations
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "generations_delete_own" ON public.generations
  FOR DELETE USING (auth.uid() = user_id);

-- Usage events: insert only (read via service role)
CREATE POLICY "usage_events_insert_own" ON public.usage_events
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "usage_events_select_own" ON public.usage_events
  FOR SELECT USING (auth.uid() = user_id);

-- ─── ANALYTICS VIEW ──────────────────────────────────────────────────────────
CREATE OR REPLACE VIEW public.daily_stats AS
SELECT
  DATE_TRUNC('day', created_at) AS day,
  COUNT(*) AS total_generations,
  COUNT(DISTINCT user_id) AS unique_users,
  AVG((generation_metadata->>'durationMs')::FLOAT) AS avg_duration_ms,
  AVG((generation_metadata->>'costEuros')::FLOAT) AS avg_cost_euros
FROM public.generations
WHERE is_deleted = FALSE
GROUP BY DATE_TRUNC('day', created_at)
ORDER BY day DESC;

-- ─── SEED: plan limits reference ─────────────────────────────────────────────
COMMENT ON COLUMN public.users.plan IS 'free=3/mo, creator=30/mo, pro=150/mo, agency=unlimited';
COMMENT ON TABLE public.generations IS 'Each LLM generation request with full output stored';
COMMENT ON TABLE public.usage_events IS 'Audit log for all billable and analytics events';
