-- ═══════════════════════════════════════════════════════════════════════════
-- 🔧 FIX : Infinite Recursion in profiles RLS (code 42P17)
-- Problème : Les policies RLS sur `profiles` s'auto-référencent pour vérifier
--            is_admin, ce qui crée une récursion infinie.
-- Solution : Fonction SECURITY DEFINER `is_admin()` qui bypasse le RLS.
-- ═══════════════════════════════════════════════════════════════════════════

-- ── Étape 1 : Créer la fonction helper is_admin() ────────────────────────────
-- SECURITY DEFINER = exécutée avec les droits du créateur, bypass RLS.
-- STABLE = peut être cachée par transaction (optimisation).

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND is_admin = true
  );
$$;

-- ── Étape 2 : Réécrire les policies RLS de `profiles` sans auto-référence ─────

-- Supprimer les anciennes policies récursives
DROP POLICY IF EXISTS "profiles_self_read"   ON public.profiles;
DROP POLICY IF EXISTS "profiles_self_update" ON public.profiles;
DROP POLICY IF EXISTS "profiles_admin_all"   ON public.profiles;

-- Nouvelles policies utilisant is_admin() — pas de récursion possible
CREATE POLICY "profiles_self_read"
  ON public.profiles FOR SELECT
  USING (id = auth.uid() OR public.is_admin());

CREATE POLICY "profiles_self_update"
  ON public.profiles FOR UPDATE
  USING (id = auth.uid());

CREATE POLICY "profiles_admin_all"
  ON public.profiles FOR ALL
  USING (public.is_admin());

-- ── Étape 3 : Mettre à jour toutes les autres tables ─────────────────────────
-- Remplacer les sous-requêtes EXISTS(...profiles...) par public.is_admin()

-- categories
DROP POLICY IF EXISTS "categories_admin_write"       ON public.categories;
CREATE POLICY "categories_admin_write"       ON public.categories FOR ALL
  USING (public.is_admin());

-- products
DROP POLICY IF EXISTS "products_admin_write"         ON public.products;
CREATE POLICY "products_admin_write"         ON public.products FOR ALL
  USING (public.is_admin());

-- orders
DROP POLICY IF EXISTS "orders_owner_read"            ON public.orders;
CREATE POLICY "orders_owner_read"            ON public.orders FOR SELECT
  USING (user_id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS "orders_admin_update"          ON public.orders;
CREATE POLICY "orders_admin_update"          ON public.orders FOR UPDATE
  USING (public.is_admin());

-- order_items
DROP POLICY IF EXISTS "order_items_owner_read"       ON public.order_items;
CREATE POLICY "order_items_owner_read"       ON public.order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.orders o
      WHERE o.id = order_id
        AND (o.user_id = auth.uid() OR public.is_admin())
    )
  );

-- stock_movements
DROP POLICY IF EXISTS "stock_admin_all"              ON public.stock_movements;
CREATE POLICY "stock_admin_all"              ON public.stock_movements FOR ALL
  USING (public.is_admin());

-- store_settings
DROP POLICY IF EXISTS "store_settings_admin_all"     ON public.store_settings;
CREATE POLICY "store_settings_admin_all"     ON public.store_settings FOR ALL
  USING (public.is_admin());

-- loyalty_transactions
DROP POLICY IF EXISTS "loyalty_tx_owner_read"        ON public.loyalty_transactions;
CREATE POLICY "loyalty_tx_owner_read"        ON public.loyalty_transactions FOR SELECT
  USING (user_id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS "loyalty_tx_admin_all"         ON public.loyalty_transactions;
CREATE POLICY "loyalty_tx_admin_all"         ON public.loyalty_transactions FOR ALL
  USING (public.is_admin());

-- subscriptions
DROP POLICY IF EXISTS "subscriptions_owner_read"     ON public.subscriptions;
CREATE POLICY "subscriptions_owner_read"     ON public.subscriptions FOR SELECT
  USING (user_id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS "subscriptions_owner_update"   ON public.subscriptions;
CREATE POLICY "subscriptions_owner_update"   ON public.subscriptions FOR UPDATE
  USING (user_id = auth.uid() OR public.is_admin());

-- subscription_orders
DROP POLICY IF EXISTS "sub_orders_owner_read"        ON public.subscription_orders;
CREATE POLICY "sub_orders_owner_read"        ON public.subscription_orders FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.subscriptions s
      WHERE s.id = subscription_id
        AND (s.user_id = auth.uid() OR public.is_admin())
    )
  );

DROP POLICY IF EXISTS "sub_orders_admin_insert"      ON public.subscription_orders;
CREATE POLICY "sub_orders_admin_insert"      ON public.subscription_orders FOR INSERT
  WITH CHECK (public.is_admin());

-- reviews
DROP POLICY IF EXISTS "reviews_public_read"          ON public.reviews;
CREATE POLICY "reviews_public_read"          ON public.reviews FOR SELECT
  USING (is_published = true OR user_id = auth.uid() OR public.is_admin());

DROP POLICY IF EXISTS "reviews_admin_all"            ON public.reviews;
CREATE POLICY "reviews_admin_all"            ON public.reviews FOR ALL
  USING (public.is_admin());

-- bundle_items
DROP POLICY IF EXISTS "bundle_items_admin_all"       ON public.bundle_items;
CREATE POLICY "bundle_items_admin_all"       ON public.bundle_items FOR ALL
  USING (public.is_admin());

-- product_recommendations
DROP POLICY IF EXISTS "recommendations_admin_all"    ON public.product_recommendations;
CREATE POLICY "recommendations_admin_all"    ON public.product_recommendations FOR ALL
  USING (public.is_admin());

-- product_images
DROP POLICY IF EXISTS "product_images_admin_insert"  ON public.product_images;
CREATE POLICY "product_images_admin_insert"  ON public.product_images FOR INSERT
  WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "product_images_admin_update"  ON public.product_images;
CREATE POLICY "product_images_admin_update"  ON public.product_images FOR UPDATE
  USING (public.is_admin());

DROP POLICY IF EXISTS "product_images_admin_delete"  ON public.product_images;
CREATE POLICY "product_images_admin_delete"  ON public.product_images FOR DELETE
  USING (public.is_admin());

-- promo_codes
DROP POLICY IF EXISTS "promo_codes_admin_all"        ON public.promo_codes;
CREATE POLICY "promo_codes_admin_all"        ON public.promo_codes FOR ALL
  USING (public.is_admin());

-- pos_reports
DROP POLICY IF EXISTS "pos_reports_admin_all"        ON public.pos_reports;
CREATE POLICY "pos_reports_admin_all"        ON public.pos_reports FOR ALL
  USING (public.is_admin());

-- user_ai_preferences (admin read)
DROP POLICY IF EXISTS "ai_prefs_admin_select"        ON public.user_ai_preferences;
CREATE POLICY "ai_prefs_admin_select"        ON public.user_ai_preferences FOR SELECT
  USING (user_id = auth.uid() OR public.is_admin());

-- budtender_interactions (admin read)
DROP POLICY IF EXISTS "budtender_interactions_admin_select" ON public.budtender_interactions;
CREATE POLICY "budtender_interactions_admin_select" ON public.budtender_interactions FOR SELECT
  USING (auth.uid() = user_id OR public.is_admin());

-- Storage : product-images
DROP POLICY IF EXISTS "product_images_admin_insert"  ON storage.objects;
CREATE POLICY "product_images_admin_insert"  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'product-images' AND public.is_admin());

DROP POLICY IF EXISTS "product_images_admin_update"  ON storage.objects;
CREATE POLICY "product_images_admin_update"  ON storage.objects FOR UPDATE
  USING (bucket_id = 'product-images' AND public.is_admin());

DROP POLICY IF EXISTS "product_images_admin_delete"  ON storage.objects;
CREATE POLICY "product_images_admin_delete"  ON storage.objects FOR DELETE
  USING (bucket_id = 'product-images' AND public.is_admin());

-- ═══════════════════════════════════════════════════════════════════════════
-- ✅ Fix appliqué. La fonction public.is_admin() utilise SECURITY DEFINER,
--    ce qui lui permet de lire la table profiles sans déclencher le RLS,
--    éliminant toute récursion infinie.
-- ═══════════════════════════════════════════════════════════════════════════
