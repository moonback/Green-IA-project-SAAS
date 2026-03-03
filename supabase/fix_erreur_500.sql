-- 1. Nettoyage des anciennes policies problématiques
DROP POLICY IF EXISTS "members_shop_read" ON public.shop_members;
DROP POLICY IF EXISTS "shop_isolation_policy" ON public.products;
DROP POLICY IF EXISTS "shop_isolation_policy" ON public.categories;

-- 2. Nouvelle politique pour shop_members (Non-récursive)
-- Un utilisateur peut voir s'il est membre, sans re-vérifier la table entière
CREATE POLICY "members_read_own" ON public.shop_members
FOR SELECT TO authenticated
USING (user_id = auth.uid());

-- 3. Autoriser les admins/owners à voir tous les membres de leur shop
CREATE POLICY "owners_read_members" ON public.shop_members
FOR SELECT TO authenticated
USING (
    shop_id IN (SELECT id FROM public.shops WHERE owner_id = auth.uid())
);

-- 4. Correction des Produits & Catégories (Lecture Publique)
-- Dans un SaaS, les produits doivent être visibles par tous (visiteurs anonymes)
-- L'isolation se fait par le filtrage shop_id dans vos requêtes frontend.
CREATE POLICY "products_public_select" ON public.products
FOR SELECT USING (true);

CREATE POLICY "categories_public_select" ON public.categories
FOR SELECT USING (true);

-- 5. Mais seul le staff peut modifier les produits
CREATE POLICY "shop_staff_all_products" ON public.products
FOR ALL TO authenticated
USING (
    shop_id IN (SELECT shop_id FROM public.shop_members WHERE user_id = auth.uid())
)
WITH CHECK (
    shop_id IN (SELECT shop_id FROM public.shop_members WHERE user_id = auth.uid())
);
