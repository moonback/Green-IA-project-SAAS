-- ═══════════════════════════════════════════════════════════════════════════
-- 🛠️ FIX MIGRATION — Produits & Catégories pour SaaS Multi-tenant
-- 1. Ajoute la colonne is_subscribable manquante (cause l'erreur 400 Bad Request)
-- 2. Modifie les contraintes UNIQUE globales pour être propres à chaque boutique
-- ═══════════════════════════════════════════════════════════════════════════

-- 1. Ajout de is_subscribable
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS is_subscribable boolean NOT NULL DEFAULT false;

-- 2. Modification des contraintes `slug` et `sku` pour le Multi-Tenant (SaaS)
-- Au lieu d'avoir un slug globalement unique, le slug est unique par boutique.

-- Pour les Produits
ALTER TABLE public.products DROP CONSTRAINT IF EXISTS products_slug_key;
DROP INDEX IF EXISTS products_slug_key;
ALTER TABLE public.products DROP CONSTRAINT IF EXISTS products_slug_shop_id_key;
ALTER TABLE public.products ADD CONSTRAINT products_slug_shop_id_key UNIQUE (slug, shop_id);

ALTER TABLE public.products DROP CONSTRAINT IF EXISTS products_sku_key;
DROP INDEX IF EXISTS products_sku_key;
ALTER TABLE public.products DROP CONSTRAINT IF EXISTS products_sku_shop_id_key;
ALTER TABLE public.products ADD CONSTRAINT products_sku_shop_id_key UNIQUE (sku, shop_id);

-- Pour les Catégories
ALTER TABLE public.categories DROP CONSTRAINT IF EXISTS categories_slug_key;
DROP INDEX IF EXISTS categories_slug_key;
ALTER TABLE public.categories DROP CONSTRAINT IF EXISTS categories_slug_shop_id_key;
ALTER TABLE public.categories ADD CONSTRAINT categories_slug_shop_id_key UNIQUE (slug, shop_id);
