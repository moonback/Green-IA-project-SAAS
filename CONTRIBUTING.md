# 🤝 CONTRIBUTING

Merci pour votre contribution à Green IA SaaS.

---

## 1) Principes généraux

- Faire des changements **petits, lisibles, testables**.
- Préserver la **sécurité multi-tenant** (ne jamais casser l’isolation `shop_id` + RLS).
- Documenter toute évolution structurante (API, DB, architecture).

---

## 2) Setup local

```bash
npm install
cp .env.example .env
npm run dev
```

Vérification minimale avant PR :

```bash
npm run lint
npm run build
```

---

## 3) Workflow Git recommandé

1. Créer une branche :
   - `feat/<sujet>`
   - `fix/<sujet>`
   - `docs/<sujet>`
2. Commits atomiques et explicites.
3. Ouvrir une PR avec :
   - contexte/problème,
   - solution,
   - impacts DB/API,
   - plan de test.

### Convention de commit (Conventional Commits)
- `feat:` nouvelle fonctionnalité
- `fix:` correction bug
- `docs:` documentation
- `refactor:` refonte sans changement fonctionnel
- `chore:` maintenance

---

## 4) Standards de code

### Frontend
- TypeScript strict (éviter `any`).
- Composants fonctionnels + hooks.
- Préférer les stores Zustand existants au state dupliqué.
- Garder la logique métier lourde hors composants UI quand possible.

### Supabase / SQL
- Toute modif DB doit être ajoutée dans `supabase/` (migration dédiée).
- Documenter les nouvelles tables/champs/RPC dans `DB_SCHEMA.md` et `API_DOCS.md`.
- Vérifier les politiques RLS associées à chaque nouvelle table.

### UX/UI
- Respecter la cohérence visuelle (Tailwind existant).
- Vérifier responsive desktop/mobile.
- Garder l’accessibilité de base (labels, contraste, focus).

---

## 5) Checklist PR

- [ ] Code compilable (`npm run lint`)
- [ ] Build OK (`npm run build`)
- [ ] Pas de secrets ajoutés
- [ ] Docs mises à jour si besoin
- [ ] Migrations SQL testées sur environnement de dev
- [ ] Impacts multi-tenant vérifiés

---

## 6) Bonnes pratiques sécurité

- Ne pas exposer de secret serveur dans des variables `VITE_*`.
- Ne pas faire confiance au frontend pour l’autorisation (s’appuyer sur RLS/RPC).
- Éviter les requêtes globales sans contrainte de shop dans les vues privées.

