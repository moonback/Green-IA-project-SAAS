-- ═══════════════════════════════════════════════════════════════════════════
-- 🧭 SAAS MIGRATION — PHASE 4 : PERSONNALISATION IA & QUOTAS
-- Met à jour les fonctions IA pour supporter le multi-tenant et le suivi d'usage.
-- ═══════════════════════════════════════════════════════════════════════════

-- 1. Mise à jour de match_products pour filtrer par shop_id
CREATE OR REPLACE FUNCTION public.match_products (
  query_embedding vector(768),
  match_threshold float,
  match_count     int,
  p_shop_id       uuid DEFAULT NULL -- Nouveau paramètre optionnel
)
RETURNS TABLE (
  id             uuid,
  category_id    uuid,
  slug           text,
  name           text,
  description    text,
  cbd_percentage numeric(5,2),
  thc_max        numeric(5,3),
  weight_grams   numeric(8,2),
  price          numeric(10,2),
  image_url      text,
  stock_quantity int,
  is_available   boolean,
  is_featured    boolean,
  is_active      boolean,
  created_at     timestamptz,
  attributes     jsonb,
  is_bundle      boolean,
  original_value numeric(10,2),
  similarity     float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.id, p.category_id, p.slug, p.name, p.description,
    p.cbd_percentage, p.thc_max, p.weight_grams, p.price, p.image_url,
    p.stock_quantity, p.is_available, p.is_featured, p.is_active, p.created_at,
    p.attributes, p.is_bundle, p.original_value,
    1 - (p.embedding <=> query_embedding) AS similarity
  FROM public.products p
  WHERE p.is_active = true
    AND p.is_available = true
    AND (p_shop_id IS NULL OR p.shop_id = p_shop_id) -- Filtre multi-tenant
    AND 1 - (p.embedding <=> query_embedding) > match_threshold
  ORDER BY p.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- 2. Table de suivi d'usage IA (Quotas)
CREATE TABLE IF NOT EXISTS public.ai_usage_logs (
    id                uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
    shop_id           uuid          REFERENCES public.shops(id) ON DELETE CASCADE,
    user_id           uuid          REFERENCES auth.users(id) ON DELETE SET NULL,
    interaction_type  text          NOT NULL, -- 'chat', 'voice', 'quiz'
    tokens_estimate   int           DEFAULT 0,
    created_at        timestamptz   NOT NULL DEFAULT now()
);

-- Activation RLS sur le log
ALTER TABLE public.ai_usage_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "log_isolation_policy" ON public.ai_usage_logs 
FOR ALL USING (shop_id IN (SELECT shop_id FROM public.shop_members WHERE user_id = auth.uid()));

-- 3. Mise à jour du prompt par défaut dans les settings de shop
-- On peut ajouter une fonction pour initialiser les prompts personnalisés si besoin.
