-- ═══════════════════════════════════════════════════════════════════════════
-- 🌿 GREEN IA CBD — SCHÉMA BDD COMPLET (Consolidé)
-- Fusionne toutes les migrations v1 → v9 dans l'ordre logique
-- À exécuter dans : Supabase Dashboard → SQL Editor (une seule fois sur DB vierge)
-- ═══════════════════════════════════════════════════════════════════════════

-- ─────────────────────────────────────────────────────────────────────────────
-- 0. EXTENSIONS
-- ─────────────────────────────────────────────────────────────────────────────

CREATE EXTENSION IF NOT EXISTS vector;

-- ═══════════════════════════════════════════════════════════════════════════
-- 1. TABLES PRINCIPALES
-- ═══════════════════════════════════════════════════════════════════════════

-- ─── 1.1 categories ──────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.categories (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        text        UNIQUE NOT NULL,
  name        text        NOT NULL,
  description text,
  icon_name   text,
  image_url   text,
  sort_order  int         NOT NULL DEFAULT 0,
  is_active   boolean     NOT NULL DEFAULT true,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- ─── 1.2 products ────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.products (
  id               uuid           PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id      uuid           NOT NULL REFERENCES public.categories(id),
  slug             text           UNIQUE NOT NULL,
  name             text           NOT NULL,
  description      text,
  cbd_percentage   numeric(5,2),
  thc_max          numeric(5,3),
  weight_grams     numeric(8,2),
  price            numeric(10,2)  NOT NULL,
  image_url        text,
  stock_quantity   int            NOT NULL DEFAULT 0,
  is_available     boolean        NOT NULL DEFAULT true,
  is_featured      boolean        NOT NULL DEFAULT false,
  is_active        boolean        NOT NULL DEFAULT true,
  is_bundle        boolean        NOT NULL DEFAULT false,
  original_value   numeric(10,2),           -- Prix total séparé (pour bundles)
  attributes       jsonb          DEFAULT '{}'::jsonb,  -- Benefits & arômes
  sku              text           UNIQUE,               -- Code barre / SKU
  embedding        vector(768),                         -- Vector search Gemini
  created_at       timestamptz    NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_products_sku ON public.products(sku);

-- ─── 1.3 profiles ────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.profiles (
  id               uuid    PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name        text,
  phone            text,
  loyalty_points   int     NOT NULL DEFAULT 0,
  is_admin         boolean NOT NULL DEFAULT false,
  referral_code    text    UNIQUE,
  referred_by_id   uuid    REFERENCES public.profiles(id),
  created_at       timestamptz NOT NULL DEFAULT now()
);

-- ─── 1.4 addresses ───────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.addresses (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  label       text        NOT NULL DEFAULT 'Domicile',
  street      text        NOT NULL,
  city        text        NOT NULL,
  postal_code text        NOT NULL,
  country     text        NOT NULL DEFAULT 'France',
  is_default  boolean     NOT NULL DEFAULT false,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- ─── 1.5 orders ──────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.orders (
  id                      uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                 uuid          REFERENCES public.profiles(id),
  status                  text          NOT NULL DEFAULT 'pending',
  delivery_type           text          NOT NULL DEFAULT 'click_collect',
  address_id              uuid          REFERENCES public.addresses(id),
  subtotal                numeric(10,2) NOT NULL,
  delivery_fee            numeric(10,2) NOT NULL DEFAULT 0,
  total                   numeric(10,2) NOT NULL,
  loyalty_points_earned   int           NOT NULL DEFAULT 0,
  loyalty_points_redeemed int           NOT NULL DEFAULT 0,
  promo_code              text,
  promo_discount          numeric(10,2) NOT NULL DEFAULT 0,
  viva_order_code         text,
  payment_status          text          NOT NULL DEFAULT 'pending',
  notes                   text,
  created_at              timestamptz   NOT NULL DEFAULT now()
);

-- ─── 1.6 order_items ─────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.order_items (
  id           uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id     uuid          NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id   uuid          NOT NULL REFERENCES public.products(id),
  product_name text          NOT NULL,
  unit_price   numeric(10,2) NOT NULL,
  quantity     int           NOT NULL,
  total_price  numeric(10,2) NOT NULL
);

-- ─── 1.7 stock_movements ─────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.stock_movements (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id      uuid        NOT NULL REFERENCES public.products(id),
  quantity_change int         NOT NULL,
  type            text        NOT NULL,
  note            text,
  created_at      timestamptz NOT NULL DEFAULT now()
);

-- ─── 1.8 store_settings ──────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.store_settings (
  key        text        PRIMARY KEY,
  value      jsonb       NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- ═══════════════════════════════════════════════════════════════════════════
-- 2. TABLES FIDÉLITÉ & ABONNEMENTS
-- ═══════════════════════════════════════════════════════════════════════════

-- ─── 2.1 loyalty_transactions ────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.loyalty_transactions (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       uuid        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  order_id      uuid        REFERENCES public.orders(id) ON DELETE SET NULL,
  type          text        NOT NULL CHECK (type IN ('earned', 'redeemed', 'adjusted', 'expired')),
  points        int         NOT NULL,
  balance_after int         NOT NULL,
  note          text,
  created_at    timestamptz NOT NULL DEFAULT now()
);

-- ─── 2.2 subscriptions ───────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.subscriptions (
  id                 uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id            uuid        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  product_id         uuid        NOT NULL REFERENCES public.products(id),
  quantity           int         NOT NULL DEFAULT 1 CHECK (quantity > 0),
  frequency          text        NOT NULL CHECK (frequency IN ('weekly', 'biweekly', 'monthly')),
  next_delivery_date date        NOT NULL,
  status             text        NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'paused', 'cancelled')),
  created_at         timestamptz NOT NULL DEFAULT now()
);

-- ─── 2.3 subscription_orders ─────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.subscription_orders (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id uuid        NOT NULL REFERENCES public.subscriptions(id) ON DELETE CASCADE,
  order_id        uuid        NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  created_at      timestamptz NOT NULL DEFAULT now()
);

-- ═══════════════════════════════════════════════════════════════════════════
-- 3. TABLES PRODUITS AVANCÉES
-- ═══════════════════════════════════════════════════════════════════════════

-- ─── 3.1 reviews ─────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.reviews (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id   uuid        NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  user_id      uuid        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  order_id     uuid        NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  rating       smallint    NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment      text,
  is_verified  boolean     NOT NULL DEFAULT false,
  is_published boolean     NOT NULL DEFAULT false,
  created_at   timestamptz NOT NULL DEFAULT now(),
  UNIQUE (product_id, user_id, order_id)
);

-- ─── 3.2 bundle_items ────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.bundle_items (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  bundle_id  uuid        NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  product_id uuid        NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  quantity   int         NOT NULL DEFAULT 1 CHECK (quantity > 0),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (bundle_id, product_id)
);

CREATE INDEX IF NOT EXISTS idx_bundle_items_bundle_id ON public.bundle_items(bundle_id);

-- ─── 3.3 product_recommendations ─────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.product_recommendations (
  id             uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id     uuid        NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  recommended_id uuid        NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  sort_order     int         NOT NULL DEFAULT 0,
  created_at     timestamptz NOT NULL DEFAULT now(),
  UNIQUE (product_id, recommended_id),
  CHECK (product_id <> recommended_id)
);

-- ─── 3.4 product_images ──────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.product_images (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid        NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  image_url  text        NOT NULL,
  sort_order int         DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- ─── 3.5 promo_codes ─────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.promo_codes (
  id              uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
  code            text          UNIQUE NOT NULL,
  description     text,
  discount_type   text          NOT NULL CHECK (discount_type IN ('percent', 'fixed')),
  discount_value  numeric(10,2) NOT NULL CHECK (discount_value > 0),
  min_order_value numeric(10,2) NOT NULL DEFAULT 0,
  max_uses        int,
  uses_count      int           NOT NULL DEFAULT 0,
  expires_at      timestamptz,
  is_active       boolean       NOT NULL DEFAULT true,
  created_at      timestamptz   NOT NULL DEFAULT now()
);

-- ─── 3.6 wishlists ───────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.wishlists (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id uuid        NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE (user_id, product_id)
);

-- ═══════════════════════════════════════════════════════════════════════════
-- 4. TABLES PARRAINAGE & IA
-- ═══════════════════════════════════════════════════════════════════════════

-- ─── 4.1 referrals ───────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.referrals (
  id             uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id    uuid        NOT NULL REFERENCES public.profiles(id),
  referee_id     uuid        NOT NULL REFERENCES public.profiles(id),
  status         text        NOT NULL DEFAULT 'joined' CHECK (status IN ('joined', 'completed')),
  reward_issued  boolean     DEFAULT false,
  points_awarded int         DEFAULT 0,
  created_at     timestamptz DEFAULT now()
);

-- ─── 4.2 user_ai_preferences ─────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.user_ai_preferences (
  user_id               uuid        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  goal                  text,
  experience_level      text,
  preferred_format      text,
  budget_range          text,
  terpene_preferences   text[]      DEFAULT '{}',
  age_range             text,
  intensity_preference  text,
  extra_prefs           jsonb       DEFAULT '{}'::jsonb,
  updated_at            timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_user_ai_extra_prefs ON public.user_ai_preferences USING GIN (extra_prefs);

-- ─── 4.3 budtender_interactions ──────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.budtender_interactions (
  id                   uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id              uuid        REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id           text,       -- Nullable (rendu optionnel via fix migration)
  interaction_type     text        NOT NULL,   -- 'chat_session', 'quiz_result', 'product_click'
  quiz_answers         jsonb       DEFAULT '{}',
  recommended_products uuid[],
  clicked_product      uuid        REFERENCES public.products(id) ON DELETE SET NULL,
  feedback             text        CHECK (feedback IN ('positive', 'negative')),
  created_at           timestamptz DEFAULT now()
);

COMMENT ON COLUMN public.budtender_interactions.clicked_product IS 'ID of the product clicked during a recommendation session';
COMMENT ON COLUMN public.budtender_interactions.feedback IS 'User satisfaction feedback: positive or negative';
COMMENT ON COLUMN public.budtender_interactions.recommended_products IS 'List of product IDs suggested by the AI in this interaction';

-- ═══════════════════════════════════════════════════════════════════════════
-- 5. TABLES POS (Point of Sale)
-- ═══════════════════════════════════════════════════════════════════════════

-- ─── 5.1 pos_reports (Clôture Z) ─────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.pos_reports (
  id                uuid          PRIMARY KEY DEFAULT gen_random_uuid(),
  date              date          UNIQUE NOT NULL DEFAULT CURRENT_DATE,
  total_sales       numeric(10,2) NOT NULL DEFAULT 0,
  cash_total        numeric(10,2) NOT NULL DEFAULT 0,
  card_total        numeric(10,2) NOT NULL DEFAULT 0,
  mobile_total      numeric(10,2) NOT NULL DEFAULT 0,
  items_sold        int           NOT NULL DEFAULT 0,
  order_count       int           NOT NULL DEFAULT 0,
  product_breakdown jsonb         DEFAULT '{}'::jsonb,  -- Détail par produit
  cash_counted      numeric(10,2) DEFAULT 0,            -- Espèces comptées
  cash_difference   numeric(10,2) DEFAULT 0,            -- Écart de caisse
  closed_at         timestamptz   NOT NULL DEFAULT now(),
  closed_by         uuid          REFERENCES public.profiles(id),
  created_at        timestamptz   NOT NULL DEFAULT now()
);

-- ═══════════════════════════════════════════════════════════════════════════
-- 6. STORAGE — Bucket product-images
-- ═══════════════════════════════════════════════════════════════════════════

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'product-images') THEN
    INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
    VALUES (
      'product-images',
      'product-images',
      true,
      5242880,  -- 5 Mo
      ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    );
  END IF;
END $$;

-- ═══════════════════════════════════════════════════════════════════════════
-- 7. FONCTIONS & TRIGGERS
-- ═══════════════════════════════════════════════════════════════════════════

-- ─── 7.1 Trigger : créer profil à l'inscription ──────────────────────────────

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (new.id, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ─── 7.2 Génération de code de parrainage (robuste, SECURITY DEFINER) ────────

CREATE OR REPLACE FUNCTION public.generate_referral_code()
RETURNS TEXT AS $$
DECLARE
  new_code TEXT;
  done     BOOLEAN DEFAULT FALSE;
BEGIN
  FOR i IN 1..10 LOOP
    new_code := 'GRN-' || upper(substring(md5(random()::text) from 1 for 6));
    done := NOT EXISTS (SELECT 1 FROM public.profiles WHERE referral_code = new_code);
    IF done THEN
      RETURN new_code;
    END IF;
  END LOOP;
  -- Fallback avec timestamp si les 10 tentatives échouent (extrêmement rare)
  RETURN 'GRN-' || upper(substring(md5(now()::text) from 1 for 6));
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.tr_generate_referral_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.referral_code IS NULL THEN
    BEGIN
      NEW.referral_code := public.generate_referral_code();
    EXCEPTION WHEN OTHERS THEN
      -- Ne bloque pas l'inscription en cas d'échec
      RAISE WARNING 'Referral code generation failed: %', SQLERRM;
    END;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_profile_created_gen_code ON public.profiles;
CREATE TRIGGER on_profile_created_gen_code
  BEFORE INSERT ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.tr_generate_referral_code();

-- ─── 7.3 Synchronisation des stocks de bundles ───────────────────────────────

CREATE OR REPLACE FUNCTION public.sync_bundle_stock(p_bundle_id uuid)
RETURNS void AS $$
DECLARE
  min_stock int;
BEGIN
  SELECT MIN(FLOOR(p.stock_quantity::float / bi.quantity))::int
    INTO min_stock
    FROM public.bundle_items bi
    JOIN public.products p ON p.id = bi.product_id
   WHERE bi.bundle_id = p_bundle_id;

  UPDATE public.products
     SET stock_quantity = COALESCE(min_stock, 0)
   WHERE id = p_bundle_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.trigger_sync_bundles_on_stock_change()
RETURNS trigger AS $$
DECLARE
  r record;
BEGIN
  FOR r IN
    SELECT DISTINCT bundle_id FROM public.bundle_items WHERE product_id = NEW.id
  LOOP
    PERFORM public.sync_bundle_stock(r.bundle_id);
  END LOOP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_sync_bundle_stock ON public.products;
CREATE TRIGGER trg_sync_bundle_stock
  AFTER UPDATE OF stock_quantity ON public.products
  FOR EACH ROW
  WHEN (OLD.stock_quantity IS DISTINCT FROM NEW.stock_quantity AND NEW.is_bundle = false)
  EXECUTE FUNCTION public.trigger_sync_bundles_on_stock_change();

-- ─── 7.4 Utilisation des codes promo ─────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.increment_promo_uses(code_text text)
RETURNS void AS $$
BEGIN
  UPDATE public.promo_codes SET uses_count = uses_count + 1 WHERE code = code_text;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ─── 7.5 RPC : Recommandations produits (explicites + fallback catégorie) ─────

CREATE OR REPLACE FUNCTION public.get_product_recommendations(p_product_id uuid, p_limit int DEFAULT 4)
RETURNS SETOF public.products AS $$
DECLARE
  cat_id uuid;
BEGIN
  SELECT category_id INTO cat_id FROM public.products WHERE id = p_product_id;

  RETURN QUERY
    SELECT prod.*
    FROM (
        SELECT r.recommended_id as id, 0 AS priority, r.sort_order AS srt
        FROM public.product_recommendations r
        JOIN public.products p ON p.id = r.recommended_id
        WHERE r.product_id = p_product_id
          AND p.is_active = true AND p.is_available = true
        UNION ALL
        SELECT p.id, 1 AS priority, (random() * 100)::int AS srt
        FROM public.products p
        WHERE p.category_id = cat_id
          AND p.id <> p_product_id
          AND p.is_active = true AND p.is_available = true
          AND NOT EXISTS (
            SELECT 1 FROM public.product_recommendations
            WHERE product_id = p_product_id AND recommended_id = p.id
          )
    ) sub
    JOIN public.products prod ON prod.id = sub.id
    ORDER BY sub.priority, sub.srt
    LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- ─── 7.6 RPC : Recherche vectorielle (Vector Search Gemini) ──────────────────

CREATE OR REPLACE FUNCTION public.match_products (
  query_embedding vector(768),
  match_threshold float,
  match_count     int
)
RETURNS TABLE (
  id             uuid,
  category_id    uuid,
  slug           text,
  name           text,
  description    text,
  cbd_percentage numeric(5,2),
  thc_max        numeric(5,3),
  weight_grams   numeric(8,2),
  price          numeric(10,2),
  image_url      text,
  stock_quantity int,
  is_available   boolean,
  is_featured    boolean,
  is_active      boolean,
  created_at     timestamptz,
  attributes     jsonb,
  is_bundle      boolean,
  original_value numeric(10,2),
  similarity     float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.id, p.category_id, p.slug, p.name, p.description,
    p.cbd_percentage, p.thc_max, p.weight_grams, p.price, p.image_url,
    p.stock_quantity, p.is_available, p.is_featured, p.is_active, p.created_at,
    p.attributes, p.is_bundle, p.original_value,
    1 - (p.embedding <=> query_embedding) AS similarity
  FROM public.products p
  WHERE p.is_active = true
    AND p.is_available = true
    AND 1 - (p.embedding <=> query_embedding) > match_threshold
  ORDER BY p.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- ─── 7.7 RPC POS : Créer un client en caisse ─────────────────────────────────

CREATE OR REPLACE FUNCTION public.create_pos_customer(
  p_full_name text,
  p_phone     text DEFAULT NULL
)
RETURNS uuid AS $$
DECLARE
  v_user_id uuid := gen_random_uuid();
  v_email   text := 'pos_' || replace(v_user_id::text, '-', '') || '@greenmoon.internal';
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true
  ) THEN
    RAISE EXCEPTION 'Unauthorized: admin access required';
  END IF;

  INSERT INTO auth.users (
    id, email, encrypted_password, email_confirmed_at,
    role, raw_user_meta_data, created_at, updated_at, aud, confirmation_token
  )
  VALUES (
    v_user_id, v_email, '', now(), 'authenticated',
    jsonb_build_object('full_name', p_full_name),
    now(), now(), 'authenticated', ''
  );

  IF p_phone IS NOT NULL AND p_phone <> '' THEN
    UPDATE public.profiles SET phone = p_phone WHERE id = v_user_id;
  END IF;

  RETURN v_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION public.create_pos_customer(text, text) TO authenticated;

COMMENT ON FUNCTION public.create_pos_customer IS
  'Crée un profil client depuis le terminal POS. Admin uniquement. '
  'Insère un auth.users minimal pour déclencher handle_new_user.';

-- ═══════════════════════════════════════════════════════════════════════════
-- 8. ROW LEVEL SECURITY (RLS)
-- ═══════════════════════════════════════════════════════════════════════════

ALTER TABLE public.categories            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders                ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stock_movements       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_settings        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loyalty_transactions  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_orders   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews               ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bundle_items          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promo_codes           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_ai_preferences   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.budtender_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pos_reports           ENABLE ROW LEVEL SECURITY;

-- ─── categories ──────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "categories_public_read"  ON public.categories;
CREATE POLICY "categories_public_read"  ON public.categories FOR SELECT USING (true);
DROP POLICY IF EXISTS "categories_admin_write"  ON public.categories;
CREATE POLICY "categories_admin_write"  ON public.categories FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- ─── products ─────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "products_public_read"    ON public.products;
CREATE POLICY "products_public_read"    ON public.products FOR SELECT USING (true);
DROP POLICY IF EXISTS "products_admin_write"    ON public.products;
CREATE POLICY "products_admin_write"    ON public.products FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- ─── profiles ─────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "profiles_self_read"      ON public.profiles;
CREATE POLICY "profiles_self_read"      ON public.profiles FOR SELECT USING (
  id = auth.uid() OR
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);
DROP POLICY IF EXISTS "profiles_self_update"    ON public.profiles;
CREATE POLICY "profiles_self_update"    ON public.profiles FOR UPDATE USING (id = auth.uid());
DROP POLICY IF EXISTS "profiles_admin_all"      ON public.profiles;
CREATE POLICY "profiles_admin_all"      ON public.profiles FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- ─── addresses ───────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "addresses_owner"         ON public.addresses;
CREATE POLICY "addresses_owner"         ON public.addresses FOR ALL USING (user_id = auth.uid());

-- ─── orders ───────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "orders_owner_read"       ON public.orders;
CREATE POLICY "orders_owner_read"       ON public.orders FOR SELECT USING (
  user_id = auth.uid() OR
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);
DROP POLICY IF EXISTS "orders_auth_insert"      ON public.orders;
CREATE POLICY "orders_auth_insert"      ON public.orders FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
DROP POLICY IF EXISTS "orders_admin_update"     ON public.orders;
CREATE POLICY "orders_admin_update"     ON public.orders FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- ─── order_items ──────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "order_items_owner_read"  ON public.order_items;
CREATE POLICY "order_items_owner_read"  ON public.order_items FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.orders o WHERE o.id = order_id AND (
      o.user_id = auth.uid() OR
      EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
    )
  )
);
DROP POLICY IF EXISTS "order_items_auth_insert" ON public.order_items;
CREATE POLICY "order_items_auth_insert" ON public.order_items FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- ─── stock_movements ──────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "stock_admin_all"         ON public.stock_movements;
CREATE POLICY "stock_admin_all"         ON public.stock_movements FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- ─── store_settings ───────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "store_settings_public_read" ON public.store_settings;
CREATE POLICY "store_settings_public_read" ON public.store_settings FOR SELECT USING (true);
DROP POLICY IF EXISTS "store_settings_admin_all"   ON public.store_settings;
CREATE POLICY "store_settings_admin_all"   ON public.store_settings FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- ─── loyalty_transactions ─────────────────────────────────────────────────────
DROP POLICY IF EXISTS "loyalty_tx_owner_read"   ON public.loyalty_transactions;
CREATE POLICY "loyalty_tx_owner_read"   ON public.loyalty_transactions FOR SELECT USING (
  user_id = auth.uid() OR
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);
DROP POLICY IF EXISTS "loyalty_tx_auth_insert"  ON public.loyalty_transactions;
CREATE POLICY "loyalty_tx_auth_insert"  ON public.loyalty_transactions FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
DROP POLICY IF EXISTS "loyalty_tx_admin_all"    ON public.loyalty_transactions;
CREATE POLICY "loyalty_tx_admin_all"    ON public.loyalty_transactions FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- ─── subscriptions ────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "subscriptions_owner_read"   ON public.subscriptions;
CREATE POLICY "subscriptions_owner_read"   ON public.subscriptions FOR SELECT USING (
  user_id = auth.uid() OR
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);
DROP POLICY IF EXISTS "subscriptions_owner_insert" ON public.subscriptions;
CREATE POLICY "subscriptions_owner_insert" ON public.subscriptions FOR INSERT WITH CHECK (user_id = auth.uid());
DROP POLICY IF EXISTS "subscriptions_owner_update" ON public.subscriptions;
CREATE POLICY "subscriptions_owner_update" ON public.subscriptions FOR UPDATE USING (
  user_id = auth.uid() OR
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- ─── subscription_orders ──────────────────────────────────────────────────────
DROP POLICY IF EXISTS "sub_orders_owner_read"   ON public.subscription_orders;
CREATE POLICY "sub_orders_owner_read"   ON public.subscription_orders FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.subscriptions s WHERE s.id = subscription_id AND (
      s.user_id = auth.uid() OR
      EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
    )
  )
);
DROP POLICY IF EXISTS "sub_orders_admin_insert" ON public.subscription_orders;
CREATE POLICY "sub_orders_admin_insert" ON public.subscription_orders FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- ─── reviews ──────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "reviews_public_read"     ON public.reviews;
CREATE POLICY "reviews_public_read"     ON public.reviews FOR SELECT USING (
  is_published = true OR user_id = auth.uid() OR
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);
DROP POLICY IF EXISTS "reviews_owner_insert"    ON public.reviews;
CREATE POLICY "reviews_owner_insert"    ON public.reviews FOR INSERT WITH CHECK (
  auth.uid() IS NOT NULL AND user_id = auth.uid()
);
DROP POLICY IF EXISTS "reviews_owner_update"    ON public.reviews;
CREATE POLICY "reviews_owner_update"    ON public.reviews FOR UPDATE
  USING (user_id = auth.uid() AND is_published = false);
DROP POLICY IF EXISTS "reviews_admin_all"       ON public.reviews;
CREATE POLICY "reviews_admin_all"       ON public.reviews FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- ─── bundle_items ─────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "bundle_items_public_read" ON public.bundle_items;
CREATE POLICY "bundle_items_public_read" ON public.bundle_items FOR SELECT USING (true);
DROP POLICY IF EXISTS "bundle_items_admin_all"   ON public.bundle_items;
CREATE POLICY "bundle_items_admin_all"   ON public.bundle_items FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- ─── product_recommendations ──────────────────────────────────────────────────
DROP POLICY IF EXISTS "recommendations_public_read" ON public.product_recommendations;
CREATE POLICY "recommendations_public_read" ON public.product_recommendations FOR SELECT USING (true);
DROP POLICY IF EXISTS "recommendations_admin_all"   ON public.product_recommendations;
CREATE POLICY "recommendations_admin_all"   ON public.product_recommendations FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- ─── product_images ───────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "product_images_public_select" ON public.product_images;
CREATE POLICY "product_images_public_select" ON public.product_images FOR SELECT USING (true);
DROP POLICY IF EXISTS "product_images_admin_insert"  ON public.product_images;
CREATE POLICY "product_images_admin_insert"  ON public.product_images FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);
DROP POLICY IF EXISTS "product_images_admin_update"  ON public.product_images;
CREATE POLICY "product_images_admin_update"  ON public.product_images FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);
DROP POLICY IF EXISTS "product_images_admin_delete"  ON public.product_images;
CREATE POLICY "product_images_admin_delete"  ON public.product_images FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- ─── promo_codes ──────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "promo_codes_auth_read"  ON public.promo_codes;
CREATE POLICY "promo_codes_auth_read"  ON public.promo_codes FOR SELECT USING (auth.uid() IS NOT NULL);
DROP POLICY IF EXISTS "promo_codes_admin_all"  ON public.promo_codes;
CREATE POLICY "promo_codes_admin_all"  ON public.promo_codes FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- ─── wishlists ────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "wishlists_owner_select" ON public.wishlists;
CREATE POLICY "wishlists_owner_select" ON public.wishlists FOR SELECT USING (user_id = auth.uid());
DROP POLICY IF EXISTS "wishlists_owner_insert" ON public.wishlists;
CREATE POLICY "wishlists_owner_insert" ON public.wishlists FOR INSERT WITH CHECK (user_id = auth.uid());
DROP POLICY IF EXISTS "wishlists_owner_delete" ON public.wishlists;
CREATE POLICY "wishlists_owner_delete" ON public.wishlists FOR DELETE USING (user_id = auth.uid());

-- ─── referrals ────────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "referrals_referrer_read" ON public.referrals;
CREATE POLICY "referrals_referrer_read" ON public.referrals FOR SELECT USING (auth.uid() = referrer_id);
DROP POLICY IF EXISTS "referrals_referee_read"  ON public.referrals;
CREATE POLICY "referrals_referee_read"  ON public.referrals FOR SELECT USING (auth.uid() = referee_id);

GRANT ALL ON public.referrals TO authenticated;
GRANT ALL ON public.referrals TO anon;
GRANT ALL ON public.referrals TO service_role;

-- ─── user_ai_preferences ──────────────────────────────────────────────────────
DROP POLICY IF EXISTS "ai_prefs_owner_select" ON public.user_ai_preferences;
CREATE POLICY "ai_prefs_owner_select" ON public.user_ai_preferences FOR SELECT USING (
  user_id = auth.uid() OR
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);
DROP POLICY IF EXISTS "ai_prefs_owner_insert" ON public.user_ai_preferences;
CREATE POLICY "ai_prefs_owner_insert" ON public.user_ai_preferences FOR INSERT WITH CHECK (user_id = auth.uid());
DROP POLICY IF EXISTS "ai_prefs_owner_update" ON public.user_ai_preferences;
CREATE POLICY "ai_prefs_owner_update" ON public.user_ai_preferences FOR UPDATE USING (user_id = auth.uid());
DROP POLICY IF EXISTS "ai_prefs_owner_delete" ON public.user_ai_preferences;
CREATE POLICY "ai_prefs_owner_delete" ON public.user_ai_preferences FOR DELETE USING (user_id = auth.uid());
DROP POLICY IF EXISTS "ai_prefs_admin_select"  ON public.user_ai_preferences;
CREATE POLICY "ai_prefs_admin_select"  ON public.user_ai_preferences FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- ─── budtender_interactions ───────────────────────────────────────────────────
DROP POLICY IF EXISTS "budtender_interactions_user_all"    ON public.budtender_interactions;
CREATE POLICY "budtender_interactions_user_all"    ON public.budtender_interactions FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "budtender_interactions_user_insert" ON public.budtender_interactions;
CREATE POLICY "budtender_interactions_user_insert" ON public.budtender_interactions FOR INSERT WITH CHECK (
  auth.uid() IS NOT NULL AND (user_id = auth.uid() OR user_id IS NULL)
);
DROP POLICY IF EXISTS "budtender_interactions_admin_select" ON public.budtender_interactions;
CREATE POLICY "budtender_interactions_admin_select" ON public.budtender_interactions FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- ─── pos_reports ──────────────────────────────────────────────────────────────
DROP POLICY IF EXISTS "pos_reports_admin_all" ON public.pos_reports;
CREATE POLICY "pos_reports_admin_all" ON public.pos_reports FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- ─── Storage : product-images ─────────────────────────────────────────────────
DROP POLICY IF EXISTS "product_images_public_read"  ON storage.objects;
CREATE POLICY "product_images_public_read"  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');
DROP POLICY IF EXISTS "product_images_admin_insert" ON storage.objects;
CREATE POLICY "product_images_admin_insert" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'product-images'
  AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);
DROP POLICY IF EXISTS "product_images_admin_update" ON storage.objects;
CREATE POLICY "product_images_admin_update" ON storage.objects FOR UPDATE USING (
  bucket_id = 'product-images'
  AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);
DROP POLICY IF EXISTS "product_images_admin_delete" ON storage.objects;
CREATE POLICY "product_images_admin_delete" ON storage.objects FOR DELETE USING (
  bucket_id = 'product-images'
  AND EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND is_admin = true)
);

-- ═══════════════════════════════════════════════════════════════════════════
-- 9. DONNÉES INITIALES (SEED)
-- ═══════════════════════════════════════════════════════════════════════════

-- ─── Catégories ───────────────────────────────────────────────────────────────

INSERT INTO public.categories (slug, name, description, icon_name, image_url, sort_order) VALUES
  ('fleurs',  'Fleurs CBD',       'Fleurs de CBD de haute qualité, récoltées avec soin pour une expérience aromatique exceptionnelle.', 'Flower',   'https://images.unsplash.com/photo-1584467541268-b040f83be3fd?w=800', 1),
  ('resines', 'Résines & Pollens','Concentrés de CBD artisanaux, extraits selon des méthodes traditionnelles respectueuses des terpènes.', 'Droplets', 'https://images.unsplash.com/photo-1611241893603-3c359704e0ee?w=800', 2),
  ('huiles',  'Huiles & Infusions','Huiles CBD full spectrum et infusions relaxantes, formulées pour votre bien-être quotidien.', 'Leaf',     'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=800', 3)
ON CONFLICT (slug) DO NOTHING;

-- ─── Produits, bundles, SKU et recommandations ────────────────────────────────

DO $$
DECLARE
  cat_fleurs   uuid;
  cat_resines  uuid;
  cat_huiles   uuid;
  bundle_id    uuid;
  oil_id       uuid;
  infusion_id  uuid;
  oil10 uuid; oil20 uuid; inf_det uuid; inf_dig uuid;
  amnesia uuid; gelato uuid; afghan uuid;
BEGIN
  SELECT id INTO cat_fleurs  FROM public.categories WHERE slug = 'fleurs';
  SELECT id INTO cat_resines FROM public.categories WHERE slug = 'resines';
  SELECT id INTO cat_huiles  FROM public.categories WHERE slug = 'huiles';

  -- Produits
  INSERT INTO public.products (category_id, slug, name, description, cbd_percentage, thc_max, weight_grams, price, image_url, stock_quantity, is_featured, sku) VALUES
    (cat_fleurs,  'amnesia-haze',           'Amnesia Haze',            'Variété sativa légendaire aux arômes citronnés et terreux. Idéale pour la journée.',                                18.5, 0.2, 3,    12.90, 'https://images.unsplash.com/photo-1526770542827-70b22c6e7e8d?w=800', 50, true,  '10001'),
    (cat_fleurs,  'gelato',                 'Gelato',                  'Hybride équilibré aux notes sucrées de dessert. Parfum floral et fruité intense.',                                  22.0, 0.2, 3,    14.90, 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800', 35, true,  '10002'),
    (cat_fleurs,  'white-widow',            'White Widow',             'Classique intemporel aux cristaux de résine abondants. Goût boisé et épicé.',                                       20.0, 0.2, 3,    13.90, 'https://images.unsplash.com/photo-1585435421671-0c16764628a9?w=800', 40, false, NULL),
    (cat_fleurs,  'strawberry',             'Strawberry',              'Notes fruitées de fraise mûre. L''une de nos variétés les plus appréciées.',                                        16.0, 0.2, 3,    11.90, 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800', 60, false, NULL),
    (cat_resines, 'afghan',                 'Afghan',                  'Résine afghane traditionnelle aux arômes terreux et épicés. Texture souple et malléable.',                          30.0, 0.2, 3,    18.90, 'https://images.unsplash.com/photo-1611241893603-3c359704e0ee?w=800', 25, true,  '10003'),
    (cat_resines, 'jaune-mousseux',         'Jaune Mousseux',          'Pollen pressé à froid aux reflets dorés. Goût doux et légèrement floral.',                                         25.0, 0.2, 3,    16.90, 'https://images.unsplash.com/photo-1584467541268-b040f83be3fd?w=800', 20, false, NULL),
    (cat_resines, 'filtre-x3',              'Filtré x3',               'Triple filtration pour une pureté maximale. Texture fine et homogène.',                                             35.0, 0.2, 3,    22.90, 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=800', 15, false, NULL),
    (cat_resines, 'ice-o-lator',            'Ice O Lator',             'Extraction à l''eau glacée pour préserver les terpènes. Qualité premium.',                                         40.0, 0.2, 3,    28.90, 'https://images.unsplash.com/photo-1526770542827-70b22c6e7e8d?w=800', 10, true,  NULL),
    (cat_huiles,  'huile-10-full-spectrum', 'Huile 10% Full Spectrum', 'Huile CBD full spectrum 10% avec tous les cannabinoïdes bénéfiques. Flacon 30ml.',                                10.0, 0.2, NULL, 34.90, 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800', 30, true,  NULL),
    (cat_huiles,  'huile-20-sommeil',       'Huile 20% Sommeil',       'Formule enrichie en mélatonine et CBD 20% pour un sommeil réparateur. Flacon 30ml.',                               20.0, 0.2, NULL, 54.90, 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800', 20, true,  NULL),
    (cat_huiles,  'infusion-detente',       'Infusion Détente',        'Mélange de plantes bio avec fleurs de CBD. Camomille, tilleul et lavande. Boîte 30 sachets.',                     5.0,  0.1, NULL, 16.90, 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800', 45, false, NULL),
    (cat_huiles,  'infusion-digestion',     'Infusion Digestion',      'Association fenouil, menthe et CBD pour soutenir le confort digestif. Boîte 30 sachets.',                          5.0,  0.1, NULL, 16.90, 'https://images.unsplash.com/photo-1585435421671-0c16764628a9?w=800', 45, false, NULL)
  ON CONFLICT (slug) DO NOTHING;

  -- Attributs produits
  UPDATE public.products SET attributes = jsonb_build_object('benefits', jsonb_build_array('Détente Profonde'),  'aromas', jsonb_build_array('Terreux', 'Épicé'))      WHERE slug IN ('amnesia-haze', 'afghan');
  UPDATE public.products SET attributes = jsonb_build_object('benefits', jsonb_build_array('Focus & Énergie'),   'aromas', jsonb_build_array('Fruité'))                WHERE slug = 'gelato';
  UPDATE public.products SET attributes = jsonb_build_object('benefits', jsonb_build_array('Détente Profonde'),  'aromas', jsonb_build_array('Naturel'))               WHERE slug LIKE 'huile%';
  UPDATE public.products SET attributes = jsonb_build_object('benefits', jsonb_build_array('Sommeil Réparateur'),'aromas', jsonb_build_array('Naturel'))               WHERE slug = 'huile-20-sommeil';
  UPDATE public.products SET attributes = jsonb_build_object('benefits', jsonb_build_array('Détente Profonde'),  'aromas', jsonb_build_array('Fruité', 'Floral'))      WHERE slug = 'infusion-detente';
  UPDATE public.products SET attributes = jsonb_build_object('benefits', jsonb_build_array('Confort Digestif'),  'aromas', jsonb_build_array('Herbacé'))               WHERE slug = 'infusion-digestion';

  -- Bundle : Pack Nuit Paisible
  SELECT id INTO oil_id      FROM public.products WHERE slug = 'huile-20-sommeil' LIMIT 1;
  SELECT id INTO infusion_id FROM public.products WHERE slug = 'infusion-detente' LIMIT 1;

  IF oil_id IS NOT NULL AND infusion_id IS NOT NULL THEN
    INSERT INTO public.products (
      category_id, slug, name, description,
      price, original_value, image_url, stock_quantity,
      is_available, is_featured, is_active, is_bundle, sku
    )
    SELECT
      cat_huiles,
      'pack-nuit-paisible',
      'Pack Nuit Paisible',
      'Le duo parfait pour des nuits sereines : Huile CBD 20% Sommeil + Infusion Détente. Économisez 10€ vs l''achat séparé.',
      64.90, 71.80,
      'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800',
      0, true, true, true, true, '20001'
    WHERE NOT EXISTS (SELECT 1 FROM public.products WHERE slug = 'pack-nuit-paisible')
    RETURNING id INTO bundle_id;

    IF bundle_id IS NOT NULL THEN
      INSERT INTO public.bundle_items (bundle_id, product_id, quantity) VALUES
        (bundle_id, oil_id, 1),
        (bundle_id, infusion_id, 1)
      ON CONFLICT DO NOTHING;
      PERFORM public.sync_bundle_stock(bundle_id);
    END IF;
  END IF;

  -- Cross-selling (recommandations)
  SELECT id INTO oil10   FROM public.products WHERE slug = 'huile-10-full-spectrum' LIMIT 1;
  SELECT id INTO oil20   FROM public.products WHERE slug = 'huile-20-sommeil'       LIMIT 1;
  SELECT id INTO inf_det FROM public.products WHERE slug = 'infusion-detente'       LIMIT 1;
  SELECT id INTO inf_dig FROM public.products WHERE slug = 'infusion-digestion'     LIMIT 1;
  SELECT id INTO amnesia FROM public.products WHERE slug = 'amnesia-haze'           LIMIT 1;
  SELECT id INTO gelato  FROM public.products WHERE slug = 'gelato'                 LIMIT 1;
  SELECT id INTO afghan  FROM public.products WHERE slug = 'afghan'                 LIMIT 1;

  IF oil10 IS NOT NULL AND inf_det IS NOT NULL THEN INSERT INTO public.product_recommendations (product_id, recommended_id, sort_order) VALUES (oil10, inf_det, 0) ON CONFLICT DO NOTHING; END IF;
  IF oil10 IS NOT NULL AND inf_dig IS NOT NULL THEN INSERT INTO public.product_recommendations (product_id, recommended_id, sort_order) VALUES (oil10, inf_dig, 1) ON CONFLICT DO NOTHING; END IF;
  IF oil20 IS NOT NULL AND inf_det IS NOT NULL THEN INSERT INTO public.product_recommendations (product_id, recommended_id, sort_order) VALUES (oil20, inf_det, 0) ON CONFLICT DO NOTHING; END IF;
  IF amnesia IS NOT NULL AND gelato IS NOT NULL THEN INSERT INTO public.product_recommendations (product_id, recommended_id, sort_order) VALUES (amnesia, gelato, 0) ON CONFLICT DO NOTHING; END IF;
  IF amnesia IS NOT NULL AND afghan IS NOT NULL THEN INSERT INTO public.product_recommendations (product_id, recommended_id, sort_order) VALUES (amnesia, afghan, 1) ON CONFLICT DO NOTHING; END IF;

END $$;

-- ─── Store Settings ───────────────────────────────────────────────────────────

INSERT INTO public.store_settings (key, value) VALUES
  ('delivery_fee',            '5.90'),
  ('delivery_free_threshold', '50.00'),
  ('store_name',              '"Green IA CBD"'),
  ('store_address',           '"123 Rue de la Nature, 75000 Paris"'),
  ('store_phone',             '"01 23 45 67 89"'),
  ('store_hours',             '"Lun–Sam 10h00–19h30"'),
  ('banner_text',             '"🌿 Offre de bienvenue : -10% avec le code GREENIA !"'),
  ('banner_enabled',          'true')
ON CONFLICT (key) DO NOTHING;

-- ─── Codes Promo ──────────────────────────────────────────────────────────────

INSERT INTO public.promo_codes (code, description, discount_type, discount_value, min_order_value, max_uses, expires_at) VALUES
  ('WEEDKEND-20', 'Weekend spécial -20%',        'percent', 20, 30,  100,  now() + interval '30 days'),
  ('BIENVENUE10', 'Réduction de bienvenue 10%',  'percent', 10, 0,   NULL, NULL),
  ('CBD5EUR',     'Bon de réduction 5€',          'fixed',    5, 20,  50,   now() + interval '60 days')
ON CONFLICT (code) DO NOTHING;

-- ═══════════════════════════════════════════════════════════════════════════
-- FIN DU SCHÉMA
-- ═══════════════════════════════════════════════════════════════════════════
-- Tables créées (22) :
--   categories, products, profiles, addresses, orders, order_items,
--   stock_movements, store_settings, loyalty_transactions, subscriptions,
--   subscription_orders, reviews, bundle_items, product_recommendations,
--   product_images, promo_codes, wishlists, referrals,
--   user_ai_preferences, budtender_interactions, pos_reports
-- Extensions : vector (pgvector)
-- Fonctions RPC : get_product_recommendations, match_products,
--                 create_pos_customer, increment_promo_uses,
--                 generate_referral_code, sync_bundle_stock
-- ═══════════════════════════════════════════════════════════════════════════
