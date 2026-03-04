# 🌿 Green Moon SaaS — Plateforme Multi-Tenant E-commerce CBD

### Pitch
Green Moon est une solution SaaS premium "tout-en-un" conçue pour l'industrie du CBD. Elle permet aux commerçants de lancer leur boutique personnalisée en quelques minutes, intégrant une gestion de stock avancée, un programme de fidélité intelligent et un conseiller IA (Budtender) basé sur Gemini.

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Tech](https://img.shields.io/badge/stack-React%20%7C%20Supabase%20%7C%20Tailwind-blueviolet)

---

## 🛠 Stack Technique

| Technologie | Rôle | Version |
| :--- | :--- | :--- |
| **React** | Framework Frontend | 19.0 |
| **Vite** | Build Tool | 6.2 |
| **TypeScript** | Langage | 5.8 |
| **Supabase** | Backend-as-a-Service (DB, Auth, Storage) | 2.98 |
| **TailwindCSS** | Framework CSS (Utility-first) | 4.1 |
| **Zustand** | Gestion d'état global | 5.0 |
| **Framer Motion** | Animations & Transitions | 12.0 |
| **Google Gemini** | IA Budtender & Vector Search | 1.29 |
| **Viva Wallet** | Passerelle de Paiement | - |

---

## ✨ Fonctionnalités principales (MVP)

- 🏪 **Multi-Tenancy** : Hébergement de multiples boutiques indépendantes avec personnalisation dynamique (thèmes, layouts).
- 🤖 **Budtender IA** : Conseiller virtuel intelligent utilisant l'IA Gemini pour recommander des produits basés sur les besoins utilisateurs.
- 🔍 **Vector Search** : Recherche sémantique de produits via embeddings vectoriels (Gemini + pgvector).
- 💳 **Paiements Sécurisés** : Intégration complète avec Viva Wallet pour les transactions en ligne et POS.
- 🎁 **Fidélité & Parrainage** : Système de points de fidélité et codes de parrainage automatiques.
- 📦 **Gestion de Stock & POS** : Interface de vente physique (Point of Sale) avec rapports de clôture (Z-Report).
- 📅 **Abonnements** : Gestion des livraisons récurrentes (hebdomadaire, mensuelle).

---

## 🚀 Installation

### Prérequis
- **Node.js** : v20.x ou supérieur
- **npm** : v10.x ou supérieur
- **Compte Supabase** : Pour la base de données et l'authentification
- **Clé API Google Gemini** : Pour les fonctionnalités IA

### Étapes
1. **Cloner le projet**
   ```bash
   git clone https://github.com/votre-repo/green-moon-saas.git
   cd green-moon-saas
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer l'environnement**
   Copiez le fichier `.env.example` en `.env` et remplissez vos variables :
   ```bash
   cp .env.example .env
   ```

4. **Initialiser la base de données**
   Exécutez le script `supabase/schema_complet.sql` dans l'éditeur SQL de votre dashboard Supabase.

---

## ⚙️ Configuration

| Variable | Description | Exemple | Obligatoire |
| :--- | :--- | :--- | :--- |
| `VITE_SUPABASE_URL` | URL de votre projet Supabase | `https://xyz.supabase.co` | ✅ |
| `VITE_SUPABASE_ANON_KEY` | Clé anonyme Supabase | `eyJhbG...` | ✅ |
| `VITE_GEMINI_API_KEY` | Clé pour le conseiller IA | `AIzaSy...` | ✅ |
| `VITE_VIVA_WALLET_BASE_URL` | URL API Viva Wallet | `https://demo.vivapayments.com` | ✅ |
| `APP_URL` | URL de déploiement de l'app | `https://green-moon.io` | ✅ |

---

## ⚡ Lancement

### Développement
```bash
npm run dev
```
L'application sera accessible sur `http://localhost:3000`.

### Production
```bash
npm run build
npm run preview
```

---

## 📂 Structure du projet

```text
├── public/              # Assets statiques
├── src/
│   ├── components/      # Composants UI réutilisables
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Configurations services (Supabase, API)
│   ├── pages/           # Vues principales de l'application
│   ├── store/           # Gestion d'état Zustand
│   ├── types/           # Définitions TypeScript
│   └── utils/           # Fonctions utilitaires
├── supabase/            # Migrations et schéma SQL
└── vite.config.ts       # Configuration Vite
```

---

## 🤝 Contribuer
Veuillez lire [CONTRIBUTING.md](file:///c:/Users/Mayss/Documents/GitHub/Green-Moon-project%20-%20SAAS/CONTRIBUTING.md) pour les détails sur notre code de conduite et le processus de soumission des pull requests.

---

## 📄 Licence
Ce projet est sous licence **MIT**. Voir le fichier `LICENSE` pour plus de détails.
