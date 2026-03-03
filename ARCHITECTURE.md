# 🏗️ Architecture du Système — Green IA SaaS

## 🌟 Introduction
Green IA SaaS est une architecture multi-tenant isolée. Contrairement à une application e-commerce classique, elle permet à plusieurs boutiques indépendantes (Tenants) de fonctionner sur une seule et même infrastructure frontend/backend tout en garantissant la sécurité et la personnalisation des données.

---

## 🧭 Architecture Frontend

### 1. Routage & Résolution de Shop
L'application utilise un système de routage basé sur les slugs :
- **Routes Globales** : `/connexion`, `/ouvrir-boutique` (Espace SaaS).
- **Routes Boutiques** : `/:shopSlug/...` (Espace spécifique à une boutique).

Un composant **`ShopResolver.tsx`** intercepte le `shopSlug` dans l'URL pour :
1. Charger les informations de la boutique (`shops`) depuis Supabase.
2. Initialiser le **`SettingsStore`** (couleurs, logo, fonctionnalités activées).
3. Rediriger vers une page 404 si la boutique n'existe pas.

### 2. Gestion de l'état (Zustand)
- **`useAuthStore`** : Session utilisateur globale. Gère le `current_shop_id` sur le profil de l'utilisateur pour l'isolation.
- **`useShopStore`** : État de la boutique actuelle, du catalogue et des membres de l'équipe (Staff).
- **`useCartStore`** : Panier persistant par utilisateur, prêt pour le scoping par boutique.

---

## ☁️ Backend & Base de Données (Supabase)

### 1. Isolation des Données (Multi-tenancy)
Chaque table métier (`products`, `orders`, `categories`, etc.) possède une colonne **`shop_id`**.
La sécurité est garantie par les **Supabase RLS Policies** :
```sql
CREATE POLICY "shop_isolation_policy" ON public.products
FOR ALL USING (shop_id = (SELECT current_shop_id FROM profiles WHERE id = auth.uid()));
```
*Note : Pour les visiteurs anonymes, la lecture est filtrée par le slug de la boutique active.*

### 2. Authentification Multi-niveau
- **Profil Global** : Un compte utilisateur (`auth.users`) peut être "inscrit" ou "lié" à une boutique spécifique via `current_shop_id`.
- **Système de Rôles** (`user_role`) :
    - `Owner` : Propriétaire du shop.
    - `Admin` : Gestionnaire complet.
    - `Staff` : Gestion des ventes et stocks uniquement.

---

## 🤖 Moteur IA (BudTender)

Le **BudTender IA** repose sur l'API **Gemini 2.0 Multimodal Live** de Google. 
- **Communication** : WebSockets bi-directionnels pour une latence minimale.
- **Contexte** : Avant chaque conversation, le système injecte un "System Instruction" contenant le catalogue spécifique de la boutique et la tonalité souhaitée par le marchand.
- **Tool Calling (Fonctions)** : L'IA peut déclencher des actions réelles sur le frontend via des webhooks locaux (ex: `add_to_cart`).

---

## 📊 Schéma des Flux

```mermaid
graph TD
    User((Visiteur)) --> URL[/:shopSlug]
    URL --> Resolver[ShopResolver]
    Resolver --> |Query| DB[(Supabase)]
    DB --> |Config| UI[Interface Boutique]
    
    UI <--> |WebSocket| Gemini[Gemini 2.0 IA]
    UI --> |Vente| POS[Interface POS]
    POS --> |Update Inventory| DB
    
    Admin((Marchand)) --> |Auth| AdminPanel[Dashboard Admin]
    AdminPanel --> |Manage| DB
```

---

## 🔐 Sécurité & Performances
- **RLS** : Isolation stricte au niveau de la rangée (Row-level).
- **Vite** : Optimisation des assets et Lazy Loading des pages pour un chargement instantané.
- **Zustand Middlewares** : Persistance du panier pour éviter la perte de données après rafraîchissement.
