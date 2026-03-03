-- ═══════════════════════════════════════════════════════════════════════════
-- 🛡️ SAAS RLS FIX — PHASE 1.1 : ACCÈS BOUTIQUES
-- Règle l'erreur 500 lors de la création de boutique en ajoutant les policies manquantes.
-- ═══════════════════════════════════════════════════════════════════════════

-- 1. Autoriser l'insertion dans la table 'shops' pour les utilisateurs authentifiés
-- Un utilisateur peut créer une boutique s'il se désigne comme owner.
DROP POLICY IF EXISTS "shops_insert_policy" ON public.shops;
CREATE POLICY "shops_insert_policy" ON public.shops
FOR INSERT TO authenticated
WITH CHECK (auth.uid() = owner_id);

-- 2. Autoriser les owners à voir et modifier leur propre boutique
DROP POLICY IF EXISTS "shops_owner_manage" ON public.shops;
CREATE POLICY "shops_owner_manage" ON public.shops
FOR ALL TO authenticated
USING (auth.uid() = owner_id);

-- 3. Autoriser l'insertion dans 'shop_members'
DROP POLICY IF EXISTS "shop_members_insert_policy" ON public.shop_members;
CREATE POLICY "shop_members_insert_policy" ON public.shop_members
FOR INSERT TO authenticated
WITH CHECK (
    auth.uid() = user_id -- Un utilisateur peut s'ajouter lui-même
    OR 
    id IN (SELECT id FROM public.shops WHERE owner_id = auth.uid()) -- Le owner peut l'ajouter
);

-- 4. Autoriser les membres à voir les autres membres de leur boutique
DROP POLICY IF EXISTS "shop_members_read_policy" ON public.shop_members;
CREATE POLICY "shop_members_read_policy" ON public.shop_members
FOR SELECT TO authenticated
USING (
    user_id = auth.uid() -- Soi-même
    OR
    shop_id IN (SELECT id FROM public.shops WHERE owner_id = auth.uid()) -- Le owner voit tout son shop
);

-- 5. Fix : Autoriser les utilisateurs à voir les boutiques dont ils sont membres
DROP POLICY IF EXISTS "shops_member_read" ON public.shops;
CREATE POLICY "shops_member_read" ON public.shops
FOR SELECT TO authenticated
USING (
    owner_id = auth.uid() -- Je suis le owner
    OR
    id IN (SELECT shop_id FROM public.shop_members WHERE user_id = auth.uid()) -- Je suis membre
);

-- 6. Permissions de base
GRANT ALL ON public.shops TO authenticated;
GRANT ALL ON public.shop_members TO authenticated;
