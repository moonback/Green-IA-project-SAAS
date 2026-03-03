# 🗺️ ROADMAP

Roadmap orientée produit et architecture pour faire évoluer Green IA de l’état actuel (MVP SaaS) vers une version industrialisée.

---

## 1) État actuel (MVP)

✅ En place :
- Frontend multi-routes (global + shop slug).
- E-commerce complet (catalogue, panier, checkout, compte).
- Dashboard admin + POS.
- Fondations multi-tenant (`shops`, `shop_members`, `shop_id`).
- BudTender IA (chat/voix) + recherche vectorielle.
- Fidélité, parrainage, abonnements, avis.

---

## 2) Prochaine étape — V1 (court terme : 4 à 8 semaines)

## 2.1 Fiabilisation plateforme
- [ ] Stabiliser toutes les politiques RLS multi-tenant (audit complet).
- [ ] Formaliser les migrations (ordre unique + rollback).
- [ ] Ajouter monitoring erreurs front + SQL (Sentry/Logtail/etc.).

## 2.2 Qualité logicielle
- [ ] Ajouter tests unitaires sur stores/hooks critiques.
- [ ] Ajouter tests d’intégration checkout et admin (Playwright).
- [ ] CI stricte : typecheck + tests + lint markdown/docs.

## 2.3 Paiement et conformité
- [ ] Finaliser intégration paiement online (Viva ou Stripe).
- [ ] Gestion des statuts de paiement robustes (webhooks + retries).
- [ ] Durcir conformité RGPD (droit export/suppression compte).

## 2.4 Produit SaaS
- [ ] Onboarding guidé création boutique (wizard no-code).
- [ ] Templates de catalogue de démarrage par segment.
- [ ] Paramètres branding shop (logo, couleurs, domaine custom).

---

## 3) V1.5 (moyen terme : 2 à 4 mois)

## 3.1 IA monétisable
- [ ] Quotas IA par plan (`free/pro/enterprise`) avec blocage propre.
- [ ] Dashboard usage IA par boutique (messages, sessions, coût estimé).
- [ ] Fine-tuning prompts par persona/shop.

## 3.2 Capacités commerciales
- [ ] Coupons avancés (segments, périodes, exclusions, one-shot).
- [ ] Campagnes CRM (email/SMS) déclenchées par événements.
- [ ] Analytics business plus poussées (LTV, cohortes, rétention).

## 3.3 Ops multi-boutiques
- [ ] Super-admin global (pilotage de toutes les boutiques).
- [ ] Gestion rôles avancée (RBAC détaillé owner/admin/staff).
- [ ] Mécanisme support interne + impersonation sécurisée.

---

## 4) Vision long terme

- [ ] Multi-langue + multi-devise complète.
- [ ] White-label complet (domaine + branding + widgets embarquables).
- [ ] API publique documentée pour intégrateurs externes.
- [ ] Marketplace d’extensions (plugins IA / fidélité / marketing).

---

## 5) Priorisation recommandée

1. **Sécurité & stabilité** (RLS, paiements, CI).
2. **Onboarding SaaS** (time-to-value).
3. **Monétisation IA** (quotas/plan).
4. **Scalabilité produit** (super-admin, observabilité).

