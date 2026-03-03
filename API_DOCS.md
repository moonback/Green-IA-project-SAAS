# Documentation API (Client / Supabase)

L'application **Green IA SaaS** ne possède par de serveur backend monolithique. Le frontend consomme les données via l'API **PostgREST** de **Supabase** et les API tierces (Gemini, Viva Wallet).

## 🔒 1. Authentification (Supabase Auth)

L'API de gestion des utilisateurs passe par le client Supabase JavaScript : `supabase.auth`.

### `signUp(email, password, metadata)`
Inscription d'un nouvel utilisateur/marchand. Des flags (ex: `is_merchant: true`) et le nom de la boutique (`shop_slug`) peuvent être passés dans les metadata. Ces données modifient la Table `profiles` de PostgreSQL automatiquement.

### `signInWithPassword(email, password)`
Authentifie l'utilisateur, retourne une session et déclenche le refresh du store de l'utilisateur concerné.

### `signOut()`
Assure la déconnexion locale et invalide le jeton sur le backend.

### `resetPasswordForEmail(email)`
Génération d'un lien de réinitialisation sécurisé de type "magic link".

---

## 🗄️ 2. Base de Données (Endpoints PostgREST)

Supabase expose chaque table sous forme de route RESTFUL (`/rest/v1/[table]`).
Via le module JavaScript : `supabase.from('NOM_DE_TABLE')`.

### `profiles` (Utilisateurs et Marchands)
- **GET (Select)** : `supabase.from('profiles').select('*')` pour le fetch des informations de points de fidélité.
- **PATCH (Update)** : Permet aux marchands et clients d'éditer leurs informations de compte ou préférences.

### `shops` / `store_settings` (Multi-tenant)
- Permet de résoudre la configuration (`theme`, `colors`, `name`) liée à la boutique consultée (`/:shopSlug`).
- **Endpoint clés** : Récupérer le contenu par un slug ou l'ID associé à l'utilisateur courant (pour l'admin).

### `products` & `categories`
- **GET avec Filtres** : `supabase.from('products').select('*, categories(*)').eq('shop_id', id)` 
  Récupère les items du catalogue liés à une boutique spécifique. Supporte la pagination, recherche textuelle et filtrage par prix ou catégories de produit (ex: "Fleurs", "Résines", "Concentrés", etc).

### `orders` & `order_items`
- **POST (Insert)** : Action finale du Checkout. Nécessite l'insertion d'une nouvelle `order` puis de multiples `order_items`. 
- **GET (Historique)** : Filtrage sur `auth.uid()` pour les clients, et sur profil "Marchand" (ou ID boutique) pour le dashboard Admin & POS.

### `subscriptions` (Abonnements)
- Les requêtes permettant au client de consulter ou résilier ses commandes "récurrentes" et générer des cycles automatiques (planifié côté backend).

---

## 🤖 3. Budtender Intelligence Artificielle (Gemini API)

Le frontend utilise `@google/genai` pour communiquer avec l'API Gemini.

### `Google Gen AI API` (ex: `models/gemini-2.5-flash`)
- **Appel** : Service AI connecté nativement côté client.
- **Fonctions** : Fournir une assistance pour la navigation produit et émettre des recommandations (potentiellement multimodales - texte, voix). Le SDK initie les `sessions` websockets et les échanges asynchrones sans intermédiaire.
- **Sécurité** : La clé cliente nécessite un whitelisting du domaine (`APP_URL`) sous Google Cloud Console pour limiter les fuites en production.

---

## 💳 4. Paiement (Viva Wallet)

### Création d'un Ordre de Paiement (Smart Checkout)
L'intégration (en frontend ou Edge Function le cas échéant) demande la communication avec les serveurs Viva Wallet.
- **Endpoint Viva API** : POST `/api/orders`
- **Payload** : Montant (`amount`), Source (`sourceCode`), Détails clients.
- Devrait répondre avec un identifiant de session redirigeant l'utilisateur sur une URL sécurisée d'encaissement, ou affichant l'iFrame locale de Viva Wallet au moment du panier.
