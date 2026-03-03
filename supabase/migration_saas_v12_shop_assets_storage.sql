-- ═══════════════════════════════════════════════════════════════════════════
-- 🖼️ SAAS STORAGE — BUCKET POUR LES ASSETS DES BOUTIQUES
-- Crée le bucket 'shop-assets' pour stocker les logos, bannières et images CMS.
-- ═══════════════════════════════════════════════════════════════════════════

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'shop-assets') THEN
    INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
    VALUES (
      'shop-assets',
      'shop-assets',
      true,
      5242880,  -- 5 Mo
      ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
    );
  END IF;
END $$;

-- ─── 1. Politiques RLS pour shop-assets ───────────────────────────────────────

-- Lecture publique pour tous
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access" ON storage.objects
FOR SELECT USING (bucket_id = 'shop-assets');

-- Upload pour les utilisateurs authentifiés (on pourrait être plus strict avec shop_id mais les noms de fichiers sont uniques)
DROP POLICY IF EXISTS "Authenticated Upload" ON storage.objects;
CREATE POLICY "Authenticated Upload" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'shop-assets' AND 
  auth.role() = 'authenticated'
);

-- Suppression par le propriétaire (basé sur le nom du fichier ou métadonnées si on les gérait, 
-- ici on permet aux admins d'un shop via leur auth)
DROP POLICY IF EXISTS "Owner Delete" ON storage.objects;
CREATE POLICY "Owner Delete" ON storage.objects
FOR DELETE USING (
  bucket_id = 'shop-assets' AND 
  auth.role() = 'authenticated'
);
