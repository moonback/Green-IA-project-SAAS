# 🌿 Green IA SaaS

Plateforme **SaaS e-commerce CBD multi-boutiques** avec vitrine, tunnel d’achat, espace client, administration et terminal POS.  
Le projet s’appuie sur **React + Supabase** et intègre un **BudTender IA** (chat + voix temps réel via Gemini) pour accompagner les recommandations produit.

---

## 1) Stack technique

| Couche | Technologies |
|---|---|
| Frontend | React 19, TypeScript, Vite 6, React Router 7 |
| UI / Design | Tailwind CSS 4, Motion, Lucide React, Recharts |
| Data / Backend | Supabase (PostgreSQL, Auth, Storage, RPC SQL, RLS) |
| State management | Zustand |
| IA | Google Gemini (`@google/genai`), embeddings + Gemini Live Voice |
| Scripts techniques | TSX + script Node `scripts/sync-embeddings.ts` |
| Déploiement | Vercel (`vercel.json`) + build Vite |

---

## 2) Fonctionnalités principales (MVP)

### Expérience boutique
- Catalogue multi-catégories, pages produit, recommandations et bundles.
- Panier, checkout, confirmation de commande.
- Gestion compte client : profil, commandes, adresses, favoris, fidélité, parrainage, avis.

### Expérience SaaS multi-tenant
- Résolution d’une boutique par slug (`/:shopSlug`).
- Isolation des données par boutique (`shop_id`) via politiques RLS.
- Pages globales (marketing SaaS) et pages boutique coexistantes.

### Expérience admin / opérations
- Tableau de bord admin (stocks, commandes, analytics, avis, recommandations, abonnements, parrainage).
- POS (point de vente) avec clôtures (`pos_reports`).
- Paramétrage de la boutique et de l’IA (prompts/instructions).

### IA BudTender
- Recommandations conversationnelles.
- Recherche vectorielle produit (embeddings).
- Session vocale temps réel via WebSocket Gemini Live.
- Journalisation usage IA (`ai_usage_logs`, `budtender_interactions`).

---

## 3) Prérequis

- **Node.js 20+** (18 minimum)
- **npm** (inclus avec Node)
- **Compte Supabase** + projet actif
- **Supabase CLI** (recommandé pour migrations locales)
- **Clé API Gemini** (AI Studio)

Optionnel :
- Compte Vercel pour déploiement
- Environnement Viva Wallet pour paiements

---

## 4) Installation & configuration (pas à pas)

### 4.1 Cloner et installer

```bash
git clone <url-du-repo>
cd Green-IA-project-SAAS
npm install
```

### 4.2 Configurer l’environnement

```bash
cp .env.example .env
```

Renseigner au minimum :

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_GEMINI_API_KEY=
```

Voir la section [Variables d’environnement](#8-variables-denvironnement) pour la liste complète.

### 4.3 Initialiser la base de données

Deux approches possibles :

1. **Schéma consolidé (rapide)** : exécuter `supabase/schema_complet.sql` sur une base vierge.
2. **Migrations incrémentales (recommandé en équipe)** : appliquer les fichiers SQL du dossier `supabase/` dans l’ordre de version.

### 4.4 Vérifier le typage

```bash
npm run lint
```

---

## 5) Lancer le projet

### Développement

```bash
npm run dev
```

Serveur dev sur `http://localhost:3000`.

### Production (build local)

```bash
npm run build
npm run preview
```

---

## 6) Scripts utiles

```bash
npm run dev       # lance Vite en mode développement
npm run build     # build production
npm run preview   # preview du build
npm run lint      # type-check TypeScript
npm run clean     # supprime dist/
```

Script opérationnel :

```bash
npx tsx scripts/sync-embeddings.ts
```

Ce script calcule les embeddings manquants de `products.embedding` via Gemini.

---

## 7) Structure du projet

```text
.
├── public/                  # Assets statiques (images, service worker, audio worklet)
├── scripts/                 # Scripts techniques (sync embeddings)
├── src/
│   ├── components/          # UI partagée + modules admin + budtender
│   ├── hooks/               # Hooks métier (voix IA, mémoire, shop)
│   ├── lib/                 # Clients, types, prompts, constantes
│   ├── pages/               # Pages routes (globales + boutique + admin)
│   ├── store/               # Stores Zustand (auth, shop, panier, settings...)
│   ├── App.tsx              # Routing principal
│   └── main.tsx             # Bootstrap React
├── supabase/                # Schéma SQL + migrations + correctifs RLS
├── docs/                    # Documentation complémentaire
├── ARCHITECTURE.md
├── API_DOCS.md
├── DB_SCHEMA.md
├── ROADMAP.md
├── CONTRIBUTING.md
└── README.md
```

---

## 8) Variables d’environnement

| Variable | Requise | Description |
|---|---|---|
| `VITE_SUPABASE_URL` | ✅ | URL du projet Supabase |
| `VITE_SUPABASE_ANON_KEY` | ✅ | Clé anon publique Supabase |
| `VITE_GEMINI_API_KEY` | ✅ (IA) | Clé Gemini utilisée côté front (voix + embeddings) |
| `GEMINI_API_KEY` | ⚠️ contexte | Variable exposée dans la config Vite (compatibilité AI Studio) |
| `APP_URL` | ⚠️ | URL publique de l’app (callbacks / liens) |
| `VITE_VIVA_WALLET_BASE_URL` | optionnelle | Base URL Viva Wallet |
| `VITE_VIVA_CLIENT_ID` | optionnelle | Client ID Viva |
| `VITE_VIVA_CLIENT_SECRET` | optionnelle | Secret Viva (ne pas exposer côté client en prod) |
| `VIVA_MERCHANT_ID` | optionnelle | Merchant Viva |
| `VIVA_API_KEY` | optionnelle | API key Viva |

> ✅ Ne jamais commiter de `.env` réel. Utiliser uniquement `.env.example` comme template.

---

## 9) Documentation complémentaire

- [`ARCHITECTURE.md`](./ARCHITECTURE.md) : architecture technique détaillée.
- [`API_DOCS.md`](./API_DOCS.md) : endpoints, RPC, authentification.
- [`DB_SCHEMA.md`](./DB_SCHEMA.md) : tables, relations, politiques RLS.
- [`ROADMAP.md`](./ROADMAP.md) : plan MVP → V1 → vision.
- [`CONTRIBUTING.md`](./CONTRIBUTING.md) : règles de contribution.

---

## 10) Bonnes pratiques de contribution

1. Créer une branche dédiée (`feat/...`, `fix/...`, `docs/...`).
2. Garder les PR petites et atomiques.
3. Vérifier `npm run lint` avant commit.
4. Documenter tout changement de schéma Supabase dans `supabase/` + docs associées.
5. Respecter l’isolation multi-tenant (`shop_id`, RLS) dans toute nouvelle fonctionnalité.

---

## 11) Licence

Ce projet est distribué sous licence **MIT**. Voir [`LICENSE`](./LICENSE).
