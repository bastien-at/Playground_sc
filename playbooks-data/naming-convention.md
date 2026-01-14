# 📛 NAMING CONVENTION - Playbooks Mailbot Alltricks

> **Objectif** : Assurer une nomenclature cohérente et prévisible pour tous les playbooks, facilitant la recherche, le tri et l'intégration technique.

---

## 1. Format de l'identifiant

### Structure

```
PLB-XXX
```

| Élément | Description | Exemple |
|---------|-------------|---------|
| `PLB` | Préfixe fixe (PlayBook) | PLB |
| `-` | Séparateur | - |
| `XXX` | Numéro séquentiel sur 3 chiffres | 001, 042, 127 |

### Exemples
- `PLB-001` → Premier playbook
- `PLB-042` → 42ème playbook
- `PLB-127` → 127ème playbook

---

## 2. Plages réservées par thématique

| Plage | Thématique | Fichier |
|-------|------------|---------|
| `PLB-001` à `PLB-049` | Livraison | 01-LIVRAISON.md |
| `PLB-050` à `PLB-099` | Retours & Remboursements | 02-RETOURS.md |
| `PLB-100` à `PLB-149` | Commandes | 03-COMMANDES.md |
| `PLB-150` à `PLB-199` | Paiement | 04-PAIEMENT.md |
| `PLB-200` à `PLB-249` | Promos, Avoirs, Chèques Cadeaux | 05-PROMO-AVOIRS.md |
| `PLB-250` à `PLB-299` | Compte Client | 06-COMPTE.md |
| `PLB-300` à `PLB-349` | Produits & Conseils | 07-PRODUITS.md |
| `PLB-350` à `PLB-399` | Magasins & Ateliers | 08-MAGASINS.md |
| `PLB-400` à `PLB-449` | Alltricks+ | 09-ALLTRICKS-PLUS.md |
| `PLB-450` à `PLB-499` | Marketplace / Vendeurs Partenaires | 10-MARKETPLACE.md |
| `PLB-900` à `PLB-999` | Cas spéciaux / Escalade | 99-ESCALADE.md |

> **Note** : Si une plage est épuisée, créer une nouvelle plage XXX-bis (ex: `PLB-050B-001`).

---

## 3. Nommage des fichiers

### Fichiers playbooks

```
XX-THEMATIQUE.md
```

| Élément | Description | Exemple |
|---------|-------------|---------|
| `XX` | Numéro d'ordre (2 chiffres) | 01, 02, 10 |
| `-` | Séparateur | - |
| `THEMATIQUE` | Nom en MAJUSCULES, sans accent, tirets pour espaces | LIVRAISON, PROMO-AVOIRS |
| `.md` | Extension Markdown | .md |

### Exemples
- `01-LIVRAISON.md`
- `02-RETOURS.md`
- `05-PROMO-AVOIRS.md`

### Fichiers documentation

```
nom-en-kebab-case.md
```

| Fichier | Contenu |
|---------|---------|
| `00-INDEX.md` | Index général des playbooks |
| `naming-convention.md` | Ce document |
| `writing-guidelines.md` | Guide de rédaction |
| `ia-usage-rules.md` | Règles d'usage de l'IA |
| `glossary.md` | Glossaire métier |

---

## 4. Nommage des tags (Tags Clés)

### Règles

| Règle | Exemple ✅ | Contre-exemple ❌ |
|-------|-----------|------------------|
| Minuscules uniquement | `retour`, `livraison` | `Retour`, `LIVRAISON` |
| Pas d'accent | `expedition` | `expédition` |
| Mots séparés par espaces | `code promo` | `code-promo`, `codepromo` |
| Singulier privilégié | `commande` | `commandes` |
| Termes client (pas jargon interne) | `colis perdu` | `litige transporteur` |

### Tags standardisés par thématique

**Livraison**
```
suivi, tracking, colis, livraison, expedition, transporteur, retard, point relais, domicile, adresse
```

**Retours**
```
retour, retourner, renvoyer, rembourser, avoir, echange, frais retour
```

**Commandes**
```
commande, annuler, annulation, modifier, facture, incomplet
```

**Paiement**
```
paiement, payer, CB, carte, paypal, oney, virement, cheque, refuse
```

**Promos/Avoirs**
```
code promo, reduction, avoir, cheque cadeau, cumul
```

**Compte**
```
compte, connexion, mot de passe, supprimer, newsletter
```

**Produits**
```
taille, compatible, disponible, stock, garantie, SAV
```

---

## 5. Nommage des catégories

### Format

```
[Temporalité] > [Domaine]
```

### Valeurs autorisées

**Temporalité**
| Valeur | Définition |
|--------|------------|
| `Avant-vente` | Avant la commande ou pendant le processus d'achat |
| `Après-vente` | Après la validation de la commande |

**Domaine**
| Valeur | Thématiques couvertes |
|--------|----------------------|
| `Livraison` | Suivi, modes, délais, adresse |
| `Litige Livraison` | Colis perdu, non reçu, retard grave |
| `Retours` | Procédure de retour, échange |
| `Remboursements` | Avoirs, délais de remboursement |
| `Commandes` | Annulation, modification, facture |
| `Paiement` | Modes, refus, incidents |
| `Promotions` | Codes promo, chèques cadeaux |
| `Avoirs` | Utilisation, remboursement avoirs |
| `Compte` | Connexion, mot de passe, suppression |
| `Produits` | Taille, compatibilité, disponibilité |
| `Garantie` | SAV, produit défectueux |

### Exemples
- `Avant-vente > Livraison`
- `Après-vente > Litige Livraison`
- `Après-vente > Retours`
- `Avant-vente > Paiement`

---

## 6. Priorités

### Format

```
P[1-4]
```

| Priorité | Niveau | SLA cible | Cas d'usage |
|----------|--------|-----------|-------------|
| `P1` | Critique | < 2h | Client bloqué, paiement, colis perdu |
| `P2` | Haute | < 4h | Retard, retour, problème connexion |
| `P3` | Moyenne | < 24h | Information, facture, modification |
| `P4` | Basse | < 48h | Newsletter, question générale |

---

## 7. Versioning des playbooks

### Quand versionner ?
- Modification majeure du workflow
- Changement de politique Alltricks
- Ajout/suppression de templates

### Format de version

```
v[MAJEUR].[MINEUR]
```

| Type | Quand incrémenter | Exemple |
|------|-------------------|---------|
| MAJEUR | Refonte complète, changement de logique | v1.0 → v2.0 |
| MINEUR | Ajout template, correction, mise à jour | v1.0 → v1.1 |

### Historique dans le fichier

```markdown
---
**Historique**
| Version | Date | Modification |
|---------|------|--------------|
| v1.0 | 2025-01 | Création initiale |
| v1.1 | 2025-03 | Ajout template Alltricks+ |
| v2.0 | 2025-06 | Refonte suite nouvelle politique retours |
---
```

---

## 8. Checklist création playbook

Avant de publier un nouveau playbook, vérifier :

- [ ] ID unique dans la plage thématique (`PLB-XXX`)
- [ ] Titre clair et explicite
- [ ] Catégorie au bon format (`Temporalité > Domaine`)
- [ ] Tags en minuscules, sans accent
- [ ] Priorité définie (P1 à P4)
- [ ] Au moins 1 template de réponse
- [ ] Distinction Alltricks / Vendeur partenaire si applicable
- [ ] Liens ressources fonctionnels
- [ ] Pas de référence à des données BDD (contexte IA sans accès)
