# Document de Contribution (CONTRIBUTING.md)

Merci de l'intérêt que vous portez à l'évolution de la plateforme E-Commerce Saas **Green IA**.
Ce guide fournit les lignes directrices et "Best Practices" afin  de garantir que la base de code demeure lisible, de haute qualité, sécurisée et pérenne.

---

## 🏗️ Architecture et Philosophie Globale du Projet

Le projet E-Commerce SaaS Green IA adopte une architecture dite **Client Lourd React (Vite)** avec un Backend-as-a-Service (**Supabase**). Ce dernier gère l'authentification (Auth), le Rôle-Level-Security (RLS), la persistance PostgreSQL et le stockage (Storage). Le Routing s'effectue dynamiquement côté client avec `react-router-dom`, en isolant nativement les parties globales (Landing, Login Global, Comptes maîtres) des parties propres à une boutique donnée (préfixe URI `/:shopSlug`).

## 🧱 Normes de Code (Styleguide)

Afin d'assurer une cohérence absolue : 

1. **TypeScript Obligatoire** : 
   - Chaque Props d'un composant doit être typée formellement via une `interface` spécifique. Pas de `any` ; `unknown` si nécessaire.
   - Préférez un fichier `.ts` annexe pour mutualiser les Types récurrents.
2. **Framework et Routage** :
   - Exploitez React v19.
   - Les appels `Link`, `useNavigate`, ou les `loaders` se feront _toujours_ par le prisme de React Router v7.
3. **Styles (Tailwind CSS v4)** :
   - Évitez au possible les fichiers `.css` personnalisés en dehors des cas très spécifiques (Animations globales complexes).  Privilégiez la composition (Utility Classes) native dans l'attribut `className` des JSX.
   - Les designs "Green IA" privilégient le **Dark Mode natif (verre dépoli, thèmes sombre / Zinc)** et utilisent Lucide React pour les icônes.
4. **Zustand pour l'État Global** :
   - Évitez le "Prop Drilling". Pour stocker durablement des items (Panier, Session Auth, Préférences contextuelles de boutique), configurez un store sous `src/store`.
5. **Gestion de Cas d'Erreur** : 
   - Attrapez scrupuleusement les exceptions réseaux `try { ... } catch (err)` sans écraser le call stack et proposez une alerte/toast visuel explicite à l'utilisateur (rien dans la console).

## 🚀 Bonnes pratiques React / Frontend
- **Hooks Personnalisés** : Séparez la logique de rendu et de vue via l'extraction des comportements complexes dans `/hooks`.
- **Nommage** :
  - **Dossiers et Fichiers Communs** : Utilisez le `kebab-case` ou le `camelCase`.
  - **Fichiers React (Composants et Pages)** : Employez obligatoirement le `PascalCase.tsx` (ex: `ProductCard.tsx`).
  - **Variables JavaScript** : En `camelCase`. Constantes globales (ex: les rôles base de données) en `SCREAMING_SNAKE_CASE`.
- Divisez les gros composants UI en plus petits blocs réutilisables (Atomisation).

## 🗄️ Modifications Backend & Base de Données
Si une Pull Request requiert une modification de la base (Table, Fonction, Trigger ou Vue PostgreSQL) :
1. Créez **strictement** le script SQL explicite sous le dossier `/supabase/` (ex: `migration_saas_vX_description.sql`).
2. Ne confondez pas le Backend "Global" avec le "Store" (Garantir l'intégrité de RLS par *shop_id*).  Ne "bypass" jamais la Row Level Security.
3. Ne stockez jamais d'identifiants API ni de secrets côté client. Passez via `/supabase/edge-functions/` ou équivalent côté infra.

## 🤝 Workflow de la Pull Request
1. **Branching** : Créez une nouvelle branche depuis la branche `main` (ex: `feature/cart-update` ou `fix/login-bug`).
2. **Commit** : Adoptez des messages clairs et structurés (ex: `feat(cart): implement multi-shop persistence`).
3. **Tests et Intégration Continue (CI)** : Assurez-vous en local de l'absence d'erreurs TypeScript via `npm run lint`.
4. **Revue** : Demandez au mainteneur du projet (ou un autre collaborateur) la validation avant le "Squash and Merge".

## ❓ En cas de problème
Ouvrez une **Issue** GitHub décrivant précisément les étapes de reproduction, le navigateur et l'environnement concernés, avant de soumettre une PR si le comportement ou le contour fonctionnel attendu du bug n'est pas certain.
