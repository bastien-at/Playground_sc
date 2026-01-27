# 📦 PLAYBOOKS LIVRAISON - Format IA-Ready

> **Thématique** : Suivi et Gestion de la Livraison  
> **Playbooks** : PLB-LIV-001 à PLB-LIV-006

---

## PLB-LIV-001 - Suivi de commande

**Catégorie** : 2. MES COMMANDES ET RETOURS  
**Sous-catégorie** : 2.1 Suivi livraison  
**Priorité** : P1  
**Tags** : suivi, tracking, colis, livraison, ou est ma commande, expedition, transporteur, statut, quand, reception, numero de suivi  
**Version** : v1.0

---

### 1. Intention(s) couverte(s)

- "Où en est ma commande ?"
- "Je n'ai pas reçu de nouvelles de mon colis"
- "Quand vais-je recevoir ma commande ?"
- "Mon colis est-il expédié ?"
- "Pouvez-vous me donner le numéro de suivi ?"

### 2. Conditions & règles métier (résumé)

- Objectif principal : rediriger le client vers les outils self-service pour suivre sa commande et lui expliquer comment accéder aux informations de suivi.
- L’IA n’a **pas accès** au statut réel de la commande ni au tracking transporteur.
- Le suivi est disponible dans **Mes Commandes & Retours** de l'Espace client.
- Un e-mail avec le numéro de suivi est envoyé dès l’expédition.

### 3. Décision IA

- **L’IA peut répondre seule ?**  
  Oui, pour expliquer où trouver le suivi et comment l’utiliser.

- **Accès données nécessaire ?**  
  Non, la réponse reste générale et orientée self-service.

- **Cas à escalader d’office** :
  - Client mentionne un retard important (> 7 jours) ou plusieurs relances.
  - Ton très mécontent / agressif.
  - Référence explicite à un litige / à un avocat / à une plainte.

### 4. Template(s) de réponse

#### 4.1. Template standard – Produit Alltricks

```markdown
Bonjour [Prénom],

Pour suivre votre commande, connectez-vous à votre espace client Alltricks :

1. Rendez-vous sur https://www.alltricks.fr/mon-compte/mes-commandes
2. Cliquez sur la commande concernée
3. Vous y trouverez le statut de votre commande et le lien de suivi transporteur

📦 **Les étapes de votre commande :**

- **Commande** : Votre commande est validée
- **Préparation** : Nos équipes préparent votre colis
- **Expédition** : Votre colis est confié au transporteur
- **En livraison** : Votre colis est en cours d'acheminement
- **Livré** : Votre colis vous a été remis

Vous recevez un e-mail avec le numéro de suivi dès l'expédition de votre commande.

À très vite sur les routes !
L'équipe Alltricks
```

#### 4.2. Template – Vendeur partenaire

```markdown
Bonjour [Prénom],

Pour les articles expédiés par un vendeur partenaire, le suivi de livraison est communiqué directement par le vendeur.

Pour obtenir des informations :

1. Connectez-vous à votre espace client : https://www.alltricks.fr/mon-compte/mes-commandes
2. Sélectionnez l'article concerné
3. Cliquez sur "Contacter le vendeur"
4. Sélectionnez le motif de votre demande

Le vendeur vous répondra directement dans votre messagerie avec les informations de suivi.

L'équipe Alltricks
```

### 5. Variantes / paramètres

- `[Prénom]` : utiliser si disponible, sinon commencer directement par la première phrase.
- `[numero_commande]` : ne jamais inventer.
  - Si le numéro est présent dans l’email client, il peut être repris dans la réponse.
  - Sinon rester générique ("votre commande").
- Ne jamais donner de date de livraison précise ni de promesse ("demain"), seulement des informations sur **où suivre** la commande.

### 6. Historique

| Version | Date    | Modification                  |
| ------- | ------- | ----------------------------- |
| v1.0    | 2025-01 | Création initiale du playbook |

---

## PLB-LIV-002 - Colis indiqué livré mais non reçu

**Catégorie** : 2. MES COMMANDES ET RETOURS  
**Sous-catégorie** : 2.1 Suivi livraison  
**Priorité** : P1  
**Tags** : pas recu, livre mais, jamais recu, colis perdu, vole, disparu, non livre, litige, marque livre  
**Version** : v1.0

---

### 1. Intention(s) couverte(s)

- "Mon colis est marqué livré mais je n'ai rien reçu"
- "Je n'ai jamais reçu ma commande"
- "Le transporteur dit que c'est livré mais ce n'est pas vrai"
- "Mon colis a été volé / perdu"

### 2. Conditions & règles métier (résumé)

- Objectif : guider le client qui conteste la réception de son colis vers les **vérifications préalables** et la **procédure de réclamation** appropriée.
- L’IA ne peut **pas confirmer** la livraison réelle ni accéder au détail du tracking.
- Vérifications standard à demander avant ouverture d’enquête (voisins, boîte aux lettres, foyer).
- Différence de traitement entre **produit Alltricks** et **vendeur partenaire**.

### 3. Décision IA

- **L’IA peut répondre seule ?**  
  Oui, pour guider sur les vérifications et la marche à suivre.

- **Accès données nécessaire ?**  
  Non, mais l’ouverture d’enquête nécessite ensuite une action humaine.

- **Cas à escalader d’office** :
  - Client a déjà effectué toutes les vérifications.
  - Mention explicite de "vol", "arnaque", "plainte".
  - Ton très mécontent / menace de recours.

### 4. Template(s) de réponse

#### 4.1. Template standard – Produit Alltricks

```markdown
Bonjour [Prénom],

Je comprends votre inquiétude concernant votre colis indiqué comme livré.

**Avant d'ouvrir une enquête, nous vous invitons à vérifier :**

- Auprès de vos voisins ou du gardien de votre immeuble
- Dans votre boîte aux lettres, local à colis ou devant votre porte
- Si une autre personne de votre foyer a pu réceptionner le colis

**Si vous aviez choisi une livraison en point relais :**
Votre colis peut vous attendre au point relais indiqué. Présentez-vous muni d'une pièce d'identité pour le récupérer.

**Si après ces vérifications vous ne retrouvez pas votre colis :**
Répondez à ce message en confirmant :

1. Votre numéro de commande
2. Votre adresse de livraison (ou code postal)
3. Le transporteur concerné (si visible)

Nous ouvrirons une enquête auprès du transporteur et reviendrons vers vous dans les meilleurs délais.

L'équipe Alltricks
```

#### 4.2. Template – Vendeur partenaire

```markdown
Bonjour [Prénom],

Pour un article expédié par un vendeur partenaire, nous vous invitons à signaler ce problème directement au vendeur :

1. Connectez-vous à votre espace client : https://www.alltricks.fr/mon-compte/mes-commandes
2. Sélectionnez l'article concerné
3. Cliquez sur "Contacter le vendeur"
4. Sélectionnez le motif approprié et décrivez la situation

Le vendeur prendra en charge votre réclamation et vous répondra dans votre messagerie.

L'équipe Alltricks
```

### 5. Variantes / paramètres

- Adapter le paragraphe sur le **point relais** uniquement si le mode de livraison le suggère.
- Si le client indique avoir déjà tout vérifié, **ne pas répéter** ces vérifications et orienter directement vers la réclamation.
- Ton particulièrement empathique si le client parle de "vol" ou "arnaque".

### 6. Historique

| Version | Date    | Modification                  |
| ------- | ------- | ----------------------------- |
| v1.0    | 2025-01 | Création initiale du playbook |

---

## PLB-LIV-003 - Retard de livraison

**Catégorie** : 2. MES COMMANDES ET RETOURS  
**Sous-catégorie** : 2.2 Retard livraison  
**Priorité** : P2  
**Tags** : retard, en retard, delai depasse, toujours pas recu, attente, quand livraison, urgent, pas livre  
**Version** : v1.0

---

### 1. Intention(s) couverte(s)

- "Ma commande devait arriver hier, toujours rien"
- "Ça fait X jours que j'attends"
- "C'est urgent, quand vais-je recevoir mon colis ?"
- "Le délai annoncé est dépassé"

### 2. Conditions & règles métier (résumé)

- Objectif : informer le client sur les causes possibles d'un retard et l'orienter vers les bons outils pour suivre sa commande ou signaler un problème.
- Les délais peuvent varier selon : période (fêtes, soldes), aléas logistiques, disponibilité produit ("livraison différée").
- L’IA ne doit jamais donner de promesse de date précise, seulement rappeler les **délais habituels** et orienter vers le suivi.

### 3. Décision IA

- **L’IA peut répondre seule ?**  
  Oui, pour expliquer les causes possibles et les prochaines étapes.

- **Accès données nécessaire ?**  
  Non, mais une enquête nécessite ensuite une intervention humaine.

- **Cas à escalader d’office** :
  - Retard important mentionné (par ex. > 7 jours) ou suivi bloqué depuis plusieurs jours.
  - Ton très mécontent / urgent (cadeau, événement daté).

### 4. Template(s) de réponse

#### 4.1. Template standard – Produit Alltricks

```markdown
Bonjour [Prénom],

Je suis désolé pour ce retard dans la livraison de votre commande.

**Pour vérifier le statut actuel de votre colis :**

1. Connectez-vous à votre espace client : https://www.alltricks.fr/mon-compte/mes-commandes
2. Cliquez sur votre commande pour accéder au suivi transporteur

**Causes possibles d'un retard :**

- Forte activité du transporteur (périodes de fêtes, soldes)
- Aléas logistiques (conditions météo, incidents transport)
- Produit en cours de réapprovisionnement (si "livraison différée" était indiqué)

**Si le retard persiste ou si le suivi est bloqué depuis plusieurs jours :**
Répondez à ce message en précisant :

1. Votre numéro de commande
2. Depuis quand le suivi est bloqué (date du dernier mouvement)
3. Le transporteur (si visible)

Nous nous rapprocherons du transporteur pour vous tenir informé.

L'équipe Alltricks
```

#### 4.2. Template – Vendeur partenaire

```markdown
Bonjour [Prénom],

Pour un article expédié par un vendeur partenaire, nous vous invitons à le contacter directement :

1. Connectez-vous à votre espace client : https://www.alltricks.fr/mon-compte/mes-commandes
2. Sélectionnez l'article concerné
3. Cliquez sur "Contacter le vendeur"
4. Décrivez le retard rencontré

Le vendeur vous apportera des précisions sur l'acheminement de votre commande.

L'équipe Alltricks
```

### 5. Variantes / paramètres

- Si le client mentionne un contexte **urgent** (cadeau, événement daté), insister sur la possibilité de contacter rapidement le Service Client.
- Ne jamais confirmer une date de livraison précise.
- Adapter la référence à "livraison différée" si le client l’a mentionnée ou si elle est connue dans la policy associée.

### 6. Historique

| Version | Date    | Modification                  |
| ------- | ------- | ----------------------------- |
| v1.0    | 2025-01 | Création initiale du playbook |

---

## PLB-LIV-004 - Modes et délais de livraison

**Catégorie** : 2. MES COMMANDES ET RETOURS  
**Sous-catégorie** : 2.1 Suivi livraison  
**Priorité** : P3  
**Tags** : livraison, mode livraison, delai, point relais, domicile, magasin, gratuit, frais de port, combien de temps, livraison express, same day  
**Version** : v1.0

---

### 1. Intention(s) couverte(s)

- "Quels sont les modes de livraison ?"
- "Livrez-vous en point relais ?"
- "Combien coûte la livraison ?"
- "La livraison est-elle gratuite ?"
- "Livrez-vous à l'étranger ?"

### 2. Conditions & règles métier (résumé)

- Objectif : informer sur les **options de livraison**, les **délais** et les **conditions de gratuité**.
- Différencier France métropolitaine / international / Alltricks+.
- Certains modes spécifiques (France Express, Mondial Relay XL, Chronopost RDV) ne peuvent pas être gratuits.

### 3. Décision IA

- **L’IA peut répondre seule ?**  
  Oui, en donnant une vision générale et en renvoyant vers la page Livraisons.

- **Accès données nécessaire ?**  
  Non, les informations sont générales et publiques.

- **Cas à escalader d’office** :
  - Question très spécifique liée à une adresse ou un pays exotique non couvert.

### 4. Template(s) de réponse

#### 4.1. Template – France métropolitaine

```markdown
Bonjour [Prénom],

Voici les modes de livraison disponibles chez Alltricks :

📍 **Point relais**
Recevez votre commande dans le point relais le plus proche de chez vous.

🏠 **Livraison à domicile**
Recevez votre commande directement chez vous.

🏪 **Livraison en magasin Alltricks**
Faites livrer gratuitement dans l'un de nos magasins. Liste disponible sur https://www.alltricks.fr/magasins

📦 **Retrait à l'entrepôt de Châteaudun**
Venez récupérer votre commande à notre entrepôt (7 Rue des 13 Langues, 28200 Châteaudun) après réception de l'email de préparation.

⚡ **Livraison Same Day**
Livraison le jour même si commande passée avant 10h (zones limitées).

**Conditions de gratuité :**

- Livraison gratuite en point relais dès 120€ d'achat
- Livraison gratuite en magasin sans minimum
- Membres Alltricks+ : livraison gratuite sans minimum d'achat

Les options disponibles vous sont proposées lors du paiement selon votre adresse et vos articles.

Plus d'informations : https://www.alltricks.fr/livraisons

L'équipe Alltricks
```

#### 4.2. Template – Livraison internationale

```markdown
Bonjour [Prénom],

Bonne nouvelle ! Alltricks livre dans plus de 70 pays à travers le monde.

Les modes de livraison et tarifs varient selon le pays de destination. Pour connaître les options disponibles :

1. Ajoutez vos articles au panier
2. Renseignez votre adresse de livraison
3. Les options et tarifs s'afficheront automatiquement

Consultez la liste des pays desservis : https://www.alltricks.fr/livraisons

Note : Alltricks ne dispose pas de magasins à l'étranger.

L'équipe Alltricks
```

#### 4.3. Template – Client Alltricks+

```markdown
Bonjour [Prénom],

En tant que membre Alltricks+, vous bénéficiez d'avantages exclusifs :

✅ **Livraison standard GRATUITE** en point relais et à domicile, sans minimum d'achat
✅ **Livraison Express GRATUITE** dès 25€ d'achat
✅ Ces avantages sont valables pendant toute la durée de votre abonnement, sans limite de commandes

Ces avantages s'appliquent aux produits vendus et expédiés par Alltricks.

Note : Certains modes spécifiques (France Express, Mondial Relay XL, Chronopost sur RDV) ne peuvent pas être proposés gratuitement.

L'équipe Alltricks
```

**Version** : v1.0

---

### 1. Intention(s) couverte(s)

- "Je voudrais changer mon adresse de livraison"
- "J'ai fait une erreur dans l'adresse"
- "Pouvez-vous livrer à une autre adresse ?"

### 2. Conditions & règles métier (résumé)

- Objectif : expliquer les **conditions** et la **procédure** pour modifier l'adresse de livraison.
- Règles clés :
  - Modification possible tant que la commande n'est pas en préparation.
  - Pour les commandes PayPal, aucune modification possible après paiement (sécurité PayPal).
  - Le mode de livraison doit rester identique (point relais ↔ domicile impossible).

### 3. Décision IA

- **L’IA peut répondre seule ?**  
  Oui, pour expliquer les règles et les alternatives.

- **Accès données nécessaire ?**  
  Non, les règles sont générales.

- **Cas à escalader d’office** :
  - Client avec situation complexe (plusieurs modifications, changement de pays, etc.).

### 4. Template(s) de réponse

#### 4.1. Template standard

```markdown
Bonjour [Prénom],

Voici comment modifier votre adresse de livraison selon le statut de votre commande :

**Si votre commande n'est pas encore payée :**

1. Rendez-vous dans votre espace client, rubrique "Carnet d'adresses"
2. Modifiez ou ajoutez l'adresse souhaitée
3. Finalisez votre commande avec la nouvelle adresse

**Si votre commande est payée mais pas encore en préparation :**

1. Connectez-vous à "Mes Commandes & Retours" : https://www.alltricks.fr/mon-compte/mes-commandes
2. Sélectionnez votre commande
3. Vous pourrez modifier l'adresse de livraison

**⚠️ Important :**

- Le mode de livraison doit rester le même (un point relais ne peut pas être remplacé par une livraison à domicile)
- Pour les commandes PayPal : la modification n'est plus possible après validation

**Si votre commande est déjà en livraison :**
La modification n'est plus possible. Vous pouvez refuser le colis à la livraison pour qu'il nous soit retourné gratuitement.

L'équipe Alltricks
```

#### 4.2. Template – Commande PayPal

```markdown
Bonjour [Prénom],

Pour les commandes réglées via PayPal, il n'est malheureusement pas possible de modifier l'adresse de livraison après validation de la commande.

Cette restriction est liée aux conditions de sécurité PayPal.

**Alternatives possibles :**

- Si votre commande n'est pas encore expédiée : refusez le colis à la livraison, il nous sera retourné et un avoir sera créé
- Si une personne peut réceptionner à l'adresse initiale : elle pourra le faire sans procuration (domicile) ou avec procuration (point relais)

L'équipe Alltricks
```

### 5. Variantes / paramètres

- Si le client mentionne **PayPal**, utiliser prioritairement le template dédié.
- Si la commande est déjà en livraison, insister sur le refus du colis comme alternative.

### 6. Historique

| Version | Date    | Modification                  |
| ------- | ------- | ----------------------------- |
| v1.0    | 2025-01 | Création initiale du playbook |

---

## PLB-LIV-006 - Indisponibilité pour réceptionner

## 1. 🎯 Objectif

Informer le client des options disponibles s'il ne peut pas être présent pour réceptionner sa commande.

---

## 2. 🗂️ Métadonnées

| Propriété          | Valeur                                                                                                                    |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| **Identifiant**    | PLB-LIV-006                                                                                                               |
| **Catégorie**      | 2. MES COMMANDES ET RETOURS                                                                                               |
| **Sous-catégorie** | 2.1 Suivi livraison                                                                                                       |
| **Tags Clés**      | `absent`, `pas disponible`, `vacances`, `quelqu'un d'autre`, `procuration`, `tiers`, `indisponible`, `retirer à ma place` |
| **Priorité**       | P3                                                                                                                        |

---

## 3. 🔎 Conditions de Déclenchement

L'agent doit s'activer si le client indique qu'il ne pourra pas réceptionner.

**Exemples de formulations clients :**

- "Je ne serai pas là pour recevoir mon colis"
- "Mon conjoint peut-il récupérer ma commande ?"
- "Je pars en vacances, comment faire ?"

---

## 4. 📋 Informations à Identifier dans l'email

| Information                                 | Utilité                                |
| ------------------------------------------- | -------------------------------------- |
| Mode de livraison (point relais / domicile) | Adapte les conseils                    |
| Durée d'absence                             | Évalue si délai conservation suffisant |

---

## 5. 💬 Gabarits de Réponse

### 5.1. Réponse Standard

```
Bonjour [Prénom],

Voici vos options si vous n'êtes pas disponible pour réceptionner votre colis :

**📍 Pour une livraison en Point Relais :**
Une tierce personne peut retirer le colis à votre place avec :
- Une procuration écrite et signée de votre part (modèle libre)
- Votre pièce d'identité (original ou copie)
- Sa propre pièce d'identité

Le colis reste disponible au point relais pendant 14 jours environ.

**🏠 Pour une livraison à Domicile :**
- Toute personne présente à votre domicile peut réceptionner le colis (pas de procuration nécessaire)
- Si personne n'est présent, le livreur effectuera une nouvelle tentative ou déposera un avis de passage

**Si aucune solution n'est possible :**
Vous pouvez laisser le colis nous être retourné. Un avoir sera alors créé sur votre compte.

L'équipe Alltricks
```

---

## 6. ⚠️ Règles et Points d'Attention

| Situation                          | Action                                                                    |
| ---------------------------------- | ------------------------------------------------------------------------- |
| Absence > 14 jours (point relais)  | Prévenir que le colis sera retourné                                       |
| Client demande report de livraison | Dépend du transporteur, suggérer de contacter le transporteur directement |

**Points clés FAQ :**

- Point relais : procuration + 2 pièces d'identité nécessaires
- Domicile : pas de procuration, toute personne présente peut réceptionner
- Colis retourné = avoir créé automatiquement

---

## 7. 🔗 Ressources et Liens

| Ressource       | URL                                               |
| --------------- | ------------------------------------------------- |
| Mes commandes   | https://www.alltricks.fr/mon-compte/mes-commandes |
| Page Livraisons | https://www.alltricks.fr/livraisons               |
