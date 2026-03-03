-- ═══════════════════════════════════════════════════════════════════════════
-- 🛡️ SAAS ACCESS FIX — PUBLIC STOREFRONTS
-- Permet aux visiteurs non-connectés d'accéder aux informations des boutiques.
-- ═══════════════════════════════════════════════════════════════════════════

-- 1. Autoriser la lecture publique des boutiques actives
DROP POLICY IF EXISTS "shops_public_read" ON public.shops;
CREATE POLICY "shops_public_read" ON public.shops
FOR SELECT TO anon, authenticated
USING (subscription_status = 'active');

-- 2. S'assurer que les produits et catégories sont lisibles publiquement
DROP POLICY IF EXISTS "products_public_read" ON public.products;
CREATE POLICY "products_public_read" ON public.products
FOR SELECT TO anon, authenticated
USING (is_active = true);

DROP POLICY IF EXISTS "categories_public_read" ON public.categories;
CREATE POLICY "categories_public_read" ON public.categories
FOR SELECT TO anon, authenticated
USING (true);

-- 3. Accès aux paramètres de la boutique (logo, couleurs, etc.)
DROP POLICY IF EXISTS "store_settings_public_read" ON public.store_settings;
CREATE POLICY "store_settings_public_read" ON public.store_settings
FOR SELECT TO anon, authenticated
USING (true);

-- 4. Images, Recommandations et Avis
DROP POLICY IF EXISTS "product_images_public_read" ON public.product_images;
CREATE POLICY "product_images_public_read" ON public.product_images FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "recommendations_public_read" ON public.product_recommendations;
CREATE POLICY "recommendations_public_read" ON public.product_recommendations FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "reviews_public_read" ON public.reviews;
CREATE POLICY "reviews_public_read" ON public.reviews FOR SELECT TO anon, authenticated USING (is_published = true);

DROP POLICY IF EXISTS "bundle_items_public_read" ON public.bundle_items;
CREATE POLICY "bundle_items_public_read" ON public.bundle_items FOR SELECT TO anon, authenticated USING (true);
