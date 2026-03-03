# 🗃️ Schéma de Base de Données — Green IA SaaS (PostgreSQL)

## 🏛️ Tables d'Infrastructure SaaS

### `shops`
Gère les différents marchands (Tenants).
- `id` (uuid, PK)
- `owner_id` (uuid, FK) : L'utilisateur propriétaire.
- `name` (text), `slug` (text, unique)
- `settings` (jsonb) : Couleurs, thèmes, logos.
- `subscription_plan` (enum: free, pro, enterprise)

### `shop_members`
Définit qui a accès à quelle boutique et avec quel rôle.
- `id` (uuid)
- `shop_id` (uuid, FK)
- `user_id` (uuid, FK)
- `role` (enum: owner, admin, staff)

---

## 🛍️ Tables Métier (Scopées par `shop_id`)

### `products`
Catalogue de produits.
- `id` (uuid)
- **`shop_id`** (uuid, FK) : Isolation multi-tenant.
- `name`, `description`, `price`, `stock_quantity`.
- `embedding` (vector) : Pour la recherche sémantique par IA.

### `orders`
Ventes et transactions.
- `id` (uuid)
- **`shop_id`** (uuid, FK)
- `user_id` (uuid) : Client.
- `total`, `status`, `payment_status`.

### `profiles`
Données utilisateurs étendues.
- `id` (uuid, FK)
- `full_name`.
- **`current_shop_id`** (uuid, FK) : Shop actuellement consulté/géré par l'utilisateur.

---

## 🔗 Relations Principales
- **Shop → Products** (1:N) : Une boutique gère son propre catalogue.
- **User → ShopMembers → Shop** (N:N) : Un utilisateur peut appartenir à plusieurs boutiques avec des rôles différents.
- **Order → OrderItems → Products** (N:N) : Structure classique de panier d'achat.

---

## 🛡️ Sécurité & Automatisation
- **Trigger `tr_set_shop_id`** : Injecte automatiquement le `shop_id` correct lors d'une insertion en fonction du profil de l'utilisateur.
- **RLS (Row Level Security)** : Toutes les requêtes `SELECT`, `UPDATE` et `DELETE` sont filtrées par le moteur PostgreSQL pour que les données d'un shop ne fuitent jamais vers un autre.
