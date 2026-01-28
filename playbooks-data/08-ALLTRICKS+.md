# ⭐ PLAYBOOK ALLTRICKS+ — Format IA-Ready

> **Thématique** : Programme de fidélité Alltricks+ (abonnement annuel)
> **Playbooks** : PLB-ATP-001

---

# PLB-ATP-001 - Informations & conditions Alltricks+

## 1. 🎯 Objectif

Informer le client sur l'offre Alltricks+ (prix/durée, avantages, conditions d'éligibilité, exclusions) et fournir les gabarits de réponse adaptés.

---

## 2. 🗂️ Métadonnées (ID, Catégorie, Tags, Priorité)

| Propriété          | Valeur                                                                                                                                        |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **Identifiant**    | PLB-ATP-001                                                                                                                                   |
| **Catégorie**      | 1. MON COMPTE & ABONNEMENTS                                                                                                                   |
| **Sous-catégorie** | 1.3 Programme Alltricks+                                                                                                                      |
| **Tags Clés**      | `alltricks+`, `abonnement`, `fidelite`, `avantages`, `livraison gratuite`, `cashback`, `retour 100 jours`, `strava`, `prix`, `renouvellement` |
| **Priorité**       | P1                                                                                                                                            |

---

## 3. 🔎 Conditions de Déclenchement

Le playbook doit s'activer si le client pose une question sur Alltricks+ (avantages, prix/durée, cashback, renouvellement, éligibilité, code anniversaire, exclusions Marketplace, Strava).

**Exemples de formulations clients :**

- "Qu'est-ce que Alltricks+ ?"
- "Quels sont les avantages de l'abonnement ?"
- "Quel est le prix et la durée ?"
- "Comment fonctionne le cashback ?"
- "Le renouvellement est-il automatique ?"
- "Quelles sont les conditions d'éligibilité ?"

---

## 4. 📋 Informations à Identifier dans l'email

| Information                                      | Utilité                                                       |
| ------------------------------------------------ | ------------------------------------------------------------- |
| Sujet exact (livraison, cashback, retours, etc.) | Choisir le bon gabarit / détailler la règle pertinente        |
| Pays / zone (France hors Corse, Belgique, etc.)  | Vérifier l'éligibilité et les limites (ex: cashback Belgique) |
| Marketplace / vendeur partenaire mentionné       | Appliquer les exclusions Marketplace                          |
| Mention d'un litige / contestation / juridique   | Déclencher une escalade (KO)                                  |

---

## 5. 💬 Gabarits de Réponse

### 5.1. Template standard – Présentation Alltricks+

```markdown
Bonjour [Prénom],

Voici les infos clés sur l’abonnement **Alltricks+** :

**Prix & durée**

- 9,99€ TTC/an
- Valable 365 jours à partir de l’activation
- Renouvellement **non automatique** (manuel uniquement)

**Avantages principaux**

1. **Livraison gratuite** sur produits Alltricks (pas Marketplace)
   - Point relais standard/express & domicile standard gratuits
   - Domicile express gratuit dès 25€
2. **Cashback** sur produits éligibles (crédité après expédition)
3. **Retours étendus à 100 jours** (avoir, pas remboursement)
4. **Code anniversaire -10%** (événement Alltricks en mai)
5. **Essai Strava Premium** (60 jours gratuits selon éligibilité)

**Éligibilité**

- France métropolitaine (hors Corse) ou Belgique
- +18 ans, compte client actif, usage personnel

Si vous souhaitez, je peux détailler un avantage en particulier.

L’équipe Alltricks
```

### 5.2. Template – Cashback (détail rapide)

```markdown
Le cashback Alltricks+ est une cagnotte virtuelle :

- Visible après **expédition** de la commande (pas à la validation)
- Utilisable sur les prochaines commandes Alltricks
- Cumulable avec promotions
- Non remboursable en € (uniquement en cagnotte)
- Perdu 60 jours après expiration de l’abonnement si non utilisé
```

### 5.3. Template – Code anniversaire (date personnelle)

```markdown
Bonjour [Prénom],

Merci pour votre message.

Le **code anniversaire Alltricks+ n’est plus lié à la date de naissance**. Il est désormais envoyé une fois par an, lors de l’anniversaire Alltricks (au mois de mai), à tous les membres Alltricks+ actifs.

Vous ne recevrez donc pas de code lié à votre date d’anniversaire.

Si vous souhaitez, je peux vous rappeler les dates exactes de l’opération Alltricks+ dès qu’elles seront communiquées.

L’équipe Alltricks
```

### 5.4. Template – Renouvellement non automatique

```markdown
Bonjour [Prénom],

Votre abonnement Alltricks+ **ne se renouvelle pas automatiquement**.

À l’expiration de votre abonnement (365 jours après activation), vous devrez le renouveler manuellement si vous souhaitez continuer à profiter des avantages.

Vous recevrez un email de rappel quelques jours avant l’expiration pour vous permettre de renouveler facilement depuis votre Espace client.

**Bon à savoir :** Votre cashback non utilisé sera perdu 60 jours après l’expiration de votre abonnement.

L’équipe Alltricks
```

### 5.5. Template – Marketplace exclus

```markdown
Bonjour [Prénom],

Les avantages Alltricks+ s’appliquent **uniquement aux produits vendus et expédiés par Alltricks**.

Pour les articles vendus par nos vendeurs partenaires (Marketplace), les avantages suivants ne s’appliquent pas :

- Livraison gratuite
- Cashback
- Retours 100 jours
- Code anniversaire Alltricks -10%

Vous pouvez identifier les produits Marketplace par la mention "Vendu par [Nom du vendeur]" sur la fiche produit.

L’équipe Alltricks
```

### 5.6. Template – Cashback non visible

```markdown
Bonjour [Prénom],

Votre cashback Alltricks+ apparaît dans votre cagnotte **après l’expédition de votre commande**, et non à la validation.

Pour vérifier votre cashback :

1. Connectez-vous à votre Espace client
2. Accédez à la section "Mon cashback" ou "Ma cagnotte"
3. Vous y verrez le montant disponible et l’historique

**Délai habituel :** Le cashback est crédité sous 24 à 48h après l’expédition.

**Rappel :** Le cashback n’est pas remboursable en euros, il reste en cagnotte virtuelle utilisable sur vos prochaines commandes.

L’équipe Alltricks
```

---

## 6. ⚠️ Règles et Points d'Attention

**Conditions & règles métier (résumé) :**

- **Type d'offre** : abonnement annuel Alltricks+ (9,99€ TTC/an), durée 365 jours à l'activation.
- **Renouvellement** : **non automatique**, renouvellement manuel uniquement après expiration.
- **Éligibilité** : particuliers +18 ans, compte client actif, France métropolitaine (hors Corse) ou Belgique.
- **Exclusions** : professionnels, personnes morales, Marketplace (tous les avantages exclus).
- **Périmètre géographique** :
  - France métropolitaine (hors Corse) : tous avantages
  - Belgique : tous avantages **sauf cashback**
  - Autres pays : non éligibles
- **Droit de rétractation** : 14 jours, **perdu dès utilisation d'un avantage**.

**Décision (OK/KO) :**

#### ✅ CAS GO (L'IA répond seule)

| Situation                           | Exemples de demandes                                                                | Action IA                                                         |
| ----------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| **Questions générales sur l'offre** | "Qu'est-ce que Alltricks+ ?", "Quels sont les avantages ?", "Combien ça coûte ?"    | Utiliser template 5.1 (présentation standard)                     |
| **Fonctionnement du cashback**      | "Comment fonctionne le cashback ?", "Pourquoi je ne vois pas mon cashback ?"        | Utiliser template 5.2 ou 5.6 (cashback détaillé)                  |
| **Code anniversaire**               | "Quand reçois-je mon code anniversaire ?", "C'est lié à ma date de naissance ?"     | Utiliser template 5.3 (code anniversaire)                         |
| **Renouvellement**                  | "Mon abonnement se renouvelle-t-il automatiquement ?", "Comment renouveler ?"       | Utiliser template 5.4 (renouvellement)                            |
| **Marketplace et exclusions**       | "Puis-je utiliser Alltricks+ sur la Marketplace ?", "Quelles sont les exclusions ?" | Utiliser template 5.5 (Marketplace exclus)                        |
| **Conditions d'éligibilité**        | "Suis-je éligible ?", "Ça marche en Belgique ?", "Et pour les pros ?"               | Expliquer les conditions (France/Belgique, +18 ans, particuliers) |
| **Avantages détaillés**             | "Comment fonctionne la livraison gratuite ?", "C'est quoi les retours 100 jours ?"  | Détailler l'avantage concerné depuis section 5                    |

**Règle générale GO :** Toute question d'information générale sur l'offre, les avantages, les conditions ou le fonctionnement → **GO** avec template approprié.

#### ❌ CAS KO (Escalade obligatoire)

| Situation                                    | Exemples de demandes                                                            | Raison KO                                           | Action conseiller                                             |
| -------------------------------------------- | ------------------------------------------------------------------------------- | --------------------------------------------------- | ------------------------------------------------------------- |
| **Rétractation contestée**                   | "Je veux me rétracter mais vous refusez", "J'ai utilisé un avantage par erreur" | Litige commercial nécessitant vérification manuelle | Vérifier utilisation réelle des avantages + traiter selon CGV |
| **Demande de remboursement exceptionnel**    | "Remboursez-moi mon abonnement", "Je veux un geste commercial"                  | Hors pouvoir IA, décision commerciale               | Analyser le cas et décider selon politique interne            |
| **Litige juridique**                         | Mention "avocat", "plainte", "DGCCRF", "tribunal"                               | Escalade juridique obligatoire                      | Transférer au service juridique                               |
| **Suspension de compte**                     | "Mon compte Alltricks+ est suspendu", "Pourquoi je suis bloqué ?"               | Nécessite accès BDD + vérification fraude           | Vérifier raison suspension + lever si légitime                |
| **Problème technique bloquant**              | "Je ne peux pas activer mon abonnement", "Erreur de paiement récurrent"         | Nécessite accès technique/BDD                       | Débloquer techniquement + assistance activation               |
| **Demande d'accès aux données personnelles** | "Donnez-moi toutes mes données Alltricks+", "RGPD"                              | Demande légale RGPD                                 | Procédure RGPD standard                                       |

**Règle générale KO :** Toute demande nécessitant un accès BDD, une action commerciale exceptionnelle, un litige ou une vérification manuelle → **KO** avec escalade.

**Variantes / paramètres :**

- `[Prénom]` : utiliser si disponible, sinon commencer directement par la première phrase.
- Si le client demande un **cas précis** (livraison, cashback, retour), basculer sur la variante dédiée.
- Ne pas promettre de cas d’exception (remboursement, prolongation, réactivation).

**FAQ / Points d'attention :**

**Questions fréquentes :**

- **"Pourquoi mon cashback n'apparaît pas ?"** → Le cashback est crédité après expédition, pas à la validation de commande.
- **"Puis-je utiliser Alltricks+ pour la Marketplace ?"** → Non, tous les avantages sont exclus pour les produits vendus par des vendeurs partenaires.
- **"Mon abonnement se renouvelle-t-il automatiquement ?"** → Non, le renouvellement est manuel uniquement.
- **"Puis-je me faire rembourser mon cashback en euros ?"** → Non, le cashback reste en cagnotte virtuelle, non remboursable en argent.
- **"Les retours 100 jours donnent-ils un remboursement ?"** → Non, uniquement un avoir remboursable.
- **"Le code anniversaire est-il lié à ma date de naissance ?"** → Non, depuis juin 2024, il est envoyé en mai lors de l'anniversaire Alltricks.

**Cas particuliers :**

- **Belgique** : tous les avantages sauf le cashback
- **Corse & DOM-TOM** : non éligibles
- **Professionnels** : non éligibles (offre réservée aux particuliers)
- **Droit de rétractation** : perdu dès la première utilisation d'un avantage

**Exclusions livraison gratuite :**

- France Express (livraison le lendemain)
- Mondial Relay XL (colis volumineux)
- Livraison RDV dimanche
- Colis volumineux en express

**Historique :**

| Version | Date    | Modification                          |
| ------- | ------- | ------------------------------------- |
| v2.0    | 2025-01 | Mise à jour offre + avantages actuels |
| v2.1    | 2025-01 | Ajout FAQ et points d'attention       |

---

## 7. 🔗 Ressources et Liens

| Ressource       | URL                                            |
| --------------- | ---------------------------------------------- |
| Page Alltricks+ | https://www.alltricks.fr/alltricks-plus        |
| Mon compte      | https://www.alltricks.fr/mon-compte            |
| Mes Avoirs      | https://www.alltricks.fr/mon-compte/mes-avoirs |
| CGV Alltricks+  | https://www.alltricks.fr/cgv-alltricks-plus    |
