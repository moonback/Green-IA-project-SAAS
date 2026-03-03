-- Migration: Add default layout to existing shops
UPDATE shops
SET settings = jsonb_set(
    COALESCE(settings, '{}'::jsonb),
    '{layout}',
    jsonb_build_object(
        'home', jsonb_build_object(
            'sections', jsonb_build_array(
                jsonb_build_object('id', 'hero-1', 'type', 'hero', 'enabled', true),
                jsonb_build_object('id', 'categories-1', 'type', 'categories', 'enabled', true),
                jsonb_build_object('id', 'featured-1', 'type', 'featured_products', 'enabled', true),
                jsonb_build_object('id', 'ai-promo-1', 'type', 'ai_promo', 'enabled', true)
            )
        ),
        'about', jsonb_build_object(
            'sections', jsonb_build_array(
                jsonb_build_object('id', 'hero-about', 'type', 'hero', 'enabled', true),
                jsonb_build_object('id', 'values-about', 'type', 'values', 'enabled', true),
                jsonb_build_object('id', 'visit-cta-about', 'type', 'visit_cta', 'enabled', true)
            )
        ),
        'quality', jsonb_build_object(
            'sections', jsonb_build_array(
                jsonb_build_object('id', 'hero-quality', 'type', 'hero', 'enabled', true),
                jsonb_build_object('id', 'pillars-quality', 'type', 'pillars', 'enabled', true),
                jsonb_build_object('id', 'isolation-quality', 'type', 'isolation', 'enabled', true),
                jsonb_build_object('id', 'ai-excellence-quality', 'type', 'ai_excellence', 'enabled', true),
                jsonb_build_object('id', 'trust-quality', 'type', 'trust_banner', 'enabled', true)
            )
        )
    ),
    true
)
WHERE settings->'layout' IS NULL;
