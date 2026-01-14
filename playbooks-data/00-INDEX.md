# 📚 PLAYBOOKS MAILBOT - Index

> **Knowledge Base Service Client Alltricks**  
> **Version** : 1.0 | **Format** : IA-Ready (sans accès BDD)  
> **Mise à jour** : Décembre 2025

---

## ⚠️ Contexte d'utilisation

Ces playbooks sont conçus pour un agent IA **sans accès aux données externes** (Salesforce, BDD commandes, API transporteurs).

L'agent doit :

- ✅ Classifier l'intention du client
- ✅ Fournir une réponse informative basée sur la FAQ
- ✅ Rediriger vers les outils self-service (espace client)
- ✅ Escalader si nécessaire

L'agent ne peut PAS :

- ❌ Vérifier le statut d'une commande
- ❌ Accéder aux informations client
- ❌ Effectuer des actions (annulation, remboursement, etc.)

---

## 🗂️ Structure des Playbooks

| Fichier              | Thématique                           | Nb Playbooks |
| -------------------- | ------------------------------------ | ------------ |
| `01-LIVRAISON.md`    | Livraison                            | 6            |
| `02-RETOURS.md`      | Retours et Remboursements            | 7            |
| `03-COMMANDES.md`    | Commandes                            | 5            |
| `04-PAIEMENT.md`     | Paiement                             | 6            |
| `05-PROMO-AVOIRS.md` | Codes Promo, Avoirs, Chèques Cadeaux | 4            |
| `06-COMPTE.md`       | Compte Client                        | 4            |
| `07-PRODUITS.md`     | Produits, Conseils, Garantie         | 4            |

---

## 📋 Liste complète

### 1. LIVRAISON

| ID      | Titre                        | Priorité |
| ------- | ---------------------------- | -------- |
| PLB-001 | Suivi de commande            | P1       |
| PLB-002 | Colis indiqué livré non reçu | P1       |
| PLB-003 | Retard de livraison          | P2       |
| PLB-004 | Modes et délais de livraison | P3       |
| PLB-005 | Modification adresse         | P2       |
| PLB-006 | Indisponibilité réception    | P3       |

### 2. RETOURS ET REMBOURSEMENTS

| ID      | Titre                              | Priorité |
| ------- | ---------------------------------- | -------- |
| PLB-007 | Demande de retour standard         | P1       |
| PLB-008 | Retour vélo / volumineux           | P2       |
| PLB-009 | Suivi retour et avoir remboursable | P2       |
| PLB-010 | Échange de produit                 | P2       |
| PLB-011 | Délais de remboursement d'un avoir | P2       |
| PLB-012 | Remboursement Oney                 | P3       |
| PLB-013 | Frais de retour                    | P3       |

### 3. COMMANDES

| ID      | Titre                       | Priorité |
| ------- | --------------------------- | -------- |
| PLB-014 | Annulation de commande      | P1       |
| PLB-015 | Commande incomplète         | P1       |
| PLB-016 | Modification de commande    | P2       |
| PLB-017 | Facture                     | P3       |
| PLB-018 | Commande PayPal non visible | P3       |

### 4. PAIEMENT

| ID      | Titre                           | Priorité |
| ------- | ------------------------------- | -------- |
| PLB-019 | Paiement refusé                 | P1       |
| PLB-020 | Paiement en plusieurs fois Oney | P2       |
| PLB-021 | Commande en attente de paiement | P2       |
| PLB-022 | Débité mais commande annulée    | P1       |
| PLB-023 | Déconnexion pendant paiement    | P3       |
| PLB-024 | Modes de paiement disponibles   | P3       |

### 5. CODES PROMO, AVOIRS, CHÈQUES CADEAUX

| ID      | Titre                        | Priorité |
| ------- | ---------------------------- | -------- |
| PLB-025 | Code promo ne fonctionne pas | P2       |
| PLB-026 | Utilisation des avoirs       | P3       |
| PLB-027 | Chèques cadeaux              | P3       |
| PLB-028 | Cumul remises                | P3       |

### 6. COMPTE CLIENT

| ID      | Titre                 | Priorité |
| ------- | --------------------- | -------- |
| PLB-029 | Problème de connexion | P2       |
| PLB-030 | Mot de passe oublié   | P3       |
| PLB-031 | Suppression de compte | P3       |
| PLB-032 | Newsletter            | P4       |

### 7. PRODUITS ET CONSEILS

| ID      | Titre                 | Priorité |
| ------- | --------------------- | -------- |
| PLB-033 | Conseil taille        | P2       |
| PLB-034 | Compatibilité pièces  | P2       |
| PLB-035 | Disponibilité produit | P3       |
| PLB-036 | Garantie SAV          | P2       |

---

## 🏷️ Légende Priorités

| Niveau | Description                              | Action agent                           |
| ------ | ---------------------------------------- | -------------------------------------- |
| **P1** | Critique - Client potentiellement bloqué | Réponse immédiate + escalade si besoin |
| **P2** | Haute - Demande importante               | Réponse complète sous 4h               |
| **P3** | Moyenne - Information standard           | Réponse sous 24h                       |
| **P4** | Basse - Information simple               | Réponse sous 48h                       |

---

## 🔧 Structure type d'un Playbook

```markdown
# PLB-XXX - Titre

## 1. 🎯 Objectif

## 2. 🗂️ Métadonnées (ID, Catégorie, Tags, Priorité)

## 3. 🔎 Conditions de Déclenchement

## 4. 📋 Informations à Identifier dans l'email

## 5. 💬 Gabarits de Réponse

## 6. ⚠️ Règles et Points d'Attention

## 7. 🔗 Ressources et Liens
```
