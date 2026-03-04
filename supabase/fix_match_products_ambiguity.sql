-- ─── FIX : Résolution de l'ambiguïté match_products ───
-- Cette migration supprime l'ancienne version de la fonction à 3 paramètres
-- pour ne laisser que la version 4 paramètres (SaaS) et éviter l'erreur PGRST203.

DROP FUNCTION IF EXISTS public.match_products(vector, float, int);

-- On s'assure que la version SaaS est bien présente et correcte
CREATE OR REPLACE FUNCTION public.match_products (
  query_embedding vector(768),
  match_threshold float,
  match_count     int,
  p_shop_id       uuid DEFAULT NULL
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
    AND (p_shop_id IS NULL OR p.shop_id = p_shop_id)
    AND 1 - (p.embedding <=> query_embedding) > match_threshold
  ORDER BY p.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
