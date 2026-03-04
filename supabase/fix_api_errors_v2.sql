-- ── Fix for AI Usage Logs RLS ──
-- The previous policy only allowed shop members to insert logs.
-- We must allow any authenticated user (clients) to insert logs when they use the AI, 
-- but keep the read/select access restricted to shop members/admins.

DROP POLICY IF EXISTS "log_isolation_policy" ON public.ai_usage_logs;

-- Allow anyone to insert (so clients can log their usage)
CREATE POLICY "ai_usage_logs_insert_policy" ON public.ai_usage_logs
FOR INSERT WITH CHECK (true);

-- Restrict select to shop members and admins
CREATE POLICY "ai_usage_logs_select_policy" ON public.ai_usage_logs
FOR SELECT USING (
    shop_id IN (SELECT shop_id FROM public.shop_members WHERE user_id = auth.uid())
    OR 
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- ── Fix for BudTender Interactions Upsert ──
-- Ensure the unique constraint exists for PostgREST on_conflict
-- Note: session_id is now nullable, which is fine for UNIQUE(user_id, session_id) 
-- but PostgREST needs a clear constraint to target.

DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'budtender_interactions_user_id_session_id_key'
    ) THEN
        ALTER TABLE public.budtender_interactions 
        ADD CONSTRAINT budtender_interactions_user_id_session_id_key UNIQUE (user_id, session_id);
    END IF;
END $$;
