-- ====================================================================
-- Migration v10 : Shop Theme & Design Customization
-- Permet à chaque commerçant de personnaliser les couleurs et le design 
-- de sa boutique via le champ JSONB `settings` de la table `shops`.
-- ====================================================================

-- Aucune nouvelle colonne n'est requise car `shops.settings` est déjà JSONB.
-- On s'assure que les valeurs par défaut du thème sont documentées ici.

-- Structure attendue dans shops.settings pour le thème :
-- {
--   "theme": {
--     "primary_color": "#39ff14",       -- Couleur principale (hex)
--     "secondary_color": "#ffffff",     -- Couleur secondaire (hex)
--     "accent_color": "#a3e635",        -- Couleur d'accentuation (hex)
--     "background_color": "#09090b",    -- Couleur de fond (hex)
--     "text_color": "#f4f4f5",          -- Couleur du texte (hex)
--     "font_family": "Inter",           -- Police : Inter | Poppins | Montserrat | Playfair Display | Raleway | Nunito
--     "border_radius": "rounded",       -- Arrondi : sharp | rounded | pill
--     "button_style": "filled",         -- Style boutons : filled | outline | ghost
--     "nav_style": "dark",              -- Style navigation : dark | light | transparent | colored
--     "card_style": "glass",            -- Style cartes : glass | solid | minimal | bordered
--     "hero_style": "gradient",         -- Style hero : gradient | image | solid | overlay
--     "hero_image_url": null,           -- URL image de fond hero (optionnel)
--     "logo_position": "left",          -- Position logo : left | center
--     "show_banner": true,              -- Afficher la bannière promotionnelle
--     "banner_color": "#39ff14",        -- Couleur fond bannière
--     "banner_text_color": "#000000",   -- Couleur texte bannière
--     "dark_mode": true,                -- Mode sombre
--     "animations_enabled": true,       -- Animations activées
--     "preset": "custom"                -- Preset actif : custom | green | ocean | luxury | sunset | minimal
--   }
-- }

-- On s'assure que tous les shops ont une entrée theme dans settings
UPDATE shops 
SET settings = jsonb_set(
  COALESCE(settings, '{}'::jsonb),
  '{theme}',
  '{
    "primary_color": "#39ff14",
    "secondary_color": "#ffffff",
    "accent_color": "#a3e635",
    "background_color": "#09090b",
    "text_color": "#f4f4f5",
    "font_family": "Inter",
    "border_radius": "rounded",
    "button_style": "filled",
    "nav_style": "dark",
    "card_style": "glass",
    "hero_style": "gradient",
    "hero_image_url": null,
    "logo_position": "left",
    "show_banner": true,
    "banner_color": "#39ff14",
    "banner_text_color": "#000000",
    "dark_mode": true,
    "animations_enabled": true,
    "preset": "green"
  }'::jsonb,
  true
)
WHERE settings->>'theme' IS NULL;

-- Index GIN pour requêtes rapides sur le jsonb settings
CREATE INDEX IF NOT EXISTS idx_shops_settings_gin ON shops USING gin(settings);

-- Commentaire sur la colonne pour la documentation
COMMENT ON COLUMN shops.settings IS 
  'Configuration JSONB du shop incluant : livraison, IA, thème (couleurs, polices, styles visuels)';
