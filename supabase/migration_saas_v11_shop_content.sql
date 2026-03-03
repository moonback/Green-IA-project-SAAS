-- ═══════════════════════════════════════════════════════════════════════════
-- 📝 SAAS CONTENT INITIALIZATION
-- Assure que chaque boutique a une structure par défaut pour ses textes personnalisables.
-- ═══════════════════════════════════════════════════════════════════════════

-- 1. Initialisation de la clé 'content' dans shops.settings si elle n'existe pas
UPDATE public.shops
SET settings = jsonb_set(
    COALESCE(settings, '{}'::jsonb),
    '{content}',
    '{
        "home": {},
        "about": {},
        "contact": {},
        "quality": {},
        "catalog": {}
    }'::jsonb,
    true -- create if missing
)
WHERE settings->'content' IS NULL;

-- 2. Index GIN pour des performances optimales sur les recherches dans le contenu (si nécessaire)
-- Déjà présent pour theme, on peut l'étendre ou s'assurer qu'il couvre settings globalement.
CREATE INDEX IF NOT EXISTS idx_shops_settings_content ON public.shops USING GIN ((settings->'content'));

COMMENT ON COLUMN public.shops.settings IS 'Stocke le thème, les textes personnalisés et les préférences de la boutique au format JSONB.';
