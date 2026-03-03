# 📡 API_DOCS

Le projet expose principalement une API de données via **Supabase PostgREST** + **RPC SQL**, consommée côté frontend avec `@supabase/supabase-js`.

---

## 1) Authentification

### 1.1 Supabase Auth (client-side)

| Action | Méthode SDK | Description |
|---|---|---|
| Connexion | `supabase.auth.signInWithPassword` | Login email/mot de passe |
| Inscription | `supabase.auth.signUp` | Création utilisateur + metadata |
| Session courante | `supabase.auth.getSession` | Récupère la session JWT |
| Listener auth | `supabase.auth.onAuthStateChange` | Synchro login/logout |
| Déconnexion | `supabase.auth.signOut` | Termine la session |
| Reset password | `supabase.auth.resetPasswordForEmail` | Flux de réinitialisation |

### 1.2 Headers HTTP (appel REST brut)

```http
apikey: <SUPABASE_ANON_KEY>
Authorization: Bearer <JWT>
```

---

## 2) Collections (tables) utilisées côté application

## 2.1 Public / catalogue
- `categories`
- `products`
- `product_images`
- `product_recommendations`
- `bundle_items`

## 2.2 Compte client
- `profiles`
- `addresses`
- `wishlists`
- `reviews`
- `referrals`
- `loyalty_transactions`
- `subscriptions`
- `subscription_orders`

## 2.3 Commande / caisse
- `orders`
- `order_items`
- `promo_codes`
- `stock_movements`
- `pos_reports`

## 2.4 IA / personnalisation
- `user_ai_preferences`
- `budtender_interactions`
- `ai_usage_logs`
- `store_settings`

## 2.5 Multi-tenant
- `shops`
- `shop_members`

---

## 3) Endpoints REST Supabase (forme HTTP)

> Format standard PostgREST (exemples indicatifs).

### 3.1 Produits
- `GET /rest/v1/products?select=*&is_active=eq.true`
- `GET /rest/v1/products?slug=eq.<slug>&select=*`
- `PATCH /rest/v1/products?id=eq.<id>` (admin)

### 3.2 Catégories
- `GET /rest/v1/categories?select=*&is_active=eq.true&order=sort_order`
- `POST /rest/v1/categories` (admin)

### 3.3 Commandes
- `POST /rest/v1/orders`
- `POST /rest/v1/order_items`
- `GET /rest/v1/orders?user_id=eq.<uid>&select=*,order_items(*)`
- `PATCH /rest/v1/orders?id=eq.<id>` (admin / process)

### 3.4 Profil et adresses
- `GET /rest/v1/profiles?id=eq.<uid>&select=*`
- `PATCH /rest/v1/profiles?id=eq.<uid>`
- `GET /rest/v1/addresses?user_id=eq.<uid>`
- `POST /rest/v1/addresses`

---

## 4) Fonctions RPC disponibles

| RPC | Paramètres | Retour | Usage |
|---|---|---|---|
| `match_products` | `query_embedding`, `match_threshold`, `match_count` | table products + `similarity` | Recherche vectorielle IA |
| `sync_bundle_stock` | `p_bundle_id` | void | Sync stock d’un bundle |
| `increment_promo_uses` | `code_text` | void | Incrémente usage code promo |
| `create_pos_customer` | `p_full_name`, `p_phone` | `uuid` utilisateur créé | Création client en caisse |
| `get_product_recommendations` | selon implémentation SQL | liste produits | Reco croisées/fallback |

---

## 5) Flux API clés

### 5.1 Checkout e-commerce
1. Lecture panier local + produits.
2. `INSERT orders`.
3. `INSERT order_items`.
4. Mises à jour stocks (`products`, `stock_movements`, `sync_bundle_stock`).
5. Fidélité (`profiles`, `loyalty_transactions`).
6. Promo (`increment_promo_uses`) si code actif.

### 5.2 BudTender IA
1. Message utilisateur.
2. Embedding de la requête (si recherche sémantique).
3. Appel RPC `match_products`.
4. Affichage recommandations et éventuel ajout panier.
5. Logging interaction (`budtender_interactions` / `ai_usage_logs`).

### 5.3 Onboarding boutique
1. Création shop (table `shops`).
2. Lien owner/membre (`shop_members`).
3. Affectation `current_shop_id` profil.
4. Accès routes via `/:shopSlug`.

### 5.4 Personnalisation Boutique
1. Administration charge `currentShop.settings`.
2. Édition locale via `AdminLayoutTab` ou `AdminThemeTab`.
3. `UPDATE shops SET settings = ... WHERE id = ...`.
4. Propagation immédiate via le store Zustand.

---

## 6) Règles de sécurité API

- Toujours filtrer par `shop_id` ou contexte du shop courant.
- Respecter RLS (ne pas supposer un accès global côté client).
- Réserver write admin (catalogue, reporting, paramétrages) aux profils autorisés.
- Ne pas exposer de secrets serveur en variables `VITE_*`.

