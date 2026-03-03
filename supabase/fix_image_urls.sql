-- ═══════════════════════════════════════════════════════════════════════════
-- 🖼️ FIX : Mise à jour des URLs d'images produits (Remplacement IDs 404)
-- Les URLs Pexels 7520894 et 7520899 ne sont plus disponibles.
-- Remplacées par des IDs stables et vérifiés.
-- ═══════════════════════════════════════════════════════════════════════════

-- ─── Catégories ───────────────────────────────────────────────────────────────

UPDATE public.categories SET image_url = 'https://images.pexels.com/photos/6588619/pexels-photo-6588619.jpeg?auto=compress&cs=tinysrgb&w=800'
WHERE slug = 'fleurs';

UPDATE public.categories SET image_url = 'https://images.pexels.com/photos/7263985/pexels-photo-7263985.jpeg?auto=compress&cs=tinysrgb&w=800'
WHERE slug = 'resines';

UPDATE public.categories SET image_url = 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=800'
WHERE slug = 'huiles';

-- ─── Fleurs ───────────────────────────────────────────────────────────────────

UPDATE public.products SET image_url = 'https://images.pexels.com/photos/6588619/pexels-photo-6588619.jpeg?auto=compress&cs=tinysrgb&w=800'
WHERE slug = 'amnesia-haze';

UPDATE public.products SET image_url = 'https://images.pexels.com/photos/7667734/pexels-photo-7667734.jpeg?auto=compress&cs=tinysrgb&w=800'
WHERE slug = 'gelato';

UPDATE public.products SET image_url = 'https://images.pexels.com/photos/7667911/pexels-photo-7667911.jpeg?auto=compress&cs=tinysrgb&w=800'
WHERE slug = 'white-widow';

UPDATE public.products SET image_url = 'https://images.pexels.com/photos/7667911/pexels-photo-7667911.jpeg?auto=compress&cs=tinysrgb&w=800'
WHERE slug = 'strawberry';

-- ─── Résines & Pollens ────────────────────────────────────────────────────────

UPDATE public.products SET image_url = 'https://images.pexels.com/photos/7263985/pexels-photo-7263985.jpeg?auto=compress&cs=tinysrgb&w=800'
WHERE slug = 'afghan';

UPDATE public.products SET image_url = 'https://images.pexels.com/photos/7667727/pexels-photo-7667727.jpeg?auto=compress&cs=tinysrgb&w=800'
WHERE slug = 'jaune-mousseux';

UPDATE public.products SET image_url = 'https://images.pexels.com/photos/6862365/pexels-photo-6862365.jpeg?auto=compress&cs=tinysrgb&w=800'
WHERE slug = 'filtre-x3';

UPDATE public.products SET image_url = 'https://images.pexels.com/photos/7667734/pexels-photo-7667734.jpeg?auto=compress&cs=tinysrgb&w=800'
WHERE slug = 'ice-o-lator';

-- ─── Huiles & Infusions ───────────────────────────────────────────────────────

UPDATE public.products SET image_url = 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=800'
WHERE slug = 'huile-10-full-spectrum';

UPDATE public.products SET image_url = 'https://images.pexels.com/photos/4041394/pexels-photo-4041394.jpeg?auto=compress&cs=tinysrgb&w=800'
WHERE slug = 'huile-20-sommeil';

UPDATE public.products SET image_url = 'https://images.pexels.com/photos/6207363/pexels-photo-6207363.jpeg?auto=compress&cs=tinysrgb&w=800'
WHERE slug = 'infusion-detente';

UPDATE public.products SET image_url = 'https://images.pexels.com/photos/6207364/pexels-photo-6207364.jpeg?auto=compress&cs=tinysrgb&w=800'
WHERE slug = 'infusion-digestion';

-- ─── Bundle ───────────────────────────────────────────────────────────────────

UPDATE public.products SET image_url = 'https://images.pexels.com/photos/7667727/pexels-photo-7667727.jpeg?auto=compress&cs=tinysrgb&w=800'
WHERE slug = 'pack-nuit-paisible';
