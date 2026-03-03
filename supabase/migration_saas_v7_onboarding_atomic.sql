-- ═══════════════════════════════════════════════════════════════════════════
-- 🚀 SAAS ONBOARDING ATOMIC — PHASE 1.2 : TRIGGER DE CRÉATION DE BOUTIQUE
-- Permet la création atomique Shop + Membre + Profile lors du SignUp.
-- Résout les erreurs RLS (401/403) car exécuté avec SECURITY DEFINER.
-- ═══════════════════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  v_shop_id uuid;
  v_is_shop_reg boolean;
BEGIN
  -- Récupération du flag d'inscription shop
  v_is_shop_reg := (new.raw_user_meta_data->>'is_shop_registration')::boolean IS TRUE;

  -- 1. Création du Profil (Admin si c'est une création de shop)
  INSERT INTO public.profiles (id, full_name, is_admin)
  VALUES (
    new.id, 
    new.raw_user_meta_data->>'full_name',
    v_is_shop_reg
  );

  -- 2. Création de la Boutique si demandé
  IF v_is_shop_reg THEN
    INSERT INTO public.shops (
        owner_id, 
        name, 
        slug, 
        subscription_plan,
        settings
    )
    VALUES (
      new.id, 
      COALESCE(new.raw_user_meta_data->>'shop_name', 'Ma Boutique CBD'), 
      COALESCE(new.raw_user_meta_data->>'shop_slug', 'shop-' || lower(substring(new.id::text, 1, 8))), 
      COALESCE(new.raw_user_meta_data->>'shop_plan', 'free'),
      jsonb_build_object(
        'primary_color', '#10b981',
        'ai_enabled', true,
        'ai_tone', 'expert'
      )
    )
    RETURNING id INTO v_shop_id;

    -- 3. Ajout du gérant comme membre 'owner'
    INSERT INTO public.shop_members (shop_id, user_id, role)
    VALUES (v_shop_id, new.id, 'owner');

    -- 4. Liaison du profil avec le shop actuel
    UPDATE public.profiles 
    SET current_shop_id = v_shop_id 
    WHERE id = new.id;
  END IF;

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Ré-application du trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

COMMENT ON FUNCTION public.handle_new_user() IS 'Gère la création atomique du profil et du shop lors du signup Supabase Auth.';
