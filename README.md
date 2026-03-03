# Green IA SaaS - Plateforme de Boutiques E-Commerce

**Green IA SaaS** est une plateforme multi-tenant permettant de déployer, gérer et personnaliser des boutiques e-commerce B2B/B2C avec un écosystème complet. De la gestion du catalogue à un "Budtender" piloté par l'IA, cette solution connecte les marchands à leurs clients finaux.

## 🚀 Fonctionnalités Principales (MVP)

- **Architecture Multi-tenant** : Une plateforme globale avec des sous-boutiques (`/:shopSlug`) accessibles indépendamment.
- **Vente & Catalogue** : Affichage des produits, gestion des catégories, des paniers et processus de commande (Checkout).
- **IA Conversationnelle (Budtender)** : Support client vocal ou texte en temps réel alimenté par Gemini AI.
- **Espaces Utilisateurs & Marchands** : Profils clients, historiques de commandes, gestion des adresses. Panel Admin pour les marchands et POS (Point of Sale).
- **Fidélisation & Parrainage** : Historique des points de fidélité et gestion des parrainages.
- **Personnalisation de Boutique (Thème)** : Les marchands peuvent modifier l'apparence de leur boutique, les couleurs et les composants via un espace d'administration dédié.

## 🛠️ Stack Technique

- **Frontend** : React 19, TypeScript, Vite, React Router v7
- **Styling** : Tailwind CSS v4, Lucide React (Icônes), Framer Motion (Animations)
- **Gestion d'État** : Zustand
- **Backend & Base de Données** : Supabase (PostgreSQL, Authentification, Storage, RLS)
- **Intelligence Artificielle** : Google Gemini API (`@google/genai`)
- **Paiement (sandbox)** : Viva Wallet

## 📋 Prérequis

- Node.js (v20 ou plus récent recommandé)
- Un compte Supabase (Bascule en PUG / Base de données hébergée)
- Un compte Google AI Studio (pour la clé API Gemini)

## ⚙️ Configuration & Installation

**1. Cloner le dépôt**
```bash
git clone https://github.com/votre-organisation/Green-IA-project---SAAS.git
cd Green-IA-project---SAAS
```

**2. Installer les dépendances**
```bash
npm install
```

**3. Configurer les variables d'environnement**
Créez un fichier `.env` à la racine de votre projet en copiant l'exemple :
```bash
cp .env.example .env
```
Remplissez le fichier `.env` :
- `GEMINI_API_KEY` et `VITE_GEMINI_API_KEY` : Clés API depuis Google AI Studio.
- `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY` : URL et Clé publique depuis votre projet Supabase.
- Clés de paiement (Viva Wallet, etc) au besoin.

**4. Configurer Supabase**
- Exécutez les scripts SQL fournis dans `/supabase` dans votre dashboard Supabase (le fichier principal étant généralement `schema_complet.sql`, accompagné des scripts de migrations comme `migration_saas_vX...`).

## 🖥️ Lancement du Projet

**Environnement de Développement :**
```bash
npm run dev
```
Ouvre un serveur local sur `http://localhost:3000`.

**Environnement de Production (Build) :**
```bash
npm run build
npm run preview
```

## 📁 Structure du Projet

```text
.
├── src/
│   ├── components/      # Composants UI réutilisables (Layouts, Boutons, Modales...)
│   ├── hooks/           # Custom React Hooks (useAuth, useCart...)
│   ├── lib/             # Services externes (Supabase Client, Utilities)
│   ├── pages/           # Vues principales de l'application (Globales & Sous-boutiques)
│   ├── store/           # Stores Zustand (Auth, Cart, Navigation...)
│   ├── App.tsx          # Configuration globale du routage (React Router)
│   └── main.tsx         # Point d'entrée de l'application
├── supabase/            # Scripts SQL, migrations, et politiques RLS de la BD
├── public/              # Fichiers statiques et assets graphiques
├── README.md            # Ce fichier
├── ARCHITECTURE.md      # Documentation de l'architecture logicielle
├── API_DOCS.md          # Documentation des interactions API
├── DB_SCHEMA.md         # Description de la base de données
└── .cursorrules         # Règles et contexte pour l'assistant IA
```

## 🤝 Bonnes pratiques de contribution

Consultez le fichier `CONTRIBUTING.md` pour des instructions détaillées sur la manière de contribuer, de créer des Pull Requests et le style de code (TypeScript strict, Tailwind).

Toute nouvelle fonctionnalité impliquant des changements en base de données doit être accompagnée du fichier `.sql` descriptif correspondant placé dans `/supabase/`.

## 📜 Licence

Distribué sous la licence MIT. Voir `LICENSE` pour plus d'informations.
