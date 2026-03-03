# Architecture et Schéma de la Base de Données

Ce document présente l'organisation de la base de données PostgreSQL (hébergée sur **Supabase**) pour la plateforme E-commerce Multi-tenant **Green IA**.

## 🏗️ Philosophie et Multi-tenant

Le modèle cible est un **logiciel en tant que service (SaaS)**. Chaque marchand/utilisateur pro possède une "boutique" isolée. Cette isolation technique n'est pas effectuée par la création d'une base de données par client, mais via un **Row Level Security (RLS)** systématique basé sur la notion de propriété (table `shops`, `owner_id`, et les clés étrangères associées) pour toutes les données sensibles.

---

## 👥 1. Utilisateurs, Marchands et Boutiques

### `auth.users` (Table système Supabase)
Gère l'authentification (email/mot de passe, sessions JWT). Les données applicatives n'y sont pas ajoutées.

### `public.profiles`
**Extension des utilisateurs (Clients et Marchands)**
- `id` (UUID, FK `auth.users.id`) 
- `full_name`, `phone`, `avatar_url` (Informations textuelles)
- `role` ('client', 'merchant', 'admin') : Détermine le niveau d'accessibilité.
- Points de fidélité et parrainage (`loyalty_points`).

### `public.shops` (Nouveau)
**Boutiques des marchands SaaS**
- `id` (UUID) 
- `slug` (Unique, utilisé dans l'URL `/:shopSlug`)
- `owner_id` (UUID, FK `profiles.id`)
- `name`, `logo_url`, `theme` (JSON pour le CSS Custom)
- `is_active` (Statut d'abonnement/visibilité du store SaaS).

### `public.store_settings`
Configuration globale du magasin.
- `key` (Clé textuelle)
- `value` (JSON, ex: configuration du thème complet).

---

## 🛒 2. Catalogue de Produits

Afin que le catalogue "Green IA" originel reste distinct, chaque marchand peut gérer son catalogue. Pour le multi-tenant, `products` est idéalement lié à un `shop_id`.

### `public.categories`
- `id`, `name`, `slug`
- Identifie les collections : "Fleurs", "Résines", "Concentrés", "Accessoires".

### `public.products`
La pièce centrale du E-commerce.
- `id` (UUID), `shop_id` (UUID, Optionnel si produit global SaaS, Obligatoire si produit marchand)
- `category_id` (FK `categories.id`)
- `name`, `slug`, `description` (Texte)
- `price`, `stock` (Numérique)
- `thc_level`, `cbd_level` (Données spécifiques)
- `image_url` (Stockée dans Supabase Storage)
- boolean flags: `is_featured`, `is_new`, `is_active`.

### Modèles annexes (Merchandising)
- `product_images` : Galerie d'images secondaires par produit.
- `bundle_items` : Relie des produits complémentaires (Pack).
- `product_recommendations` : IA ou suggestions manuelles par produit.

---

## 📦 3. Ventes et Commandes

### `public.orders`
Gère la validation du panier et le paiement.
- `id` (UUID), `shop_id` (UUID)
- `user_id` (FK `profiles.id`)
- Champs récapitulatifs : `total_amount`, `subtotal`, `shipping_cost`, `discount_amount`.
- Traçabilité : `status` ('pending', 'paid', 'shipped', 'cancelled', 'refunded').
- Informations de livraison : `shipping_address`, `contact_email`.
- Historique des "Points gagnés" / "Points utilisés".

### `public.order_items`
Lignes de commande associées à une `order`.
- `id`, `order_id` (FK `orders.id`)
- `product_id` (FK `products.id`)
- `quantity` (Int)
- `unit_price`, `total_price` (Numérique à l'instant T).

### `public.addresses`
Carnet d'adresses dé-normalisé (Utilisateurs finaux).
- `user_id` (FK `profiles.id`)
- `title`, `full_name`, `street`, `city`, `postal_code`, `country`, `is_default`.

---

## 🔁 4. Abonnements (Achats récurrents)

### `public.subscriptions`
- `id`, `user_id`
- `product_id`
- `interval` ('weekly', 'biweekly', 'monthly')
- `next_renewal_date`
- `status` ('active', 'paused', 'cancelled', 'payment_failed')

### `public.subscription_orders`
Table de jonction (Associe une "Génération d'Abonnement" au ticket de Caisse de la commande liée).
- `subscription_id`, `order_id`

---

## 💬 5. Engagement Client (Avis, Favoris, Fidelité)

- `public.reviews` : Notes (rating 1-5) et commentaires sur un produit post-commande. `is_verified` (bool).
- `public.wishlists` : Association (Produit / Utilisateur) pour la liste d'envie.
- `public.referrals` : Tableau de bord de Parrainage (Lien entre parrain, filleul, et état de la récompense).

---

## 🤖 6. Budtender AI

### `public.budtender_interactions`
Historise les chats entre l'IA `Gemini` et le client pour maintenir le contexte.
- `id`
- `user_id` (Ou session invité anonyme)
- `shop_id` (Contexte du catalogue marchand)
- `query`, `response` (Textes), `suggested_products` (JSON).
- `created_at`

---

## 🔒 Row Level Security (RLS) - Sécurité
1. **Accès Public** : Accès globalement gratuit "En Lecture" (`SELECT`) pour les `products`, `categories`, `reviews` vérifiées (Sous réserve de l'activité du Shop).
2. **Accès Utilisateur Authentifié (Clients)** :
   - `SELECT`, `UPDATE` de ses propres `profiles`.
   - `SELECT`, `INSERT` de ses propres `orders` (`WHERE user_id = auth.uid()`).
3. **Accès Marchand (Admin/POS)** :
   - Peut créer (`INSERT`), modifier (`UPDATE`), ou lire (`SELECT`) TOUT le catalogue là où `shop_id` correspond au sien.
   - Accès aux statistiques, POS, et configurations via un trigger de rôle ou via les Policies PostgreSQL (`store_settings`, vues agrégées des ventes).
