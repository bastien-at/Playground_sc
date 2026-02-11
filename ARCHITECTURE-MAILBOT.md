# 🤖 Architecture du Mailbot Alltricks

> **Documentation technique complète**  
> **Version** : 1.0  
> **Dernière mise à jour** : Janvier 2026

---

## 📋 Table des matières

1. [Vue d'ensemble](#vue-densemble)
2. [Architecture technique](#architecture-technique)
3. [Workflow n8n](#workflow-n8n)
4. [Système de prompts](#système-de-prompts)
5. [Playbooks](#playbooks)
6. [Flux de traitement](#flux-de-traitement)
7. [Règles et contraintes](#règles-et-contraintes)
8. [Exemples concrets](#exemples-concrets)

---

## 🎯 Vue d'ensemble

### Mission

Le Mailbot Alltricks est un système d'assistance automatisée par IA conçu pour traiter les emails du Service Client. Il analyse, classifie et répond aux demandes clients en s'appuyant sur une base de connaissances structurée (playbooks).

### Principe fondamental

```
EMAIL CLIENT → CLASSIFICATION → GÉNÉRATION RÉPONSE → ÉVALUATION QUALITÉ → DÉCISION
```

Le système fonctionne en **3 agents IA spécialisés** :

| Agent                    | Rôle                                     | Prompt              |
| ------------------------ | ---------------------------------------- | ------------------- |
| **Agent Classification** | Identifier catégorie et priorité         | `classification.md` |
| **Agent Réponse**        | Générer la réponse client                | `Agent_reponse.md`  |
| **Agent Judge**          | Évaluer la qualité et décider de l'envoi | `Agent_judge.md`    |

### Capacités et limites

#### ✅ Ce que le mailbot PEUT faire

- Classifier automatiquement les demandes clients
- Fournir des réponses basées sur les procédures officielles
- Guider vers les outils self-service (Espace client)
- Expliquer les délais et conditions standards
- Rassurer avec des informations générales

#### ❌ Ce que le mailbot NE PEUT PAS faire

- Accéder aux données Salesforce ou BDD commandes
- Vérifier le statut réel d'une commande
- Effectuer des actions (annulation, remboursement)
- Promettre des délais précis
- Offrir des gestes commerciaux

---

## 🏗️ Architecture technique

### Stack technologique

```
┌─────────────────────────────────────────────────────────┐
│                    INTERFACE WEB                         │
│              Next.js 15 (App Router)                     │
│         TypeScript + Tailwind CSS + shadcn/ui            │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                   API ROUTE NEXT.JS                      │
│              /api/execute-workflow                       │
│         • Validation Zod                                 │
│         • Rate limiting (10 req/min)                     │
│         • Timeout 30s + retry                            │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                  WORKFLOW N8N                            │
│         • Webhook entrant                                │
│         • Orchestration des agents IA                    │
│         • Gestion des erreurs                            │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│              AGENTS IA (Google Gemini)                   │
│         • Classification                                 │
│         • Génération réponse                             │
│         • Évaluation qualité                             │
└─────────────────────────────────────────────────────────┘
```

### Composants principaux

#### 1. Interface Next.js (`app/`)

**Fichiers clés :**

- `app/page.tsx` : Dashboard principal avec formulaire de test
- `app/api/execute-workflow/route.ts` : API Route pour appeler n8n
- `lib/n8n-client.ts` : Client HTTP pour communiquer avec n8n
- `lib/types.ts` : Types TypeScript

**Fonctionnalités :**

- Formulaire de test avec prénom, nom, message
- Affichage des résultats en temps réel
- Historique des 10 dernières exécutions
- Rate limiting : 10 requêtes/minute/IP

#### 2. API Route (`/api/execute-workflow`)

**Validation des données :**

```typescript
{
  input: {
    firstname: string (1-200 chars),
    lastname: string (1-200 chars),
    message: string (1-10000 chars)
  }
}
```

**Sécurité :**

- Validation Zod côté serveur
- Sanitization des inputs
- Rate limiting en mémoire
- Support Basic Auth + API Key pour n8n

**Gestion des erreurs :**

- Timeout 30s
- Retry automatique 1 fois sur erreur 5xx
- Logs détaillés

#### 3. Client n8n (`lib/n8n-client.ts`)

**Configuration via variables d'environnement :**

```bash
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/...
N8N_API_KEY=optional_api_key
N8N_BASIC_AUTH_USER=optional_user
N8N_BASIC_AUTH_PASSWORD=optional_password
```

**Fonctionnalités :**

- Appel HTTP POST vers webhook n8n
- Headers d'authentification automatiques
- Gestion timeout avec AbortController
- Retry logic sur erreurs 5xx

---

## 🔄 Workflow n8n

### Vue d'ensemble

Le workflow n8n orchestre les 3 agents IA en séquence :

```
WEBHOOK → AGENT CLASSIFICATION → AGENT RÉPONSE → AGENT JUDGE → SORTIE
```

### Étapes détaillées

#### Étape 1 : Réception webhook

**Input :**

```json
{
  "firstname": "Jean",
  "lastname": "Dupont",
  "message": "Je n'ai pas reçu ma commande..."
}
```

#### Étape 2 : Agent Classification

**Prompt utilisé :** `prompts-data/classification.md`

**Mission :**

- Identifier la catégorie principale (7 catégories)
- Identifier la sous-catégorie
- Définir la priorité (HAUTE/MOYENNE/BASSE)
- Recommander l'action

**Output :**

```json
{
  "categorie": "MES COMMANDES ET RETOURS",
  "sous_categorie": "Suivi livraison",
  "priorite": "HAUTE",
  "action_recommandee": "Vérifier statut commande"
}
```

**Signaux d'escalade détectés :**

- Ton agressif (inadmissible, scandaleux, voleurs)
- Juridique (avocat, plainte, DGCCRF)
- RGPD (supprimer mes données)
- Réseaux sociaux (twitter, facebook, avis)
- Relance (déjà contacté, pas de réponse)

#### Étape 3 : Agent Réponse

**Prompt utilisé :** `prompts-data/Agent_reponse.md`

**Mission :**

- Générer une réponse basée sur les playbooks
- Décider entre GO (réponse directe) ou KO (escalade)
- Respecter le tone of voice Alltricks

**Playbooks consultés :**
Les 9 fichiers dans `playbooks-data/` :

- `01-LIVRAISON.md` (6 playbooks)
- `02-RETOURS.md` (7 playbooks)
- `03-COMMANDES.md` (5 playbooks)
- `04-PAIEMENT.md` (6 playbooks)
- `05-PROMO-AVOIRS.md` (4 playbooks)
- `06-COMPTE.md` (4 playbooks)
- `07-PRODUITS.md` (4 playbooks)
- `08-ALLTRICKS+.md` (1 playbook)
- `09-PROS-CLUBS.md` (3 playbooks)

**Output GO (réponse directe) :**

```json
{
  "status": "GO",
  "domain": "livraison",
  "message": "Bonjour Jean,\n\nJe comprends votre inquiétude...",
  "playbook_sections_checked": ["PLB-LIV-001"],
  "rag_sources_checked": [],
  "relevant_passages": ["Citations playbooks"]
}
```

**Output KO (escalade) :**

```json
{
  "status": "KO",
  "domain": "livraison",
  "reason": "Vérification statut nécessite accès BDD",
  "missing_info": "numero_de_commande",
  "template_conseiller": "Bonjour Jean,\n\nPour vérifier...",
  "playbook_sections_checked": ["PLB-LIV-001"],
  "rag_sources_checked": [],
  "relevant_passages": ["Citations playbooks"]
}
```

**Règle fondamentale : GO par défaut**

L'agent doit produire un GO si :

- Les playbooks contiennent une procédure applicable
- Une information générale peut aider le client
- Une orientation self-service est possible

L'agent ne peut produire un KO que si :

- La demande est hors périmètre (conseil produit, juridique, RGPD)
- Une information indispensable manque (n° commande pour vérification)
- Aucune procédure générique n'existe

#### Étape 4 : Agent Judge

**Prompt utilisé :** `prompts-data/Agent_judge.md`

**Mission :**

- Évaluer la qualité de la réponse générée
- Décider : SEND / REVIEW / REJECT
- Détecter les KO abusifs

**Grille d'évaluation :**

| Note | Décision (GO) | Décision (KO) | Signification                          |
| ---- | ------------- | ------------- | -------------------------------------- |
| 5    | SEND          | REVIEW        | Parfait / KO légitime                  |
| 4    | SEND          | REVIEW        | Très bien                              |
| 3    | REVIEW        | REVIEW        | Acceptable / KO potentiellement abusif |
| 2    | REJECT        | REJECT        | Erreur factuelle grave                 |
| 1    | REJECT        | REJECT        | Inutilisable                           |

**Critères bloquants (REJECT) :**

- Erreur factuelle sur procédure ou délais
- Hors sujet complet
- Promesse interdite (délai garanti)
- GO alors qu'expertise humaine nécessaire

**Détection KO abusif :**

Un KO est considéré comme potentiellement abusif si :

- ✅ Procédure générique complète fournie
- ✅ Ressources accessibles (liens Espace client)
- ✅ Aucun besoin d'expertise technique
- ✅ Aucun placeholder ([À CONFIRMER], [VÉRIFIER])
- ✅ Le client peut résoudre SEUL avec les infos

→ **Verdict : REVIEW (note 3)** pour validation humaine

**Output :**

```json
{
  "decision": "SEND",
  "note": 5,
  "commentaire": "Réponse complète avec procédure claire",
  "missing_data": []
}
```

#### Étape 5 : Sortie workflow

**Format de réponse normalisé :**

```json
{
  "motif_ia": "MES COMMANDES ET RETOURS",
  "motif_details": {
    "categorie": "MES COMMANDES ET RETOURS",
    "sous_categorie": "Suivi livraison",
    "priorite": "HAUTE"
  },
  "client": {
    "firstname": "Jean",
    "lastname": "Dupont",
    "message": "Je n'ai pas reçu ma commande...",
    "mail": null
  },
  "response": {
    "gemini": {
      "status": "GO",
      "response": "Bonjour Jean,\n\nJe comprends...",
      "ko_reason": null,
      "judge": {
        "decision": "SEND",
        "note": 5,
        "commentaire": "Réponse complète..."
      }
    }
  }
}
```

---

## 📝 Système de prompts

### 1. Agent Classification (`classification.md`)

**Rôle :** Agent de classification uniquement (pas de réponse)

**Arborescence officielle (7 catégories) :**

1. **INFORMATIONS SUR NOS PRODUITS**
   - Catégorie vélo (BMX/Route/Ville/VTT/Autres)
   - Catégorie Running
   - Catégorie Outdoor
   - Disponibilité produits

2. **MES COMMANDES ET RETOURS**
   - Suivi livraison
   - Retard livraison
   - Annulation de commande
   - Modification de commande
   - Demande de retour
   - Suivre mon retour
   - Déclarer une anomalie au sujet d'un retour

3. **PAIEMENT ET REMBOURSEMENT**
   - Question à propos des paiements
   - Anomalie au sujet d'un paiement
   - Question à propos d'un remboursement
   - Anomalie au sujet d'un remboursement

4. **GARANTIE / RÉPARATION**
   - Nouvelle demande de garantie/réparation
   - Suivi d'une demande en cours

5. **PRODUIT REÇU ABÎMÉ OU NON CONFORME OU MANQUANT**
   - Concerne un vélo complet
   - Concerne un autre produit

6. **COMPTE CLIENT**
   - Fonctionnement du compte client
   - Offre Alltricks+
   - Désinscription des newsletters

7. **AUTRES QUESTIONS**
   - Trouvé moins cher ailleurs
   - Pro, ateliers partenaires
   - Club et demande de sponsoring
   - Contact presse
   - Toutes autres demandes

**Règles de priorité :**

- **HAUTE** : Anomalie paiement, produit abîmé/manquant, escalade
- **MOYENNE** : Retard, retour, remboursement, annulation, garantie
- **BASSE** : Information produit, compte, newsletter, autres

**Format de sortie strict :**

```json
{
  "categorie": "[NOM COMPLET DE LA CATÉGORIE]",
  "sous_categorie": "[sous-catégorie conforme]",
  "priorite": "[HAUTE|MOYENNE|BASSE]",
  "action_recommandee": "action à entreprendre"
}
```

### 2. Agent Réponse (`Agent_reponse.md`)

**Rôle :** Générer la réponse client basée sur les playbooks

**Périmètre d'intervention :**

1. **Suivi livraison** : statut commande, délais, transporteur, tracking
2. **Process commande** : paiement, livraison, retours, fonctionnement site

**Catégories autorisées (périmètre ciblé) :**

- AUTRES QUESTIONS / Trouvé moins cher ailleurs
- AUTRES QUESTIONS / Club et demande de sponsoring
- AUTRES QUESTIONS / contact non reçu
- AUTRES QUESTIONS / Toutes autres demandes
- AUTRES QUESTIONS / Pro, ateliers partenaires
- AUTRES QUESTIONS / Contact presse
- COMPTE / Offre Alltricks+
- PAIEMENT / Anomalie au sujet d'un paiement
- PAIEMENT / Question à propos des paiements
- PAIEMENT / Anomalie au sujet d'un remboursement
- PAIEMENT / question sur carte cadeau

**Glossaire obligatoire :**

| ✅ Terme officiel       | ❌ Ne JAMAIS utiliser  |
| ----------------------- | ---------------------- |
| Alltricks               | Alltrick, All tricks   |
| Alltricks+              | Alltricks Plus, AT+    |
| Vendeur partenaire      | Marketplace, seller    |
| Espace client           | Mon compte, dashboard  |
| Point relais            | Relay, pickup          |
| Mes Commandes & Retours | Historique commandes   |
| Code promo              | Coupon, code réduction |
| Avoir                   | Bon d'achat, crédit    |
| Chèque-cadeau           | Gift card              |

**Tone of Voice Alltricks :**

| Attribut     | Application                                        |
| ------------ | -------------------------------------------------- |
| Expert       | Précis, maîtrise technique                         |
| Accessible   | Langage simple, pas de jargon                      |
| Encourageant | Positif ("Pas d'inquiétude !", "Bonne nouvelle !") |
| Concis       | Direct, phrases courtes                            |
| Confiant     | Affirmatif ("Voici comment faire")                 |

**Structure obligatoire du mail :**

```
Bonjour [Prénom],


[Réponse principale]

[Détails/étapes si nécessaire]

[Call-to-action ou lien]

L'équipe Alltricks
```

**Règles critiques :**

1. **GO par défaut** : Si une procédure existe dans les playbooks → GO
2. **Information indispensable manquante** : Si une info est indispensable pour éviter une instruction fausse → KO
3. **Format JSON brut** : Pas de ```json, commence par `{`, finit par `}`

**Informations indispensables (déclenchent KO) :**

| Domaine   | Info indispensable                      | Exemple KO                   |
| --------- | --------------------------------------- | ---------------------------- |
| livraison | `numero_de_commande` OU `lien_tracking` | "Où est mon colis ?" (vérif) |
| process   | `reference_transaction` / `id_paiement` | "Annulez pour moi"           |
| process   | `reference_cheque_cadeau`               | "Annulez mon chèque-cadeau"  |
| process   | `numéro d'avoir`                        | "Où en est mon avoir ?"      |

**Cas avec GO obligatoire :**

1. Blocage sur champ obligatoire (téléphone, adresse, paiement)
2. Modification du contenu de commande (taille, modèle, couleur)
3. Annulation de commande + remboursement
4. Demande de retour et remboursement (même sans n° commande)

**Promesses INTERDITES :**

| ❌ Interdit                      | ✅ Alternative                                 |
| -------------------------------- | ---------------------------------------------- |
| "Vous serez remboursé demain"    | "Les remboursements sont traités sous 5 jours" |
| "Votre colis arrivera le [date]" | "Les délais habituels sont de X jours"         |
| "Je vais faire le nécessaire"    | "Voici la marche à suivre"                     |

### 3. Agent Judge (`Agent_judge.md`)

**Rôle :** Évaluateur qualité des réponses générées

**Périmètre :**

| Agent             | Périmètre                               | Source template       |
| ----------------- | --------------------------------------- | --------------------- |
| **Agent Réponse** | Après-vente (livraison, commandes, SAV) | `template_conseiller` |
| **Agent Produit** | Avant-vente (conseil technique)         | `template`            |

**Règle absolue :**

Un KO ne peut **JAMAIS** être `SEND`. Seuls les GO peuvent être `SEND`.

**Pour les KO :**

- **KO légitime** (hors périmètre, expertise requise) → `REVIEW` (note 4-5)
- **KO potentiellement abusif** (procédure complète) → `REVIEW` (note 3)
- **KO invalide** (erreur factuelle) → `REJECT` (note 1-2)

**Détection des KO abusifs :**

Un KO est **potentiellement abusif** si le template contient **TOUS** ces éléments :

| Critère                             | Description                             |
| ----------------------------------- | --------------------------------------- |
| ✅ **Procédure générique complète** | Instructions détaillées et exploitables |
| ✅ **Ressources accessibles**       | Liens directs vers Espace client        |
| ✅ **Aucun besoin d'expertise**     | Pas de conseil technique requis         |
| ✅ **Aucun placeholder**            | Pas de `[À CONFIRMER]`, `[VÉRIFIER]`    |

→ Si le client peut résoudre SEUL = KO potentiellement abusif

**Exceptions acceptables (ne pas considérer comme abusif) :**

- Demande nécessitant une donnée client spécifique
- Besoin de vérification en base de données
- Contexte client ambigu nécessitant clarification

**Grille d'évaluation :**

**Niveau 1 : Critères Bloquants → REJECT (note ≤ 2)**

- Erreur factuelle sur procédure, caractéristiques, délais
- Hors sujet ou ne traite pas la demande
- Promesse interdite (délai garanti)
- Mode GO/KO incorrect

**Niveau 2 : Critères Majeurs → REVIEW (note 3)**

- Ne couvre pas tous les points du client
- Client ne sait pas quoi faire concrètement
- Manque étapes ou conditions importantes

**Niveau 3 : Critères Mineurs → REVIEW si cumulés**

- Structure confuse, formulation ambiguë
- Manque empathie, trop sec, trop verbeux
- Longueur disproportionnée

**Format de sortie :**

```json
{
  "decision": "SEND|REVIEW|REJECT",
  "note": 5,
  "commentaire": "Explication concise (1-3 phrases max)",
  "missing_data": []
}
```

---

## 📚 Playbooks

### Structure des playbooks

Les playbooks sont la **base de connaissances** du mailbot. Ils contiennent les procédures officielles Alltricks.

**Organisation :**

```
playbooks-data/
├── 00-INDEX.md              # Index général
├── 01-LIVRAISON.md          # 6 playbooks livraison
├── 02-RETOURS.md            # 7 playbooks retours
├── 03-COMMANDES.md          # 5 playbooks commandes
├── 04-PAIEMENT.md           # 6 playbooks paiement
├── 05-PROMO-AVOIRS.md       # 4 playbooks promos/avoirs
├── 06-COMPTE.md             # 4 playbooks compte
├── 07-PRODUITS.md           # 4 playbooks produits
├── 08-ALLTRICKS+.md         # 1 playbook Alltricks+
├── 09-PROS-CLUBS.md         # 3 playbooks pros/clubs
├── glossary.md              # Termes officiels
├── ia-usage-rules.md        # Règles d'utilisation IA
├── naming-convention.md     # Conventions de nommage
└── writing-guidelines.md    # Guidelines rédaction
```

**Total : 40 playbooks**

### Structure type d'un playbook

```markdown
# PLB-[TRIGRAMME]-XXX - Titre

## 1. 🎯 Objectif

## 2. 🗂️ Métadonnées

- ID: PLB-XXX-XXX
- Catégorie: [Catégorie]
- Tags: [tags]
- Priorité: P1/P2/P3/P4

## 3. 🔎 Conditions de Déclenchement

## 4. 📋 Informations à Identifier dans l'email

## 5. 💬 Gabarits de Réponse

## 6. ⚠️ Règles et Points d'Attention

## 7. 🔗 Ressources et Liens
```

### Exemple : PLB-LIV-001 (Suivi de commande)

**Objectif :** Aider le client à suivre sa commande

**Conditions de déclenchement :**

- "Où est ma commande ?"
- "Suivi de livraison"
- "Tracking"

**Gabarit de réponse :**

```
Bonjour [Prénom],

Pour suivre votre commande, rendez-vous dans votre Espace client :
https://www.alltricks.fr/mon-compte/mes-commandes

Vous y trouverez :
- Le statut de votre commande
- Le lien de suivi transporteur
- La date de livraison estimée

Si vous avez reçu un email de confirmation d'expédition, le lien de suivi y figure également.

L'équipe Alltricks
```

### Légende priorités

| Niveau | Description                    | Action agent                           |
| ------ | ------------------------------ | -------------------------------------- |
| **P1** | Critique - Client bloqué       | Réponse immédiate + escalade si besoin |
| **P2** | Haute - Demande importante     | Réponse complète sous 4h               |
| **P3** | Moyenne - Information standard | Réponse sous 24h                       |
| **P4** | Basse - Information simple     | Réponse sous 48h                       |

---

## 🔄 Flux de traitement

### Diagramme complet

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT                                   │
│                  Envoie un email                                 │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    INTERFACE WEB                                 │
│         Formulaire : Prénom, Nom, Message                        │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│              API ROUTE /api/execute-workflow                     │
│         • Validation Zod                                         │
│         • Rate limiting (10/min)                                 │
│         • Sanitization                                           │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    N8N WEBHOOK                                   │
│         Reçoit : { firstname, lastname, message }                │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│              AGENT 1 : CLASSIFICATION                            │
│         Prompt : classification.md                               │
│         Output : { categorie, sous_categorie, priorite }         │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│              AGENT 2 : GÉNÉRATION RÉPONSE                        │
│         Prompt : Agent_reponse.md                                │
│         Playbooks : 01-LIVRAISON.md à 09-PROS-CLUBS.md           │
│         Output : { status: GO/KO, message/template }             │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│              AGENT 3 : ÉVALUATION QUALITÉ                        │
│         Prompt : Agent_judge.md                                  │
│         Output : { decision: SEND/REVIEW/REJECT, note }          │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    DÉCISION FINALE                               │
│         • SEND → Email envoyé automatiquement                    │
│         • REVIEW → Validation humaine requise                    │
│         • REJECT → Rejet, ne pas envoyer                         │
└─────────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    RÉPONSE CLIENT                                │
│         Format normalisé avec métadonnées complètes              │
└─────────────────────────────────────────────────────────────────┘
```

### Scénarios de traitement

#### Scénario 1 : GO + SEND (réponse automatique)

```
Client : "Comment retourner un article ?"
↓
Classification : RETOURS / Demande de retour standard / MOYENNE
↓
Réponse : GO avec procédure complète (PLB-RET-007)
↓
Judge : SEND (note 5) - Réponse complète et claire
↓
✅ Email envoyé automatiquement au client
```

#### Scénario 2 : GO + REVIEW (amélioration nécessaire)

```
Client : "Comment modifier l'adresse de livraison ?"
↓
Classification : COMMANDES / Modification de commande / MOYENNE
↓
Réponse : GO mais incomplet (manque lien Espace client)
↓
Judge : REVIEW (note 3) - Manque actionnabilité
↓
⚠️ Validation humaine requise avant envoi
```

#### Scénario 3 : KO + REVIEW (escalade légitime)

```
Client : "Où en est ma commande AT-123456 ?"
↓
Classification : COMMANDES / Suivi livraison / HAUTE
↓
Réponse : KO - Vérification statut nécessite accès BDD
↓
Judge : REVIEW (note 5) - KO légitime, escalade justifiée
↓
⚠️ Conseiller humain prend le relais
```

#### Scénario 4 : KO + REVIEW (KO potentiellement abusif)

```
Client : "Je n'ai pas reçu ma commande passée il y a 5 jours"
↓
Classification : COMMANDES / Retard livraison / HAUTE
↓
Réponse : KO avec template complet (procédure pour trouver n° commande)
↓
Judge : REVIEW (note 3) - KO potentiellement abusif
         Template complet, client peut agir seul
↓
⚠️ Validation humaine pour confirmer si GO était préférable
```

#### Scénario 5 : GO + REJECT (erreur factuelle)

```
Client : "Quels sont vos délais de remboursement ?"
↓
Classification : PAIEMENT / Question remboursement / BASSE
↓
Réponse : GO mais erreur factuelle (délai incorrect)
↓
Judge : REJECT (note 2) - Erreur sur délai standard
↓
❌ Réponse rejetée, ne pas envoyer
```

---

## ⚙️ Règles et contraintes

### Règles d'utilisation IA

**Source :** `playbooks-data/ia-usage-rules.md`

#### Principe fondamental

```
INFORMER → GUIDER → REDIRIGER
```

L'IA est un **premier niveau de réponse** qui :

1. Identifie l'intention du client
2. Fournit l'information générale (FAQ)
3. Redirige vers les outils self-service

#### ✅ Ce que l'IA a le DROIT de faire

**Informer :**

- Expliquer une procédure
- Donner des délais standards
- Présenter les options disponibles
- Citer les conditions générales

**Guider :**

- Décrire les étapes d'une action
- Indiquer où trouver une information
- Proposer des vérifications
- Suggérer une alternative

**Rediriger :**

- Orienter vers l'espace client
- Orienter vers un vendeur partenaire

**Rassurer :**

- Accuser réception du problème
- Confirmer une règle rassurante
- Indiquer qu'une solution existe

#### ❌ Ce que l'IA n'a PAS le droit de faire

**Actions interdites :**

- ❌ Annuler une commande
- ❌ Modifier une adresse
- ❌ Créer un avoir
- ❌ Effectuer un remboursement
- ❌ Ouvrir une enquête transporteur

**Informations interdites :**

- ❌ Statut réel d'une commande
- ❌ Localisation d'un colis
- ❌ Montant d'un avoir
- ❌ Historique d'achats
- ❌ Données personnelles

**Promesses interdites :**

- ❌ "Vous serez remboursé demain"
- ❌ "Je vous offre X€ de geste commercial"
- ❌ "Votre colis arrivera le [date]"
- ❌ "Je vais faire le nécessaire"
- ❌ "C'est réglé"

**Comportements interdits :**

- ❌ Inventer des informations
- ❌ Deviner le statut d'une commande
- ❌ Accuser le transporteur
- ❌ Critiquer un vendeur partenaire
- ❌ Exprimer des opinions personnelles

### Règles d'escalade

#### Quand produire un KO (escalade vers un humain) ?

| Situation                                 | Action                     |
| ----------------------------------------- | -------------------------- |
| Client explicitement mécontent / agressif | Escalade immédiate         |
| Demande d'action impossible pour l'IA     | Escalade après information |
| Question juridique / litige               | Escalade immédiate         |
| Demande de geste commercial               | Escalade                   |
| 2ème relance sur même sujet               | Escalade                   |
| Cas complexe multi-problèmes              | Escalade                   |
| Mention RGPD / suppression données        | Escalade                   |

#### Niveau de confiance de l'IA

| Niveau               | Seuil  | Action                        |
| -------------------- | ------ | ----------------------------- |
| 🟢 Haute confiance   | > 85%  | Réponse automatique           |
| 🟡 Confiance moyenne | 60-85% | Réponse + suggestion escalade |
| 🔴 Faible confiance  | < 60%  | Escalade directe              |

**Cas de confiance basse automatique :**

- Email en langue étrangère (hors FR/EN)
- Email avec pièces jointes
- Email avec ton agressif détecté
- Email avec termes juridiques (avocat, plainte, DGCCRF)
- Email mentionnant les réseaux sociaux (Twitter, Facebook)

### Règles de sécurité

#### Données personnelles

| Règle                                       | Application                          |
| ------------------------------------------- | ------------------------------------ |
| Ne jamais demander de mot de passe          | Jamais, même pour "vérification"     |
| Ne jamais demander de coordonnées bancaires | Orienter vers paiement sécurisé      |
| Ne pas stocker d'informations personnelles  | L'IA ne mémorise pas entre sessions  |
| Ne pas répéter d'informations sensibles     | Ne pas citer adresse/téléphone reçus |

#### Détection de fraude

| Signal                                 | Action                                |
| -------------------------------------- | ------------------------------------- |
| Demande de remboursement sans commande | Ne pas traiter, escalader             |
| Prétention d'être un employé           | Ne pas accorder de privilège          |
| Demande d'accès au compte d'un tiers   | Refuser, demander connexion au compte |
| Multiple demandes similaires           | Signaler pour analyse                 |

---

## 💡 Exemples concrets

### Exemple 1 : Demande de retour (GO + SEND)

**Email client :**

```
Bonjour,
Je souhaite retourner un article que j'ai reçu. Comment faire ?
Cordialement,
Marie
```

**Classification :**

```json
{
  "categorie": "MES COMMANDES ET RETOURS",
  "sous_categorie": "Demande de retour",
  "priorite": "MOYENNE",
  "action_recommandee": "Fournir procédure retour standard"
}
```

**Réponse (Agent Réponse) :**

```json
{
  "status": "GO",
  "domain": "process",
  "message": "Bonjour Marie,\n\nPas de souci, vous pouvez retourner votre article facilement.\n\nVoici comment procéder en 3 étapes :\n\n**Étape 1 : Accédez à votre Espace client**\nRendez-vous sur : https://www.alltricks.fr/mon-compte/mes-commandes\n\n**Étape 2 : Initiez votre retour**\n1. Cliquez sur \"Retourner un article\"\n2. Sélectionnez le(s) produit(s) à retourner\n3. Choisissez parmi les 3 options :\n\n**Option 1 : Retour en magasin - GRATUIT**\n- Déposez votre article dans l'un de nos magasins\n- L'avoir est généré immédiatement\n\n**Option 2 : Avoir sans frais de retour - GRATUIT**\n- Un avoir non remboursable vous sera crédité\n- Aucuns frais de retour\n\n**Option 3 : Remboursement sur votre moyen de paiement**\n- Des frais de retour seront déduits\n- Remboursement sur le mode de paiement initial\n\n**Étape 3 : Renvoyez votre colis**\nUne étiquette de retour sera générée automatiquement.\n\n**Délais :**\n- Traitement du retour : 72h maximum après réception\n- Remboursement : 5 jours ouvrés après demande depuis l'avoir\n\nL'équipe Alltricks",
  "playbook_sections_checked": ["PLB-RET-007"],
  "rag_sources_checked": [],
  "relevant_passages": ["Procédure retour standard avec 3 options"]
}
```

**Évaluation (Agent Judge) :**

```json
{
  "decision": "SEND",
  "note": 5,
  "commentaire": "Réponse complète avec procédure détaillée pour tous les cas. Ton professionnel et rassurant. Toutes les options présentées.",
  "missing_data": []
}
```

**Résultat :** ✅ Email envoyé automatiquement

---

### Exemple 2 : Suivi commande sans n° (KO + REVIEW légitime)

**Email client :**

```
Bonjour,
Où en est ma commande ? Je l'attends depuis 10 jours !
Jean
```

**Classification :**

```json
{
  "categorie": "MES COMMANDES ET RETOURS",
  "sous_categorie": "Suivi livraison",
  "priorite": "HAUTE",
  "action_recommandee": "Vérifier statut commande"
}
```

**Réponse (Agent Réponse) :**

```json
{
  "status": "KO",
  "domain": "livraison",
  "reason": "Vérification statut nécessite accès BDD et numéro de commande",
  "missing_info": "numero_de_commande",
  "template_conseiller": "Bonjour Jean,\n\nJe comprends votre inquiétude concernant votre commande.\n\nPour vérifier le statut exact de votre livraison, j'ai besoin de votre numéro de commande.\n\nVous pouvez le retrouver :\n- Dans l'email de confirmation d'expédition\n- Dans votre Espace client : https://www.alltricks.fr/mon-compte/mes-commandes\n\nDès réception, nous pourrons vérifier le statut de votre colis et vous proposer la solution adaptée.\n\nL'équipe Alltricks",
  "playbook_sections_checked": ["PLB-LIV-001"],
  "rag_sources_checked": [],
  "relevant_passages": ["Suivi commande nécessite identification"]
}
```

**Évaluation (Agent Judge) :**

```json
{
  "decision": "REVIEW",
  "note": 5,
  "commentaire": "KO légitime : vérification statut nécessite accès système et identification commande. Escalade justifiée.",
  "missing_data": []
}
```

**Résultat :** ⚠️ Conseiller humain prend le relais

---

### Exemple 3 : Code promo ne fonctionne pas (GO + SEND)

**Email client :**

```
Bonjour,
Mon code promo BIKE20 ne fonctionne pas au moment du paiement.
Pourquoi ?
Sophie
```

**Classification :**

```json
{
  "categorie": "PAIEMENT ET REMBOURSEMENT",
  "sous_categorie": "Question à propos des paiements",
  "priorite": "MOYENNE",
  "action_recommandee": "Expliquer conditions codes promo"
}
```

**Réponse (Agent Réponse) :**

```json
{
  "status": "GO",
  "domain": "process",
  "message": "Bonjour Sophie,\n\nJe comprends votre frustration. Voici les raisons courantes pour lesquelles un code promo peut ne pas fonctionner :\n\n**1. Conditions d'utilisation**\n- Montant minimum d'achat requis\n- Catégories de produits éligibles\n- Date de validité expirée\n\n**2. Restrictions produits**\n- Les produits vendeurs partenaires ne sont pas éligibles aux codes promo Alltricks\n- Certains produits en promotion sont exclus\n\n**3. Non-cumul**\n- Un seul code promo par commande\n- Non cumulable avec d'autres réductions\n\n**Comment vérifier ?**\nRendez-vous sur votre panier, le message d'erreur vous indiquera la raison précise.\n\nSi le code devrait fonctionner selon les conditions, je vous invite à contacter notre Service Client : https://www.alltricks.fr/contact/form\n\nL'équipe Alltricks",
  "playbook_sections_checked": ["PLB-PRO-025"],
  "rag_sources_checked": [],
  "relevant_passages": ["Conditions codes promo et restrictions"]
}
```

**Évaluation (Agent Judge) :**

```json
{
  "decision": "SEND",
  "note": 5,
  "commentaire": "Réponse complète couvrant toutes les raisons possibles. Orientation claire vers vérification et escalade si nécessaire.",
  "missing_data": []
}
```

**Résultat :** ✅ Email envoyé automatiquement

---

### Exemple 4 : Demande RGPD (KO + REVIEW immédiat)

**Email client :**

```
Bonjour,
Je souhaite que vous supprimiez toutes mes données personnelles conformément au RGPD.
Merci
```

**Classification :**

```json
{
  "categorie": "COMPTE CLIENT",
  "sous_categorie": "Suppression de compte",
  "priorite": "HAUTE",
  "action_recommandee": "Escalade immédiate - RGPD"
}
```

**Réponse (Agent Réponse) :**

```json
{
  "status": "KO",
  "domain": "hors_perimetre",
  "reason": "Demande RGPD nécessite traitement humain sécurisé",
  "missing_info": "Validation identité + procédure RGPD",
  "template_conseiller": "Bonjour,\n\nNous prenons votre demande de suppression de données très au sérieux.\n\nConformément au RGPD, notre équipe va traiter votre demande de manière sécurisée.\n\nUn conseiller va vous recontacter pour :\n- Vérifier votre identité\n- Vous expliquer les implications\n- Procéder à la suppression si confirmée\n\nVous serez recontacté sous 48h maximum.\n\nL'équipe Alltricks",
  "playbook_sections_checked": ["PLB-CPT-031"],
  "rag_sources_checked": [],
  "relevant_passages": ["Procédure RGPD nécessite validation humaine"]
}
```

**Évaluation (Agent Judge) :**

```json
{
  "decision": "REVIEW",
  "note": 5,
  "commentaire": "KO légitime : demande RGPD nécessite traitement humain sécurisé avec vérification identité. Escalade immédiate justifiée.",
  "missing_data": []
}
```

**Résultat :** ⚠️ Escalade immédiate vers conseiller spécialisé RGPD

---

## 🔧 Configuration et déploiement

### Variables d'environnement

Créer un fichier `.env.local` à la racine du projet :

```bash
# Obligatoire
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/mailbot

# Optionnel - Authentification n8n
N8N_API_KEY=your_api_key_here
N8N_BASIC_AUTH_USER=your_username
N8N_BASIC_AUTH_PASSWORD=your_password
```

### Installation

```bash
# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build production
npm run build

# Lancer en production
npm start
```

### Accès

- **Interface web** : http://localhost:3000
- **API endpoint** : http://localhost:3000/api/execute-workflow

### Test de l'API

```bash
curl -X POST http://localhost:3000/api/execute-workflow \
  -H "Content-Type: application/json" \
  -d '{
    "input": {
      "firstname": "Jean",
      "lastname": "Dupont",
      "message": "Comment retourner un article ?"
    }
  }'
```

---

## 📊 Métriques et monitoring

### Indicateurs clés

| Métrique               | Description                              | Objectif |
| ---------------------- | ---------------------------------------- | -------- |
| **Taux de GO**         | % de réponses directes (GO)              | > 70%    |
| **Taux de SEND**       | % de GO validés automatiquement          | > 80%    |
| **Taux de KO abusifs** | % de KO potentiellement abusifs détectés | < 10%    |
| **Note moyenne Judge** | Note moyenne des évaluations             | > 4.0    |
| **Temps de réponse**   | Durée totale du workflow                 | < 10s    |
| **Taux d'erreur**      | % d'erreurs techniques                   | < 2%     |

### Logs disponibles

**Console serveur :**

```
[execute-workflow] {
  executionId: "uuid",
  executedAt: "2026-01-30T09:00:00.000Z",
  ip: "192.168.1.1",
  hasInput: true,
  messageLen: 150,
  dryRun: false
}
```

**Réponse API :**

```json
{
  "success": true,
  "data": { ... },
  "executedAt": "2026-01-30T09:00:00.000Z",
  "executionId": "uuid",
  "durationMs": 8500
}
```

---

## 🚀 Évolutions futures

### Améliorations prévues

1. **Accès aux données** : Intégration Salesforce pour vérifications réelles
2. **Multi-langue** : Support anglais et autres langues
3. **Pièces jointes** : Analyse d'images (produits abîmés)
4. **Sentiment analysis** : Détection fine du ton client
5. **A/B testing** : Test de différentes formulations
6. **Analytics** : Dashboard de métriques détaillées

### Optimisations techniques

1. **Cache playbooks** : Mise en cache des playbooks pour performance
2. **Rate limiting Redis** : Remplacer le rate limiting mémoire par Redis
3. **Queue système** : File d'attente pour traitement asynchrone
4. **Webhooks sortants** : Notifications vers CRM/Salesforce
5. **Logs structurés** : Logging centralisé (ELK, Datadog)

---

## 📞 Support et maintenance

### Contacts

- **Équipe technique** : dev@alltricks.com
- **Service Client** : support@alltricks.com
- **Documentation** : https://docs.alltricks.internal

### Mise à jour des playbooks

Les playbooks sont versionnés dans le dépôt Git. Pour mettre à jour :

1. Modifier le fichier playbook concerné
2. Tester avec l'interface web
3. Commit + Push
4. Redéploiement automatique (CI/CD)

### Monitoring n8n

- **Interface n8n** : https://your-n8n-instance.com
- **Logs workflow** : Accessibles dans l'interface n8n
- **Alertes** : Configurées sur échecs workflow

---

## 📝 Changelog

### Version 1.0 (Janvier 2026)

- ✅ Architecture complète 3 agents (Classification, Réponse, Judge)
- ✅ 40 playbooks couvrant tous les cas d'usage
- ✅ Interface web Next.js 15
- ✅ API Route avec validation Zod
- ✅ Rate limiting 10 req/min
- ✅ Détection KO abusifs
- ✅ Système de prompts optimisés
- ✅ Documentation complète

---

## 🎓 Glossaire

| Terme             | Définition                                                   |
| ----------------- | ------------------------------------------------------------ |
| **GO**            | Réponse directe au client (mail prêt à envoyer)              |
| **KO**            | Escalade vers conseiller humain (information manquante)      |
| **SEND**          | Décision d'envoi automatique (validation Judge)              |
| **REVIEW**        | Validation humaine requise avant envoi                       |
| **REJECT**        | Rejet de la réponse (erreur factuelle ou hors sujet)         |
| **KO abusif**     | KO injustifié alors qu'un GO était possible                  |
| **Playbook**      | Procédure officielle Alltricks pour un cas d'usage           |
| **Agent**         | Module IA spécialisé (Classification, Réponse, Judge)        |
| **Workflow n8n**  | Orchestration des agents IA                                  |
| **Rate limiting** | Limitation du nombre de requêtes par minute                  |
| **Escalade**      | Transfert vers un conseiller humain                          |
| **Self-service**  | Outils permettant au client de résoudre seul (Espace client) |
| **Espace client** | Interface web Alltricks pour gérer commandes/retours         |

---

## 📚 Ressources

### Documentation interne

- `README.md` : Guide de démarrage rapide
- `playbooks-data/00-INDEX.md` : Index des playbooks
- `playbooks-data/ia-usage-rules.md` : Règles d'utilisation IA
- `playbooks-data/glossary.md` : Glossaire des termes officiels
- `playbooks-data/writing-guidelines.md` : Guidelines de rédaction

### Outils

- **Next.js** : https://nextjs.org/docs
- **n8n** : https://docs.n8n.io
- **Zod** : https://zod.dev
- **Tailwind CSS** : https://tailwindcss.com/docs
- **shadcn/ui** : https://ui.shadcn.com

---

**Fin de la documentation**

_Pour toute question ou suggestion d'amélioration, contactez l'équipe technique._
