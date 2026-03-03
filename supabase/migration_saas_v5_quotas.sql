-- ═══════════════════════════════════════════════════════════════════════════
-- 🧭 SAAS MIGRATION — PHASE 5 : QUOTAS & LIMITES IA
-- Implémente la vérification automatique de l'usage IA par shop.
-- ═══════════════════════════════════════════════════════════════════════════

-- 1. Fonction pour vérifier le quota mensuel IA
CREATE OR REPLACE FUNCTION public.check_ai_quota(p_shop_id uuid)
RETURNS boolean AS $$
DECLARE
    v_usage_count int;
    v_plan text;
    v_limit int;
    v_current_month timestamptz := date_trunc('month', now());
BEGIN
    -- 1. Récupérer le plan de la boutique
    SELECT subscription_plan INTO v_plan
    FROM public.shops
    WHERE id = p_shop_id;

    -- 2. Définir la limite selon le plan
    CASE v_plan
        WHEN 'free' THEN v_limit := 100;
        WHEN 'pro' THEN v_limit := 2000;
        WHEN 'enterprise' THEN v_limit := 100000; -- Casi illimité
        ELSE v_limit := 0;
    END CASE;

    -- 3. Compter l'usage du mois en cours
    SELECT count(*)::int INTO v_usage_count
    FROM public.ai_usage_logs
    WHERE shop_id = p_shop_id
      AND created_at >= v_current_month;

    -- 4. Retourner true si on est sous la limite
    RETURN v_usage_count < v_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Vue pour le Dashboard Admin (Stats rapides d'usage)
CREATE OR REPLACE VIEW public.shop_ai_usage_stats AS
SELECT 
    shop_id,
    count(*) FILTER (WHERE created_at >= date_trunc('month', now())) as current_month_usage,
    count(*) FILTER (WHERE interaction_type = 'chat') as total_chats,
    count(*) FILTER (WHERE interaction_type = 'voice') as total_voice_sessions,
    count(*) FILTER (WHERE interaction_type = 'quiz') as total_quizzes,
    sum(tokens_estimate) as total_tokens
FROM public.ai_usage_logs
GROUP BY shop_id;

-- 3. Ajout de colonnes de configuration IA directement dans shops.settings (Initialisation si vide)
-- Note: On va plutôt utiliser les colonnes dédiées ou le JSONB pour stocker ces infos spécifiques.
-- Pour l'instant on garde le JSONB settings existant.

GRANT EXECUTE ON FUNCTION public.check_ai_quota(uuid) TO authenticated;
GRANT SELECT ON public.shop_ai_usage_stats TO authenticated;
