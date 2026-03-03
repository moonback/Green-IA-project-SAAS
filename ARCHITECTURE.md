# 🏗️ ARCHITECTURE

## 1) Vue d’ensemble

Green IA est une SPA React connectée directement à Supabase (PostgreSQL + Auth + RLS).  
Le modèle est **frontend riche + backend data-centric** : la logique critique métier est en SQL (fonctions RPC, triggers, RLS), le frontend orchestre les flux utilisateur.

```mermaid
flowchart LR
  U[Utilisateur Web] --> FE[Frontend React/Vite]
  FE --> SA[Supabase Auth]
  FE --> DB[(Supabase Postgres)]
  FE --> ST[Supabase Storage]
  FE --> RPC[RPC SQL]
  FE --> G[Gemini API
  (chat + voix + embeddings)]
  DB --> RLS[RLS Policies]
  DB --> TG[Triggers / Fonctions SQL]
```

---

## 2) Frontend

### 2.1 Organisation
- `src/App.tsx` : routing principal global + boutique (`/:shopSlug`).
- `src/pages/*` : pages métier (vitrine, checkout, compte, admin, POS).
- `src/components/*` : composants réutilisables et modules complexes (BudTender, admin tabs).
- `src/store/*` : stores Zustand (auth, shop, cart, wishlist, settings).
- `src/hooks/*` : hooks métier (voix Gemini live, mémoire IA, résolution contexte boutique).
- `src/lib/*` : client Supabase, types, prompts IA, embeddings, constantes.

### 2.2 Routage
- **Routes globales** : `/`, `/solution`, `/connexion`, etc.
- **Routes boutique** : `/:shopSlug/...` avec `ShopResolver`.
- **Routes protégées** : `ProtectedRoute` pour compte/commande.
- **Routes admin/POS** : `AdminRoute` pour `/:shopSlug/admin` et `/:shopSlug/pos`.

### 2.3 Gestion d’état
- `authStore` : session Supabase + profil utilisateur.
- `shopStore` : boutique courante (`currentShop`) résolue par slug.
- `cartStore`, `wishlistStore`, `settingsStore`, `toastStore` : état métier local.

---

## 3) Backend (Supabase)

### 3.1 Services utilisés
- **PostgreSQL** : source de vérité métier.
- **Auth** : email/password + session JWT côté client.
- **Storage** : bucket d’images produits (`product-images`).
- **RLS** : contrôle d’accès table par table.
- **RPC SQL** : logique métier serveur (stocks bundles, recommandations, POS, promo).

### 3.2 Stratégie multi-tenant
- Table `shops` + `shop_members` pour représenter les tenants et rôles.
- Colonnes `shop_id` ajoutées aux tables métier.
- Trigger SQL pour auto-assigner `shop_id` sur insert.
- Politiques RLS d’isolation par appartenance au shop.

---

## 4) Base de données et logique métier

### 4.1 Domaines métiers principaux
1. **Catalogue** : categories, products, product_images, bundle_items, product_recommendations.
2. **Commerce** : orders, order_items, addresses, promo_codes, stock_movements.
3. **Client** : profiles, wishlists, reviews, referrals, loyalty_transactions, subscriptions.
4. **IA / Analytics** : user_ai_preferences, budtender_interactions, ai_usage_logs, pos_reports.

### 4.2 Logique SQL critique
- `sync_bundle_stock(p_bundle_id)` : recalcul automatique stock bundle.
- `increment_promo_uses(code_text)` : incrément usage code promo.
- `match_products(...)` : recherche vectorielle par similarité embedding.
- `create_pos_customer(...)` : création client depuis POS (contrôle admin).

---

## 5) IA BudTender

### 5.1 Composants
- `src/components/BudTender.tsx` : UI conversationnelle principale.
- `src/hooks/useGeminiLiveVoice.ts` : gestion WebSocket Gemini Live (audio in/out).
- `src/lib/embeddings.ts` + `scripts/sync-embeddings.ts` : vectorisation produits.

### 5.2 Flux IA
1. L’utilisateur lance une session chat/voix.
2. Le frontend construit un prompt contextualisé (shop + préférences + catalogue).
3. La recherche peut utiliser `match_products` via embedding pour réponses pertinentes.
4. Interactions et consommation peuvent être journalisées en base.

---

## 6) Sécurité

- RLS activé sur tables sensibles.
- Auth JWT Supabase pour accès authentifié.
- Séparation visiteur/public vs utilisateur connecté vs admin.
- Contrainte importante : ne jamais contourner `shop_id` dans les nouvelles requêtes.

---

## 7) Déploiement et opérations

- Build frontend via Vite (`npm run build`).
- Déploiement cible via Vercel (`vercel.json`).
- Migrations SQL versionnées dans `supabase/`.
- Recommandation : pipeline CI avec checks TypeScript + tests de non-régression SQL.

