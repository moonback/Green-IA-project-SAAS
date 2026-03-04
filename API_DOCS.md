# 🔗 Référence API (Supabase / PostgREST) — Green IA SaaS

L'application interagit principalement via l'API générée par **Supabase**. Les requêtes sont authentifiées par la clé `anon_key` (client) ou le token JWT (utilisateur connecté).

---

## 🏛 Authentification

Les endpoints d'authentification sont gérés par Supabase Auth.

| Endpoint | Méthode | Description | Auth requis |
| :--- | :--- | :--- | :--- |
| `/auth/v1/signup` | POST | Création de compte utilisateur | ❌ |
| `/auth/v1/login` | POST | Connexion par email / mot de passe | ❌ |
| `/auth/v1/logout`| POST | Déconnexion de la session actuelle | ✅ |
| `/auth/v1/user`  | GET  | Informations de l'utilisateur actuel| ✅ |

---

## 📦 Produits & Catalogue

### Lister les produits
`GET /rest/v1/products`
Retourne la liste des produits paginée et filtrable.

- **Paramètres (Query)** :
  - `select` : Liste des colonnes (`*`)
  - `is_active` : `eq.true`
  - `price` : `lt.40`, `gt.20`
  - `order` : `price.asc`, `created_at.desc`
- **Réponse (200 OK)** : Un tableau JSON d'objets `product`.

### Recherche Sémantique (RPC)
`POST /rest/v1/rpc/match_products`
Recherche de produits via IA (embeddings).

- **Paramètres (Body)** :
  - `query_embedding` : `float[]` (vecteur 768 généré par Gemini)
  - `match_threshold` : `number` (ex: `0.75`)
  - `match_count` : `integer` (ex: `5`)
- **Exemple JSON** :
  ```json
  {
    "query_embedding": [0.012, -0.045, ...],
    "match_threshold": 0.5,
    "match_count": 4
  }
  ```

---

## 🛒 Commandes & Panier

### Créer une commande
`POST /rest/v1/orders`

- **Auth** : ✅ (JWT Utilisateur)
- **Corps de la requête (Body)** :
  ```json
  {
    "user_id": "uuid-xxx",
    "delivery_type": "click_collect",
    "subtotal": 45.90,
    "total": 45.90,
    "status": "pending"
  }
  ```

---

## 🤖 Budtender (Conseiller IA)

Le Budtender utilise directement l'API Google Gemini via le SDK client, mais les interactions sont enregistrées en base.

### Enregistrer une session de chat
`POST /rest/v1/budtender_interactions`

- **Paramètres (Body)** :
  - `interaction_type` : `'chat_session' | 'quiz_result'`
  - `quiz_answers` : `jsonb`
  - `recommended_products` : `uuid[]`
- **Exemple JSON** :
  ```json
  {
    "interaction_type": "quiz_result",
    "quiz_answers": { "goal": "relax", "intensity": "high" },
    "recommended_products": ["prod-uuid-1", "prod-uuid-2"]
  }
  ```

---

## 🏪 Boutique SaaS (Multi-Tenant)

### Enregistrer un shop
`POST /rest/v1/shops` (Table non explicite dans SQL mais gérée via profils et settings)

> ⚠️ À compléter : Le schéma exact pour l'enregistrement multi-tenant nécessite une confirmation sur la table `shops` ou l'utilisation de `store_settings`.

---

## 💳 Paiements (Caisse / POS)

### Générer un rapport POS
`POST /rest/v1/pos_reports`

- **Auth** : ✅ (Admin uniquement)
- **Champs** : `total_sales`, `cash_total`, `card_total`, `items_sold`.

---

## 🚨 Erreurs Communes

| Code | Message | Cause probable |
| :--- | :--- | :--- |
| `401 Unauthorized` | JWT Expired | Utilisateur non connecté ou session expirée. |
| `403 Forbidden` | RLS Violation | Tentative d'accès à des données ne vous appartenant pas. |
| `404 Not Found` | Route Invalide | L'endpoint ou la ressource n'existe pas. |
| `400 Bad Request` | Invalid Input | Type de données incorrect ou paramètres manquants. |
