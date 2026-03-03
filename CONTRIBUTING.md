# 🤝 Guide de Contribution — Green IA SaaS

Bienvenue ! Green IA SaaS est un projet ambitieux et nous apprécions votre aide.

---

## 🏗️ Standards de Développement

### 1. Conventions de Nommage
- **Variables & Fonctions** : `camelCase`.
- **Composants React** : `PascalCase`.
- **Fichiers** : `PascalCase.tsx` pour les composants, `camelCase.ts` pour la logique.

### 2. Style de Code
- Nous utilisons **Tailwind CSS**. Évitez d'ajouter des fichiers `.css` sauf cas de force majeure.
- Chaque composant doit être documenté avec une petite description en haut du fichier.
- Utilisez **TypeScript** de manière stricte. Évitez le type `any`.

### 3. Workflow Git
- Ne travaillez jamais directement sur `main`.
- `develop` : Branche pour les tests d'intégration.
- `feature/...` : Vos nouvelles fonctionnalités.
- `fix/...` : Vos corrections de bugs.

### 4. Commits
Respectez la norme **Conventional Commits** :
- `feat(cart): add removal animation`
- `fix(auth): redirect loop on login`
- `docs(readme): update installation steps`

---

## 🚀 Comment Proposer une Modification ?

1. **Forkez** le projet.
2. **Créez** votre branche.
3. **Committez** vos changements de manière atomique.
4. **Ouvrez** une PR (Pull Request) en expliquant :
    - Quel est le problème résolu ?
    - Comment avez-vous testé vos changements ?
    - Y a-t-il des changements dans la base de données ?

---

## 🧪 Tests
Assurez-vous que l'application compile sans erreurs avant de soumettre une PR :
```bash
npm run build
npm run lint
```
