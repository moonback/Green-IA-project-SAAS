-- ═══════════════════════════════════════════════════════════════════════════
-- 🧭 SAAS MIGRATION — PHASE 1 : FONDATIONS MULTI-TENANT
-- Transforme Green IA d'une application unique en plateforme SaaS.
-- ═══════════════════════════════════════════════════════════════════════════

-- 1. Table des Boutiques (Tenants)
CREATE TABLE IF NOT EXISTS public.shops (
    id                uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id          uuid          REFERENCES auth.users(id) NOT NULL,
    name              text          NOT NULL,
    slug              text          UNIQUE NOT NULL,
    logo_url          text,
    settings          jsonb         DEFAULT '{
        "primary_color": "#10b981",
        "currency": "EUR",
        "ai_enabled": true
    }'::jsonb,
    subscription_plan text          NOT NULL DEFAULT 'free' CHECK (subscription_plan IN ('free', 'pro', 'enterprise')),
    subscription_status text        NOT NULL DEFAULT 'active',
    created_at        timestamptz   NOT NULL DEFAULT now(),
    updated_at        timestamptz   NOT NULL DEFAULT now()
);

-- 2. Gestion des Rôles & Équipes
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('owner', 'admin', 'staff');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS public.shop_members (
    id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    shop_id     uuid        REFERENCES public.shops(id) ON DELETE CASCADE,
    user_id     uuid        REFERENCES auth.users(id) ON DELETE CASCADE,
    role        user_role   NOT NULL DEFAULT 'staff',
    created_at  timestamptz NOT NULL DEFAULT now(),
    UNIQUE(shop_id, user_id)
);

-- 3. Ajout de shop_id aux tables métier
ALTER TABLE public.categories            ADD COLUMN IF NOT EXISTS shop_id uuid REFERENCES public.shops(id) ON DELETE CASCADE;
ALTER TABLE public.products              ADD COLUMN IF NOT EXISTS shop_id uuid REFERENCES public.shops(id) ON DELETE CASCADE;
ALTER TABLE public.orders                ADD COLUMN IF NOT EXISTS shop_id uuid REFERENCES public.shops(id) ON DELETE CASCADE;
ALTER TABLE public.profiles              ADD COLUMN IF NOT EXISTS current_shop_id uuid REFERENCES public.shops(id);
ALTER TABLE public.promo_codes           ADD COLUMN IF NOT EXISTS shop_id uuid REFERENCES public.shops(id) ON DELETE CASCADE;
ALTER TABLE public.reviews               ADD COLUMN IF NOT EXISTS shop_id uuid REFERENCES public.shops(id) ON DELETE CASCADE;
ALTER TABLE public.stock_movements       ADD COLUMN IF NOT EXISTS shop_id uuid REFERENCES public.shops(id) ON DELETE CASCADE;
ALTER TABLE public.loyalty_transactions  ADD COLUMN IF NOT EXISTS shop_id uuid REFERENCES public.shops(id) ON DELETE CASCADE;
ALTER TABLE public.subscriptions         ADD COLUMN IF NOT EXISTS shop_id uuid REFERENCES public.shops(id) ON DELETE CASCADE;
ALTER TABLE public.pos_reports           ADD COLUMN IF NOT EXISTS shop_id uuid REFERENCES public.shops(id) ON DELETE CASCADE;

-- 4. Initialisation des Données (Migration progressive)

-- A. Création d'une boutique par défaut pour l'admin actuel (si présent)
DO $$
DECLARE
    v_admin_id uuid;
    v_shop_id uuid;
BEGIN
    SELECT id INTO v_admin_id FROM public.profiles WHERE is_admin = true LIMIT 1;
    
    IF v_admin_id IS NOT NULL THEN
        -- Insertion du premier Shop
        INSERT INTO public.shops (owner_id, name, slug, subscription_plan)
        VALUES (v_admin_id, 'Ma Première Boutique', 'default-shop', 'pro')
        RETURNING id INTO v_shop_id;

        -- L'admin devient owner dans shop_members
        INSERT INTO public.shop_members (shop_id, user_id, role)
        VALUES (v_shop_id, v_admin_id, 'owner');

        -- Mise à jour de toutes les données existantes vers ce shop par défaut
        UPDATE public.categories SET shop_id = v_shop_id WHERE shop_id IS NULL;
        UPDATE public.products SET shop_id = v_shop_id WHERE shop_id IS NULL;
        UPDATE public.orders SET shop_id = v_shop_id WHERE shop_id IS NULL;
        UPDATE public.profiles SET current_shop_id = v_shop_id WHERE current_shop_id IS NULL;
        UPDATE public.promo_codes SET shop_id = v_shop_id WHERE shop_id IS NULL;
        UPDATE public.reviews SET shop_id = v_shop_id WHERE shop_id IS NULL;
        UPDATE public.stock_movements SET shop_id = v_shop_id WHERE shop_id IS NULL;
        UPDATE public.loyalty_transactions SET shop_id = v_shop_id WHERE shop_id IS NULL;
        UPDATE public.subscriptions SET shop_id = v_shop_id WHERE shop_id IS NULL;
        UPDATE public.pos_reports SET shop_id = v_shop_id WHERE shop_id IS NULL;
    END IF;
END $$;

-- 5. Fonctions Utilitaires & Triggers pour le Shop ID Automatique
CREATE OR REPLACE FUNCTION public.set_shop_id_automatically()
RETURNS trigger AS $$
BEGIN
    -- Si shop_id est déjà défini (ex: par l'admin), on le garde
    IF NEW.shop_id IS NOT NULL THEN
        RETURN NEW;
    END IF;

    -- Sinon, on récupère le shop actuel de l'utilisateur depuis son profil
    SELECT current_shop_id INTO NEW.shop_id
    FROM public.profiles
    WHERE id = auth.uid();

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Application du trigger sur les tables métier
DO $$
DECLARE
    t text;
    tables text[] := ARRAY['categories', 'products', 'orders', 'promo_codes', 'reviews', 'stock_movements', 'loyalty_transactions', 'subscriptions', 'pos_reports'];
BEGIN
    FOREACH t IN ARRAY tables LOOP
        EXECUTE format('DROP TRIGGER IF EXISTS tr_set_shop_id ON public.%I', t);
        EXECUTE format('CREATE TRIGGER tr_set_shop_id BEFORE INSERT ON public.%I FOR EACH ROW EXECUTE FUNCTION public.set_shop_id_automatically()', t);
    END LOOP;
END $$;

-- 6. Row Level Security (RLS) renforcé
ALTER TABLE public.shops        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shop_members ENABLE ROW LEVEL SECURITY;

-- Shops : Visibilité si membre
DROP POLICY IF EXISTS "shops_member_read" ON public.shops;
CREATE POLICY "shops_member_read" ON public.shops
FOR SELECT USING (
    id IN (SELECT shop_id FROM public.shop_members WHERE user_id = auth.uid())
);

-- Members : visibilité au sein du shop
DROP POLICY IF EXISTS "members_shop_read" ON public.shop_members;
CREATE POLICY "members_shop_read" ON public.shop_members
FOR SELECT USING (
    shop_id IN (SELECT shop_id FROM public.shop_members WHERE user_id = auth.uid())
);

-- Politiques de table métier pour l'isolation stricte
DO $$
DECLARE
    t text;
    tables text[] := ARRAY['categories', 'products', 'orders', 'promo_codes', 'reviews', 'stock_movements', 'loyalty_transactions', 'subscriptions', 'pos_reports'];
BEGIN
    FOREACH t IN ARRAY tables LOOP
        EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
        EXECUTE format('DROP POLICY IF EXISTS "shop_isolation_policy" ON public.%I', t);
        EXECUTE format('CREATE POLICY "shop_isolation_policy" ON public.%I FOR ALL USING (shop_id IN (SELECT shop_id FROM public.shop_members WHERE user_id = auth.uid()))', t);
    END LOOP;
END $$;

-- Exceptions pour la lecture publique (si nécessaire, ex: produits du shop actuel)
-- Note: Pour le e-commerce, on doit permettre la lecture anonyme si on connaît le shop_id.
-- On peut ajouter une politique SELECT basée sur le shop actif du visiteur.

-- 7. Grant Permissions
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO authenticated;
