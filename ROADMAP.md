# Roadmap - Green Moon SaaS

Cette feuille de route définit la direction et l'évolution globale de la plateforme E-Commerce **Green Moon SaaS**.

## 🚀 Étape Principale : MVP (Minimum Viable Product)
**Statut: En Développement**

L'objectif initial est d'établir la base technique pour le déploiement de multiples boutiques fonctionnelles de façon totalement isolée (Multi-tenant).
- [x] Déploiement du socle (React, TypeScript, Vite, Tailwind CSS v4).
- [x] Initialisation de la Base de données (Supabase) + gestion des rôles (RLS/Auth).
- [x] Thème personnalisable par les marchands (couleurs, logo).
- [x] Parcours Client basique (Authentification, Catalogue, Panier, et gestion des adresses).
- [ ] Connecteur complet de Paiement Viva Wallet.
- [x] Dashboard Administrateur (Boutique) et création de produits.
- [x] Interface IA 'Budtender' (POC avec Google Gemini).

---

## 🏗️ Version 1.0 (Lancement de la plateforme)
Une fois le MVP consolidé, la priorité est de stabiliser la création et la configuration d'une boutique fluide, et d'optimiser l'expérience utilisateur et marchand.

- [ ] **Onboarding Marchand Automatisé** : Interface de création de boutique SaaS avec guidage étape par étape (Step-by-step Wizard).
- [x] **Point of Sale (POS)** : Interface web rapide et conçue pour une utilisation en point de vente physique par le marchand.
- [ ] **Internationalisation (i18n)** : Prise en charge initiale FR / EN et multi-devises basiques.
- [x] **Système de Fidélité et Parrainage** : Mise en place des points, conversion en codes promotionnels et parrainage (invitations).
- [ ] **Emailing Transactionnel** : Intégration Brevo, Resend, ou SendGrid (via Edge Functions Supabase) pour l'envoi des confirmations de compte, de commandes.
- [ ] **Analyse et Reporting Basique** : Graphiques rudimentaires des ventes dans le Dashboard Admin (via Recharts).

---

## 📈 Évolution / V2 (Personnalisation Avancée et Fonctionnalités Pro)
Après le lancement, de nouvelles fonctionnalités Premium permettront d'attirer des E-commerçants exigeants.

- [ ] **Générateur de Pages (Drag & Drop)** : Amélioration du système de template de boutique au lieu des composants pré-listés, pour donner une structure 100% personnalisable au layout d'un marchand.
- [ ] **Ventes par Abonnements et "Bundles"** : Packs et récurrences complètes.
- [ ] **Synchronisation des Stocks multi-boutiques/dépôts**.
- [ ] **Intégration Transporteurs (B2C)** : Mondial Relay, Colissimo (via des agrégateurs d'API comme Sendcloud).
- [ ] **Budtender Avancé (RAG + Contexte visuel)** : Le conseiller virtuel aura connaissance du stock en direct, de toutes les caractéristiques d'un produit spécifique et pourra potentiellement "voir" un produit envoyé en photo.

---

## 🌟 Vision Long Terme (Marketplace & Écosystème Global)
L'intégration communautaire au travers de Green Moon.
- [ ] **Super App Mobile** (PWA ou React Native) commune à tous les vendeurs pour l'achat finalisé.
- [ ] **Partage des évaluations / avis inter-boutiques**.
- [ ] **Comptabilité intégrée**.
- [ ] **Extension API / Webhooks** : Mettre en place des Webhooks pour la connexion vers d'autres outils (Zapier, Notion, Shopify etc.).
