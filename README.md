# 🌿 Green IA SaaS — L'E-commerce CBD Augmenté

> **La puissance de l'IA au service des boutiques CBD.**  
> Green IA SaaS est une plateforme e-commerce multi-tenant premium qui permet de déployer et gérer des boutiques CBD intelligentes en quelques clics, avec un BudTender IA expert intégré.

---

## 🚀 Vision du Projet

Green IA n'est pas qu'un simple site de vente. C'est une infrastructure logicielle complète (SaaS) permettant à n'importe quel propriétaire de boutique CBD de :
1. **Personnaliser** son univers visuel.
2. **Indexer** son propre catalogue de produits.
3. **Déployer** une IA conversationnelle (Gemini 2.0) capable de conseiller ses clients 24/7.
4. **Piloter** ses ventes physiques via un Point de Vente (POS) intégré.

---

## 🛠️ Stack Technique

Une architecture moderne, rapide et scalable :

- **Frontend** : [React 19](https://react.dev/) + [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **State Management** : [Zustand](https://zustand-demo.pmnd.rs/) (Auth, Shop, Cart)
- **Styling** : [Tailwind CSS 4](https://tailwindcss.com/) + [Framer Motion](https://www.framer.com/motion/)
- **Backend-as-a-Service** : [Supabase](https://supabase.com/) (PostgreSQL, Realtime, Auth, RLS)
- **Intelligence Artificielle** : [Google Gemini AI](https://deepmind.google/technologies/gemini/) (Multimodal Live API)
- **Analytics** : [Recharts](https://recharts.org/)
- **Paiements** : Viva Wallet (Intégration prévue)

---

## ✨ Fonctionnalités Clés

### 🏗️ Architecture SaaS Multi-tenant
- **Multi-Boutiques** : Chaque boutique a son propre slug URL (ex: `/shop-demo`).
- **Isolation des Données** : Sécurisation via RLS (Row Level Security) — chaque boutique ne voit que ses propres produits, clients et commandes.
- **Branding Personnalisé** : Couleurs et logos adaptables dynamiquement via le `SettingsStore`.

### 🤖 BudTender IA (Expertise Digitale)
- **Conseils sur Mesure** : Recommandations basées sur les besoins clients (sommeil, anxiété, douleur).
- **Interface Vocale & Textuelle** : Communication fluide en temps réel.
- **IA Tool Calling** : L'IA peut ajouter directement des produits au panier de l'utilisateur.

### 💼 Espace Administration & POS
- **Gestion du Catalogue** : CRUD complet des produits, catégories et stocks.
- **Terminal de Vente (POS)** : Interface optimisée pour la vente directe en comptoir physique.
- **Rapports de Ventes** : Visualisation des performances par shop.

---

## ⚙️ Installation et Configuration

### 📋 Prérequis
- **Node.js** (v18+) & **npm**
- Un projet **Supabase** configuré
- Une clé API **Google AI Studio** (Gemini)

### 🚀 Démarrage Rapide

1. **Clonez le dépôt** :
   ```bash
   git clone https://github.com/votre-repo/green-moon-project.git
   cd green-moon-project
   ```

2. **Installez les dépendances** :
   ```bash
   npm install
   ```

3. **Configurez les variables d'environnement** (`.env`) :
   ```env
   VITE_SUPABASE_URL=votre_url_supabase
   VITE_SUPABASE_ANON_KEY=votre_cle_anonyme
   VITE_GEMINI_API_KEY=votre_cle_api_gemini
   ```

4. **Migrations Supabase** :
   Exécutez le script `/supabase/schema_complet.sql` puis `/supabase/migration_saas_v1_multi_tenant.sql` dans votre éditeur SQL Supabase.

5. **Lancez en mode développement** :
   ```bash
   npm run dev
   ```
   L'application est lancée sur `http://localhost:3000`.

---

## 📂 Structure du Projet

```text
├── src/
│   ├── components/      # Composants UI (atomic design)
│   │   ├── admin/       # Dashboard & POS
│   │   ├── budtender-ui/# Interface IA Conversationnelle
│   │   └── ui/          # Primitives (boutons, inputs)
│   ├── hooks/           # Logique réutilisable (IA, Auth)
│   ├── lib/             # Clients API, Types TS, Utilitaires
│   ├── pages/           # Vues principales / Routes
│   ├── store/           # Zustand Stores (Shop, Auth, Cart)
│   └── App.tsx          # Router (Global + Shop level)
├── supabase/            # Scripts SQL, RLS & Migrations
└── public/              # Ressources statiques
```

---

## 🤝 Contribution

Nous suivons les conventions **Conventional Commits**. Pour contribuer :
1. Créez une branche `feature/nom-de-la-feature`
2. Assurez-vous que le linting passe : `npm run lint`
3. Soumettez une Pull Request vers `main`.

---

## ⚖️ Licence

Ce projet est sous licence **MIT**.
