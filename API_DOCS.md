# 📖 Documentation API — Green IA SaaS

L'accès aux données de Green IA SaaS se fait via le client Supabase (PostgREST) ou des procédures stockées (RPC).

---

## 🗄️ Endpoints Principaux (REST)

Toutes les requêtes REST sont automatiquement filtrées par le serveur (Supabase RLS) en fonction de l'utilisateur authentifié et de son `current_shop_id`.

### Produits (`/products`)
| Méthode | Description | Paramètres |
| :--- | :--- | :--- |
| `GET` | Liste des produits du shop actuel | `?is_active=eq.true` |
| `PATCH` | Mise à jour d'un produit (Admin seulement) | `id` |

### Commandes (`/orders`)
| Méthode | Description | Paramètres |
| :--- | :--- | :--- |
| `GET` | Historique des commandes de l'utilisateur | `?select=*,order_items(*)` |
| `POST` | Création d'une nouvelle commande | Body JSON |

---

## ⚡ Procédures Stockées (RPC)

Les RPC sont utilisées pour les logiques métier complexes exécutées côté serveur.

### `get_product_recommendations`
Récupère les produits similaires au sein de la même boutique.
- **Paramètres** : 
    - `p_product_id` (uuid)
    - `p_limit` (integer)
- **Logique** : Basée sur la catégorie et les vecteurs de similarité (si configurés).

### `sync_bundle_stock`
Recalcule automatiquement le stock d'un pack en fonction de la disponibilité de ses composants individuels.

---

## 🤖 BudTender IA Interface

L'IA communique via un flux JSON structuré. Elle a accès aux outils suivants (Tool Calling) :

### Outil : `add_to_cart`
Permet à l'IA d'ajouter un article pour le client.
- **Input** : `{ "product_id": "uuid", "quantity": number }`

### Outil : `search_products`
Recherche sémantique dans le catalogue.
- **Input** : `{ "query": "stress et sommeil" }`

---

## 🔐 Headers & Authentification

### Authentification JWT
L'Header `Authorization` est obligatoire pour les routes privées.
```bash
Authorization: Bearer <SUPABASE_USER_JWT>
apikey: <SUPABASE_ANON_KEY>
```

### Context Shop
Dans l'architecture SaaS, le `shop_id` n'a pas besoin d'être passé en paramètre d'URL pour les requêtes authentifiées, car il est récupéré sur le profil du `uid()` via le déclencheur `tr_set_shop_id`.
