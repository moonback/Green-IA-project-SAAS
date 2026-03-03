# 🧭 Guide d'Implémentation SaaS — Green IA

Ce document détaille les étapes techniques nécessaires pour transformer Green IA d'une application unique en une plateforme SaaS Multi-tenant.

## 🛠 Stack Technique Cible
- **Frontend** : React 19 + Vite + Tailwind CSS
- **Backend** : Supabase (PostgreSQL + Auth + Storage)
- **IA** : Gemini 2.0 (Multimodal Live API)
- **Paiement** : Stripe Connect / Billing
- **État** : Zustand

---

## 🏗 PHASE 1 : Architecture Multi-tenant (Fondation)
**Objectif** : Isoler les données pour que chaque boutique ne voie que ses propres ressources.

### 1.1 Schéma de Base de Données
```sql
-- 1. Table des Boutiques (Tenants)
CREATE TABLE IF NOT EXISTS shops (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID REFERENCES auth.users(id) NOT NULL,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    logo_url TEXT,
    settings JSONB DEFAULT '{
        "primary_color": "#10b981",
        "currency": "EUR",
        "ai_enabled": true
    }',
    subscription_plan TEXT DEFAULT 'free',
    subscription_status TEXT DEFAULT 'trialing',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Mise à jour des tables métier (Ajout de shop_id)
ALTER TABLE products ADD COLUMN IF NOT EXISTS shop_id UUID REFERENCES shops(id) ON DELETE CASCADE;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS shop_id UUID REFERENCES shops(id) ON DELETE CASCADE;
ALTER TABLE categories ADD COLUMN IF NOT EXISTS shop_id UUID REFERENCES shops(id) ON DELETE CASCADE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS current_shop_id UUID REFERENCES shops(id);
```

### 1.2 Isolation de Sécurité (RLS)
Chaque requête vers Supabase doit être filtrée par `shop_id`.
```sql
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Shop Isolation: Products" ON products
FOR ALL USING (
    shop_id IN (
        SELECT shop_id FROM shop_members WHERE user_id = auth.uid()
    )
);
```

---

## 🔐 PHASE 2 : Gestion des Rôles & Équipes
Un utilisateur peut posséder plusieurs boutiques ou être staff dans une boutique tierce.

```sql
CREATE TYPE user_role AS ENUM ('owner', 'admin', 'staff');

CREATE TABLE shop_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    shop_id UUID REFERENCES shops(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role user_role DEFAULT 'staff',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(shop_id, user_id)
);
```

---

## 💎 PHASE 3 : Feature Flags & Plans
Utilisez les colonnes `subscription_plan` pour brider les fonctionnalités au niveau du frontend.

```typescript
// logic/permissions.ts
export const PLANS = {
  FREE: { maxProducts: 20, aiFeatures: false, pos: false },
  PRO: { maxProducts: 500, aiFeatures: true, pos: true },
  ENTERPRISE: { maxProducts: Infinity, aiFeatures: true, pos: true }
};

export const canAddProduct = (shop: any) => {
  const limit = PLANS[shop.subscription_plan].maxProducts;
  return shop.product_count < limit;
};
```

---

## 🚀 PHASE 4 : BudTender IA (Produit Phare Premium)
Transformez l'IA en moteur de vente personnalisé pour chaque boutique.

1. **Context Mapping** : Lors de l'initialisation du BudTender, envoyez le `shop_id`.
2. **System Prompt Dynamique** : 
   - "Tu es le BudTender de {shop.name}."
   - "Voici les produits disponibles actuellement : {shop.products_list}."
3. **Quotas IA** : Table de log pour limiter les messages selon le plan.

---

## 💳 PHASE 5 & 6 : Onboarding & Monétisation
### Workflow d'Onboarding (10 min)
1. **Signup** via Supabase Auth.
2. **Create Shop** : Nom et sous-domaine/slug.
3. **Template Selection** : Pré-remplissage avec un catalogue CBD type (Fleurs, Huiles).
4. **Stripe Setup** : Liaison pour les paiements récurrents.

---

## 📈 PHASE 7 : Dashboard Global
### Pour le Marchand
- Volume de ventes via IA.
- Taux de conversion.
- État des stocks par boutique.

### Pour l'Admin (Green IA)
- MRR (Monthly Recurring Revenue).
- Nombre de shops actifs.
- Usage global des crédits Gemini (Coûts vs Revenus).

---

## ✅ Prochaines Étapes Immédiates
1. **Migration SQL** : Appliquez les modifications multi-tenant à votre base Supabase.
2. **Mise à jour du Client Supabase** : Injectez le `shop_id` dans toutes les requêtes frontend.
3. **Test d'Isolation** : Créez deux boutiques et vérifiez qu'aucune donnée ne "fuit" de l'une vers l'autre.
