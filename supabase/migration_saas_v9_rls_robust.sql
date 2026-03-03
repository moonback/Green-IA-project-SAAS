-- ═══════════════════════════════════════════════════════════════════════════
-- 🛡️ SAAS RLS ROBUST — PHASE 1.3 : ÉLIMINATION DE LA RÉCURSION CIRCULAIRE
-- Résout les erreurs 500 (Internal Server Error) sur les requêtes Orders/Shops.
-- Utilise des fonctions SECURITY DEFINER pour briser les dépendances cycliques.
-- ═══════════════════════════════════════════════════════════════════════════

-- ── 1. Fonctions Helper (SECURITY DEFINER) ───────────────────────────────────

CREATE OR REPLACE FUNCTION public.is_shop_staff(v_shop_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.shop_members
    WHERE shop_id = v_shop_id AND user_id = auth.uid()
  );
$$;

CREATE OR REPLACE FUNCTION public.is_shop_owner(v_shop_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.shops
    WHERE id = v_shop_id AND owner_id = auth.uid()
  );
$$;

-- ── 2. Fix Shops ─────────────────────────────────────────────────────────────

DROP POLICY IF EXISTS "shops_member_read" ON public.shops;
DROP POLICY IF EXISTS "shops_owner_manage" ON public.shops;

CREATE POLICY "shops_owner_manage" ON public.shops
FOR ALL TO authenticated
USING (owner_id = auth.uid() OR public.is_admin());

CREATE POLICY "shops_member_read" ON public.shops
FOR SELECT TO authenticated
USING (
    owner_id = auth.uid() OR
    public.is_shop_staff(id) OR
    public.is_admin()
);

-- ── 3. Fix Shop Members ──────────────────────────────────────────────────────

DROP POLICY IF EXISTS "shop_members_read_policy" ON public.shop_members;
DROP POLICY IF EXISTS "members_read_own" ON public.shop_members;
DROP POLICY IF EXISTS "owners_read_members" ON public.shop_members;

CREATE POLICY "shop_members_access" ON public.shop_members
FOR SELECT TO authenticated
USING (
    user_id = auth.uid() OR
    public.is_shop_owner(shop_id) OR
    public.is_admin()
);

-- ── 4. Fix Orders & Order Items ──────────────────────────────────────────────

-- Orders
DROP POLICY IF EXISTS "shop_isolation_policy" ON public.orders;
DROP POLICY IF EXISTS "orders_owner_read" ON public.orders;

CREATE POLICY "orders_access_policy" ON public.orders
FOR SELECT TO authenticated
USING (
    user_id = auth.uid() OR
    public.is_shop_staff(shop_id) OR
    public.is_admin()
);

CREATE POLICY "orders_staff_manage" ON public.orders
FOR ALL TO authenticated
USING (
    public.is_shop_staff(shop_id) OR
    public.is_admin()
);

-- Order Items
DROP POLICY IF EXISTS "order_items_owner_read" ON public.order_items;
CREATE POLICY "order_items_access_policy" ON public.order_items
FOR SELECT TO authenticated
USING (
    EXISTS (
        -- Cette sous-requête va déclencher RLS sur orders, 
        -- mais orders_access_policy n'est plus circulaire.
        SELECT 1 FROM public.orders o
        WHERE o.id = order_id AND (
            o.user_id = auth.uid() OR
            public.is_shop_staff(o.shop_id) OR
            public.is_admin()
        )
    )
);

-- ── 5. Application du trigger de sécurité sur les autres tables ──────────────

DO $$
DECLARE
    t text;
    tables text[] := ARRAY['promo_codes', 'stock_movements', 'loyalty_transactions', 'subscriptions', 'pos_reports'];
BEGIN
    FOREACH t IN ARRAY tables LOOP
        EXECUTE format('DROP POLICY IF EXISTS "shop_isolation_policy" ON public.%I', t);
        EXECUTE format('CREATE POLICY "shop_isolation_policy" ON public.%I FOR ALL USING (public.is_shop_staff(shop_id) OR public.is_admin())', t);
    END LOOP;
END $$;

COMMENT ON FUNCTION public.is_shop_staff IS 'Bypasse RLS pour vérifier l''appartenance à un shop (évite la récursion).';
COMMENT ON FUNCTION public.is_shop_owner IS 'Bypasse RLS pour vérifier la possession d''un shop (évite la récursion).';
