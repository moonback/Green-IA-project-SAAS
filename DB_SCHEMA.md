# 🗃️ DB_SCHEMA

Description fonctionnelle du schéma Supabase utilisé par Green IA SaaS.

> Source technique : `supabase/schema_complet.sql` + migrations SaaS incrémentales du dossier `supabase/`.

---

## 1) Vue globale

Le modèle est organisé en 6 domaines :
1. Catalogue
2. Commande & logistique
3. Compte client & fidélité
4. IA & personnalisation
5. POS & reporting
6. Multi-tenant SaaS

---

## 2) Tables principales

## 2.1 Catalogue

| Table | Rôle | Champs clés |
|---|---|---|
| `categories` | Catégories produits | `slug`, `name`, `sort_order`, `is_active`, `shop_id` |
| `products` | Produits vendus | `category_id`, `slug`, `price`, `stock_quantity`, `attributes`, `embedding`, `shop_id` |
| `product_images` | Galerie produit | `product_id`, `image_url`, `sort_order` |
| `bundle_items` | Composition bundles | `bundle_id`, `product_id`, `quantity` |
| `product_recommendations` | Recos manuelles | `product_id`, `recommended_id`, `sort_order` |

## 2.2 Commerce

| Table | Rôle | Champs clés |
|---|---|---|
| `orders` | Entête commande | `user_id`, `status`, `payment_status`, `total`, `delivery_type`, `shop_id` |
| `order_items` | Lignes commande | `order_id`, `product_id`, `quantity`, `unit_price`, `total_price` |
| `addresses` | Adresses client | `user_id`, `street`, `postal_code`, `is_default` |
| `stock_movements` | Journal de stock | `product_id`, `quantity_change`, `type`, `shop_id` |
| `promo_codes` | Promotions | `code`, `discount_type`, `discount_value`, `max_uses`, `uses_count`, `shop_id` |

## 2.3 Clients, fidélité, relationnel

| Table | Rôle | Champs clés |
|---|---|---|
| `profiles` | Extension `auth.users` | `full_name`, `is_admin`, `loyalty_points`, `referral_code`, `current_shop_id` |
| `wishlists` | Favoris utilisateur | `user_id`, `product_id` |
| `reviews` | Avis vérifiés | `product_id`, `user_id`, `order_id`, `rating`, `is_published`, `shop_id` |
| `loyalty_transactions` | Historique points | `user_id`, `type`, `points`, `balance_after`, `shop_id` |
| `referrals` | Parrainage | `referrer_id`, `referee_id`, `status`, `points_awarded` |
| `subscriptions` | Abonnements produit | `user_id`, `product_id`, `frequency`, `next_delivery_date`, `status`, `shop_id` |
| `subscription_orders` | Commandes liées abonnements | `subscription_id`, `order_id` |

## 2.4 IA & personnalisation

| Table | Rôle | Champs clés |
|---|---|---|
| `user_ai_preferences` | Préférences utilisateur IA | `goal`, `experience_level`, `extra_prefs` |
| `budtender_interactions` | Historique interactions IA | `interaction_type`, `quiz_answers`, `recommended_products`, `feedback` |
| `ai_usage_logs` | Suivi consommation IA | `shop_id`, `user_id`, `tokens`, `request_type`, `created_at` |
| `store_settings` | Configuration boutique/IA | `key`, `value`, `shop_id` |

## 2.5 POS

| Table | Rôle | Champs clés |
|---|---|---|
| `pos_reports` | Clôtures caisse / reporting | `date`, `total_sales`, `cash_total`, `card_total`, `shop_id` |

## 2.6 SaaS multi-tenant

| Table | Rôle | Champs clés |
|---|---|---|
| `shops` | Tenant boutique | `owner_id`, `name`, `slug`, `settings`, `subscription_plan` |
| `shop_members` | Membres et rôles | `shop_id`, `user_id`, `role` |

---

## 3) Relations clés

- `products.category_id → categories.id`
- `orders.user_id → profiles.id`
- `order_items.order_id → orders.id`
- `order_items.product_id → products.id`
- `reviews.order_id → orders.id`
- `subscriptions.product_id → products.id`
- `subscription_orders.subscription_id → subscriptions.id`
- `shop_members.shop_id → shops.id`
- Tables métier → `shop_id → shops.id` (isolation multi-tenant)

---

## 4) Fonctions SQL / RPC importantes

| Fonction | Rôle |
|---|---|
| `sync_bundle_stock(p_bundle_id)` | Recalcule automatiquement le stock bundle |
| `increment_promo_uses(code_text)` | Incrémente le compteur d’utilisation promo |
| `match_products(query_embedding, match_threshold, match_count)` | Recherche vectorielle produits |
| `create_pos_customer(p_full_name, p_phone)` | Crée un client depuis POS |
| `get_product_recommendations(...)` | Retourne recommandations/fallback produit |

---

## 5) RLS (Row Level Security)

- RLS est activé sur les tables métier sensibles.
- Lecture publique autorisée pour une partie du catalogue (produits/catégories).
- Écriture réservée aux profils autorisés (admin ou membre shop selon politiques).
- En contexte SaaS, les politiques doivent filtrer sur le shop de l’utilisateur connecté.

---

## 6) Indexation et performance

- Index vectoriel activé via extension `vector` pour les embeddings.
- Index dédiés (`sku`, JSONB prefs, etc.) présents sur champs critiques.
- Recommandation : ajouter des index composites sur `(shop_id, created_at)` pour reporting à grande échelle.

