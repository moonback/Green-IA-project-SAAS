# 🤝 Guide de Contribution — Green IA SaaS

Merci de l'intérêt que vous portez à Green IA ! Ce document vous aidera à démarrer votre contribution au projet.

---

## 🛠 Prérequis

Avant de soumettre une modification, assurez-vous d'avoir :
- **Node.js** v20+ installé.
- **npm** v10+ pour la gestion des paquets.
- Un accès à un projet **Supabase** (ou demandez un accès à l'instance de test).
- Une connaissance de base de **React**, **TypeScript** et **TailwindCSS**.

---

## 🔄 Workflow Git

Nous utilisons un workflow basé sur des **Feature Branches** :

1. **Forkez** le dépôt original.
2. Créez votre branche de fonctionnalité : `git checkout -b feature/ma-fonctionnalite`
3. Faites vos changements et testez-les localement.
4. Effectuez vos commits en suivant les [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) :
   - `feat: ajouter le support des cartes cadeaux`
   - `fix: corriger le bug de redirection après login`
   - `docs: mettre à jour la doc API`
   - `refactor: simplifier la logique du panier`
5. Poussez votre branche : `git push origin feature/ma-fonctionnalite`
6. Ouvrez une **Pull Request (PR)** détaillée.

---

## 📋 Standards de Code

- **TypeScript** : Typage strict obligatoire (`strict: true`). Évitez l'utilisation de `any`.
- **Composants** : Utilisez des composants fonctionnels avec des noms clairs (`MyComponent.tsx`).
- **Styling** : Utilisez exclusivement les classes utilitaires de **TailwindCSS 4**.
- **Linting** : Exécutez `npm run lint` avant de soumettre pour vérifier les types.
- **Documentation** : Si vous ajoutez une fonctionnalité, n'oubliez pas de mettre à jour la documentation correspondante (`API_DOCS.md`, `README.md`).

---

## 🧪 Tests

> [!NOTE]
> Nous n'avons pas encore de suite de tests automatisés (Jest/Cypress). 
> ⚠️ À compléter : Ajouter des tests unitaires et d'intégration dans la phase v1.

Pour l'instant, vérifiez manuellement :
1. Que le build passe : `npm run build`.
2. Que les routes principales fonctionnent.
3. Qu'aucune erreur console n'apparaît lors de vos changements.

---

## 🗳 Processus de Review

Toutes les PR seront revues par les mainteneurs principaux. Nous vérifions :
- La lisibilité et la maintenance du code.
- Le respect du design system (Premium Zen).
- L'impact sur les performances et la sécurité (RLS).

---

## 📜 Code de Conduite

Soyez respectueux, constructif et professionnel. Nous encourageons la diversité et l'entraide au sein de la communauté Green IA.

---

> [!TIP]
> Si vous avez un doute sur l'implémentation d'une fonctionnalité, n'hésitez pas à ouvrir une 'Issue' pour en discuter avant de développer.
