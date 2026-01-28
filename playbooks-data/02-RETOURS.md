# 🔄 PLAYBOOKS RETOURS ET REMBOURSEMENTS - Format IA-Ready

> **Thématique** : Retours et Remboursements  
> **Playbooks** : PLB-RET-007 à PLB-RET-013

---

# PLB-RET-007 - Demande de retour standard

## 1. 🎯 Objectif

Expliquer au client la procédure de retour, les conditions d'éligibilité et le guider vers les outils self-service pour générer son étiquette de retour.

---

## 2. 🗂️ Métadonnées (ID, Catégorie, Tags, Priorité)

| Propriété          | Valeur                                                                                                                                        |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **Identifiant**    | PLB-RET-007                                                                                                                                   |
| **Catégorie**      | 2. MES COMMANDES ET RETOURS                                                                                                                   |
| **Sous-catégorie** | 2.5 Demande de retour                                                                                                                         |
| **Tags Clés**      | `retour`, `retourner`, `renvoyer`, `retractation`, `ne convient pas`, `trop grand`, `trop petit`, `mauvaise taille`, `echanger`, `rembourser` |
| **Priorité**       | P1                                                                                                                                            |

---

## 3. 🔎 Conditions de Déclenchement

Le playbook doit s'activer si le client demande à retourner un article (retour standard / rétractation) ou un remboursement lié à un retour.

**Exemples de formulations clients :**

- "Je voudrais retourner cet article"
- "Le produit ne me convient pas"
- "Comment faire pour renvoyer ma commande ?"
- "La taille ne va pas"
- "Je souhaite me faire rembourser"

---

## 4. 📋 Informations à Identifier dans l'email

| Information                          | Utilité                                                                  |
| ------------------------------------ | ------------------------------------------------------------------------ |
| Produit concerné (si mentionné)      | Adapter la réponse (conditions, retour en magasin vs renvoi colis, etc.) |
| Mention Alltricks+                   | Rappeler le délai étendu (100 jours)                                     |
| Mention vendeur partenaire           | Adapter vers la procédure « Contacter le vendeur »                       |
| Produit monté/utilisé (si mentionné) | Alerter sur un retour potentiellement refusé / décote                    |

---

## 5. 💬 Gabarits de Réponse

### 5.1. Réponse standard - Produit Alltricks

```markdown
Bonjour [Prénom],

Le produit reçu ne vous convient pas ? Pas de souci, vous disposez de **30 jours** (ou **100 jours** si vous êtes membre Alltricks+) à compter de la réception de votre commande pour effectuer un retour.

**Comment retourner votre produit ? Suivez ces 4 étapes :**

**Étape 1 : Rendez-vous sur la page Mes commandes & Retours**

1. Connectez-vous à votre espace client : https://www.alltricks.fr/mon-compte/mes-commandes
2. Cliquez sur "Retourner un article"
3. Sélectionnez dans le détail de la commande concernée le(s) produit(s) que vous souhaitez retourner

**Étape 2 : Choisissez parmi les 3 options suivantes :**

**Option 1 : Retour dans l'un de nos magasins**

- Une fois sur place, vous pourrez choisir entre un avoir ou un remboursement **sans frais**
- L'avoir est généré **immédiatement**
- Liste des magasins : https://www.alltricks.fr/magasins

**Option 2 : Échange gratuit sous forme d'avoir**

- Cet avoir, du montant des articles retournés, vous sera crédité sur votre compte
- Il vous permettra de passer une nouvelle commande
- **Sans frais de retour**

**Option 3 : Remboursement sur le moyen de paiement utilisé**

- Une participation aux frais de retour sera retenue sur le remboursement
- Le remboursement s'effectue sur le moyen de paiement initial

**Étape 3 : Suivez les instructions**
Vous obtiendrez toutes les informations nécessaires pour le retour :

- Instructions détaillées
- Étiquette de retour (si renvoi par colis)
- Numéro de retour
- **Conservez bien votre preuve de dépôt** avec le numéro de retour

**Étape 4 : Retournez les produits**
Retournez vos produits soit par renvoi colis, soit en magasin selon l'option choisie.

**Délais et traitement :**

- Un avoir sera créé sous **10 jours maximum** à compter de la prise en charge de votre colis
- Cet avoir vous permettra de recommander le produit souhaité, ou vous pourrez en demander le remboursement via votre compte client

**Conditions de retour :**

- L'article doit être dans son état d'origine
- Non monté et non utilisé
- Dans son emballage d'origine

**Délais et remboursement :**

- Acheminement vers notre entrepôt : 5 à 7 jours ouvrés
- Traitement à réception : 72h maximum
- Un avoir sera créé automatiquement (frais de retour déduits)
- Vous pourrez demander le remboursement depuis "Mes Avoirs"

Astuce : Le retour en magasin Alltricks est **gratuit** et l'avoir est généré immédiatement !

L'équipe Alltricks
```

### 5.2. Réponse - Vendeur partenaire

```markdown
Bonjour [Prénom],

Pour un produit vendu par l'un de nos vendeurs partenaires, la procédure de retour est gérée directement par le vendeur.

**Pour effectuer votre retour :**

1. Connectez-vous à votre espace client : https://www.alltricks.fr/mon-compte/mes-commandes
2. Sélectionnez la commande et le produit concerné
3. Cliquez sur "Contacter le vendeur"
4. Choisissez le motif de la demande dans le menu déroulant
5. Ajoutez un commentaire si nécessaire puis envoyez la demande

Le vendeur partenaire vous répondra par email avec les instructions de retour et sa politique de remboursement.

**Conditions de retour :**
Vous disposez également de **30 jours** pour retourner votre produit vendu par un vendeur partenaire.

L'équipe Alltricks
```

---

## 6. ⚠️ Règles et Points d'Attention

- Délai standard : **30 jours** après réception (ou **100 jours** pour les membres Alltricks+).
- Différence de traitement entre **produit Alltricks** et **vendeur partenaire**.
- Conditions produit : article neuf, non monté, non utilisé, dans son emballage d'origine.
- Si le client parle d'**échange**, orienter vers `PLB-RET-010` (pas d'échange direct, retour + nouvelle commande).
- Si le client indique que le produit est "monté" ou "utilisé", avertir que le retour peut être refusé ou faire l'objet d'une décote.

---

## 7. 🔗 Ressources et Liens

| Ressource               | URL                                               |
| ----------------------- | ------------------------------------------------- |
| Mes commandes & Retours | https://www.alltricks.fr/mon-compte/mes-commandes |
| Nos magasins            | https://www.alltricks.fr/magasins                 |

---

# PLB-RET-008 - Retour vélo / article volumineux

## 1. 🎯 Objectif

Expliquer la procédure spécifique pour retourner un vélo ou un article volumineux (hors-gabarit).

---

## 2. 🗂️ Métadonnées (ID, Catégorie, Tags, Priorité)

| Propriété          | Valeur                                                                                          |
| ------------------ | ----------------------------------------------------------------------------------------------- |
| **Identifiant**    | PLB-RET-008                                                                                     |
| **Catégorie**      | 2. MES COMMANDES ET RETOURS                                                                     |
| **Sous-catégorie** | 2.5 Demande de retour                                                                           |
| **Tags Clés**      | `retour vélo`, `vélo`, `volumineux`, `hors gabarit`, `porte-vélo`, `home trainer`, `gros colis` |
| **Priorité**       | P2                                                                                              |

## 3. 🔎 Conditions de Déclenchement

L'agent doit s'activer si le client veut retourner un vélo ou un article volumineux.

**Exemples de formulations clients :**

- "Comment retourner mon vélo ?"
- "Je veux renvoyer mon porte-vélo"
- "Le vélo ne me convient pas"

## 4. 📋 Informations à Identifier dans l'email

| Information                                           | Utilité               |
| ----------------------------------------------------- | --------------------- |
| Type de produit (vélo complet, accessoire volumineux) | Adapte la procédure   |
| Mention vendeur partenaire                            | Redirige vers vendeur |

## 5. 💬 Gabarits de Réponse

### 5.1. Réponse Standard - Vélo ou Article Volumineux

```
Bonjour [Prénom],

Pour le retour d'un vélo ou d'un article volumineux (poids ≥ 30kg ou dimensions ≥ 150cm), voici la procédure :

**Option 1 : Retour en magasin Alltricks (GRATUIT)**
Déposez votre vélo dans l'un de nos magasins. L'avoir sera généré immédiatement.
Liste des magasins : https://www.alltricks.fr/magasins

**Option 2 : Retour via transporteur**
1. Connectez-vous à "Mes Commandes & Retours" : https://www.alltricks.fr/mon-compte/mes-commandes
2. Cliquez sur "Retourner un article"
3. Le système générera automatiquement une étiquette adaptée aux colis volumineux

**⚠️ Pour un vélo complet :**
Avant d'effectuer le retour, répondez à ce message pour que nous puissions valider la meilleure solution.
Nous pourrons organiser le retour via France Express (70€, assurance incluse) ou vous proposer une alternative adaptée.

**Conditions :**
- Vélo non monté et non utilisé
- Dans son emballage d'origine

L'équipe Alltricks
```

## 6. ⚠️ Règles et Points d'Attention

| Situation                   | Action                                                  |
| --------------------------- | ------------------------------------------------------- |
| Vélo complet                | Recommander de contacter le service client avant retour |
| Client refuse le coût (70€) | Rappeler l'option gratuite en magasin                   |

**Points clés FAQ :**

- Article hors-gabarit : poids ≥ 30kg OU dimensions ≥ 150cm
- Vélo complet : contacter le service client avant retour
- Retour vélo = 70€ via France Express (ou gratuit en magasin)
- Étiquette spécifique générée automatiquement pour hors-gabarit

## 7. 🔗 Ressources et Liens

| Ressource     | URL                                               |
| ------------- | ------------------------------------------------- |
| Mes commandes | https://www.alltricks.fr/mon-compte/mes-commandes |
| Nos magasins  | https://www.alltricks.fr/magasins                 |

---

# PLB-RET-009 - Suivi retour et avoir remboursable

## 1. 🎯 Objectif

Informer le client sur les délais de traitement de son retour et la procédure pour obtenir son avoir remboursable.

## 2. 🗂️ Métadonnées (ID, Catégorie, Tags, Priorité)

| Propriété          | Valeur                                                                                          |
| ------------------ | ----------------------------------------------------------------------------------------------- |
| **Identifiant**    | PLB-RET-009                                                                                     |
| **Catégorie**      | 2. MES COMMANDES ET RETOURS                                                                     |
| **Sous-catégorie** | 2.6 Suivre mon retour                                                                           |
| **Tags Clés**      | `suivi retour`, `retour reçu`, `remboursement`, `avoir`, `quand remboursé`, `traitement retour` |
| **Priorité**       | P2                                                                                              |

## 3. 🔎 Conditions de Déclenchement

L'agent doit s'activer si le client demande des nouvelles de son retour ou de son remboursement.

**Exemples de formulations clients :**

- "Avez-vous reçu mon retour ?"
- "Quand serai-je remboursé ?"
- "Mon avoir n'est pas encore créé"
- "Où en est mon remboursement ?"

## 4. 📋 Informations à Identifier dans l'email

| Information                | Utilité                    |
| -------------------------- | -------------------------- |
| Date de dépôt mentionnée   | Évalue si délai normal     |
| Preuve de dépôt mentionnée | Rassure sur la traçabilité |

## 5. 💬 Gabarits de Réponse

### 5.1. Réponse Standard

```
Bonjour [Prénom],

Voici les informations sur le suivi de votre retour :

**📦 Délais de traitement :**
- Acheminement vers notre entrepôt : **5 à 7 jours ouvrés** après dépôt
- Traitement à réception : **72 heures maximum**
- Remboursement après demande : **5 jours ouvrés maximum**

**📍 Comment suivre votre retour :**
1. Connectez-vous à "Mes Commandes & Retours" : https://www.alltricks.fr/mon-compte/mes-commandes
2. Consultez le statut de votre retour

Vous recevrez une notification dans "Mes messages" une fois votre retour traité.

**💰 Comment obtenir votre remboursement depuis votre avoir :**
Une fois l'avoir créé :
1. Rendez-vous dans "Mes Avoirs" : https://www.alltricks.fr/mon-compte/mes-avoirs
2. Cliquez sur "Demander le remboursement"

Le remboursement sera effectué sur le mode de paiement initial sous 5 jours ouvrés.

**⚠️ Important :** Conservez précieusement votre preuve de dépôt jusqu'à réception du remboursement.

Si après 72h suivant la réception de votre colis par nos services vous n'avez pas de nouvelle, répondez à ce message en précisant votre numéro de commande et, si possible, la preuve de dépôt.

L'équipe Alltricks
```

## 6. ⚠️ Règles et Points d'Attention

| Situation                                    | Action                                                   |
| -------------------------------------------- | -------------------------------------------------------- |
| Client dit avoir déposé il y a + de 10 jours | Demander de répondre dans le fil avec la preuve de dépôt |
| Client n'a pas de preuve de dépôt            | Rappeler l'importance de la conserver                    |

**Points clés FAQ :**

- Acheminement : 5-7 jours ouvrés
- Traitement : 72h max après réception
- Remboursement de l'avoir : 5 jours ouvrés max
- Preuve de dépôt = indispensable en cas de litige

## 7. 🔗 Ressources et Liens

| Ressource               | URL                                               |
| ----------------------- | ------------------------------------------------- |
| Mes commandes & Retours | https://www.alltricks.fr/mon-compte/mes-commandes |
| Mes Avoirs              | https://www.alltricks.fr/mon-compte/mes-avoirs    |

---

# PLB-RET-010 - Échange de produit

## 1. 🎯 Objectif

Expliquer au client qu'il n'y a pas d'échange direct chez Alltricks et lui présenter la procédure alternative (retour + nouvelle commande).

## 2. 🗂️ Métadonnées (ID, Catégorie, Tags, Priorité)

| Propriété          | Valeur                                                                         |
| ------------------ | ------------------------------------------------------------------------------ |
| **Identifiant**    | PLB-RET-010                                                                    |
| **Catégorie**      | 2. MES COMMANDES ET RETOURS                                                    |
| **Sous-catégorie** | 2.5 Demande de retour                                                          |
| **Tags Clés**      | `échange`, `échanger`, `autre taille`, `autre couleur`, `remplacer`, `changer` |
| **Priorité**       | P2                                                                             |

## 3. 🔎 Conditions de Déclenchement

L'agent doit s'activer si le client demande un échange de produit.

**Exemples de formulations clients :**

- "Je voudrais échanger contre une autre taille"
- "Pouvez-vous m'envoyer une autre couleur ?"
- "Je veux le même produit mais en M au lieu de L"

## 4. 📋 Informations à Identifier dans l'email

| Information                 | Utilité              |
| --------------------------- | -------------------- |
| Produit souhaité en échange | Permet de conseiller |
| Mention vendeur partenaire  | Adapte la procédure  |

## 5. 💬 Gabarits de Réponse

### 5.1. Réponse Standard

```
Bonjour [Prénom],

Vous souhaitez échanger votre produit ? Chez Alltricks, nous vous proposons l'**échange gratuit sous forme d'avoir** !

Voici la marche à suivre pour obtenir l'article souhaité :

**Étape 1 : Initiez votre retour**
1. Connectez-vous à "Mes Commandes & Retours" : https://www.alltricks.fr/mon-compte/mes-commandes
2. Sélectionnez l'article et cliquez sur "Retourner un article"
3. Imprimez l'étiquette et déposez le colis

**Étape 2 : Passez une nouvelle commande**
Vous pouvez commander le nouvel article immédiatement, sans attendre le traitement du retour.

**Étape 3 : Utilisez votre avoir ou demandez le remboursement**
Une fois le retour traité, un avoir sera créé. Vous pourrez :
- L'utiliser sur une prochaine commande
- Ou demander son remboursement depuis "Mes Avoirs"

💡 **Astuce** : Si vous êtes pressé, passez votre nouvelle commande dès maintenant. L'avoir du retour pourra être remboursé ensuite.

L'équipe Alltricks
```

### 5.2. Réponse - Vendeur Partenaire

```
Bonjour [Prénom],

Pour un article expédié par un vendeur partenaire, la procédure d'échange dépend de la politique du vendeur.

Depuis votre commande, utilisez "Contacter le vendeur" pour connaître les options possibles :
1. Connectez-vous à "Mes Commandes & Retours"
2. Sélectionnez l'article concerné
3. Cliquez sur "Contacter le vendeur"

Le vendeur vous indiquera sa procédure et vous remboursera sur le mode de paiement initial si un retour est effectué.

L'équipe Alltricks
```

## 6. ⚠️ Règles et Points d'Attention

| Situation                             | Action                                              |
| ------------------------------------- | --------------------------------------------------- |
| Client insiste pour un échange direct | Réexpliquer que ce n'est pas possible techniquement |
| Produit souhaité en rupture           | Suggérer de s'inscrire à l'alerte disponibilité     |

**Points clés FAQ :**

- Pas d'échange direct possible chez Alltricks
- Procédure : retour → avoir → nouvelle commande
- Nouvelle commande possible avant réception du retour
- Vendeur partenaire : politique propre au vendeur

## 7. 🔗 Ressources et Liens

| Ressource               | URL                                               |
| ----------------------- | ------------------------------------------------- |
| Mes commandes & Retours | https://www.alltricks.fr/mon-compte/mes-commandes |
| Mes Avoirs              | https://www.alltricks.fr/mon-compte/mes-avoirs    |

---

# PLB-RET-011 - Délais de remboursement d'un avoir

## 1. 🎯 Objectif

Informer le client sur les délais de remboursement d'un avoir selon le mode de paiement utilisé.

## 2. 🗂️ Métadonnées (ID, Catégorie, Tags, Priorité)

| Propriété          | Valeur                                                                                                 |
| ------------------ | ------------------------------------------------------------------------------------------------------ |
| **Identifiant**    | PLB-RET-011                                                                                            |
| **Catégorie**      | 3. PAIEMENT ET REMBOURSEMENT                                                                           |
| **Sous-catégorie** | 3.3 Question à propos d'un remboursement                                                               |
| **Tags Clés**      | `délai remboursement`, `quand remboursé`, `pas reçu remboursement`, `CB`, `virement`, `carte bancaire` |
| **Priorité**       | P2                                                                                                     |

## 3. 🔎 Conditions de Déclenchement

L'agent doit s'activer si le client demande des précisions sur les délais de remboursement.

**Exemples de formulations clients :**

- "Quand vais-je être remboursé ?"
- "Le remboursement n'apparaît pas sur mon compte"
- "Ça fait X jours que j'attends mon remboursement"

## 4. 📋 Informations à Identifier dans l'email

| Information                          | Utilité           |
| ------------------------------------ | ----------------- |
| Mode de paiement mentionné           | Adapte les délais |
| Carte expirée / changement de banque | Cas particulier   |

## 5. 💬 Gabarits de Réponse

### 5.1. Réponse Standard

```
Bonjour [Prénom],

Voici les délais de remboursement d'un avoir chez Alltricks :

**⏱️ Délais généraux :**
- Traitement de la demande : **5 jours ouvrés maximum** après votre demande de remboursement depuis l'avoir
- Apparition sur compte bancaire (CB) : **2 à 3 jours ouvrés supplémentaires**

**💳 Cas particuliers :**

**Carte à débit différé :**
Le remboursement apparaîtra à la prochaine date de mouvement de votre carte définie avec votre banque.

**Carte expirée ou opposée :**
Pas d'inquiétude ! Le remboursement sera automatiquement crédité sur votre compte bancaire, même si la carte a changé entre-temps.

**Changement de banque :**
Mettez à jour vos coordonnées bancaires (IBAN/BIC) dans "Mes moyens de paiement" de votre espace client pour recevoir le virement.

**Si le délai semble dépassé :**
Répondez à ce message en précisant votre numéro de commande : nous pourrons vérifier le statut et vous fournir un justificatif si besoin.

L'équipe Alltricks
```

## 6. ⚠️ Règles et Points d'Attention

| Situation               | Action                                             |
| ----------------------- | -------------------------------------------------- |
| Carte expirée           | Rassurer : remboursement automatique sur le compte |
| Délai > 10 jours ouvrés | Suggérer de contacter le service client            |

**Points clés FAQ :**

- Délai max : 5 jours ouvrés + 2-3 jours CB
- Carte expirée/opposée : remboursement automatique sur le compte
- Débit différé : apparition à la prochaine date de mouvement

## 7. 🔗 Ressources et Liens

| Ressource              | URL                                    |
| ---------------------- | -------------------------------------- |
| Mes moyens de paiement | Espace client > Mes moyens de paiement |

---

# PLB-RET-012 - Remboursement Oney

## 1. 🎯 Objectif

Expliquer au client comment fonctionne le remboursement lorsqu'il a payé avec Oney (paiement en plusieurs fois).

## 2. 🗂️ Métadonnées (ID, Catégorie, Tags, Priorité)

| Propriété          | Valeur                                                                       |
| ------------------ | ---------------------------------------------------------------------------- |
| **Identifiant**    | PLB-RET-012                                                                  |
| **Catégorie**      | 3. PAIEMENT ET REMBOURSEMENT                                                 |
| **Sous-catégorie** | 3.3 Question à propos d'un remboursement                                     |
| **Tags Clés**      | `oney`, `remboursement oney`, `mensualité`, `3x`, `4x`, `10x`, `financement` |
| **Priorité**       | P3                                                                           |

## 3. 🔎 Conditions de Déclenchement

L'agent doit s'activer si le client a payé en plusieurs fois avec Oney et demande un remboursement.

**Exemples de formulations clients :**

- "J'ai payé en 4x, comment sera le remboursement ?"
- "Mes mensualités Oney vont-elles être annulées ?"
- "Je veux un remboursement sur mon paiement Oney"

## 4. 📋 Informations à Identifier dans l'email

| Information                                      | Utilité                                 |
| ------------------------------------------------ | --------------------------------------- |
| Montant demandé / remboursement total ou partiel | Expliquer l'impact sur les mensualités  |
| Mensualités déjà prélevées mentionnées           | Expliquer le remboursement sur la carte |
| Problème technique / question financement        | Rediriger vers Oney si besoin           |

## 5. 💬 Gabarits de Réponse

### 5.1. Réponse Standard

```
Bonjour [Prénom],

Pour un paiement effectué avec Oney (3x, 4x ou 10x), voici comment fonctionne le remboursement de votre avoir :

**🔄 Processus :**
1. Vous demandez le remboursement de votre avoir depuis votre espace client
2. Nous transmettons automatiquement la demande à Oney
3. Oney ajuste vos mensualités en commençant par la dernière

**💰 Selon le montant remboursé :**
- **Remboursement partiel** : réduction des dernières mensualités
- **Remboursement total** : annulation des mensualités restantes

**💳 Si des mensualités ont déjà été prélevées :**
Oney vous remboursera directement sur la carte bancaire utilisée lors du paiement.

**📧 Vous recevrez :**
- Un email d'Oney détaillant les ajustements
- L'information sera aussi visible dans votre espace client Oney

**Exemple concret (paiement 4x de 100€) :**
- Remboursement de 15€ → déduit de la dernière mensualité
- Remboursement de 30€ → mensualité 4 annulée + mensualité 3 réduite de 5€
- Remboursement de 95€ → mensualités 2, 3, 4 annulées + 20€ remboursés sur votre CB

**📞 Pour toute question sur votre financement :**
Contactez Oney directement : 3670 (0.15€/min)
Ou via votre espace client Oney.

L'équipe Alltricks
```

## 6. ⚠️ Règles et Points d'Attention

| Situation                             | Action                                |
| ------------------------------------- | ------------------------------------- |
| Question détaillée sur le financement | Rediriger vers Oney (3670)            |
| Client a changé de carte              | Oney gère directement, contacter Oney |

**Points clés FAQ :**

- Remboursement transmis automatiquement à Oney
- Oney ajuste de la dernière mensualité vers la première
- Mensualités déjà prélevées = remboursement sur CB
- Contact Oney : 3670

## 7. 🔗 Ressources et Liens

| Ressource           | URL                           |
| ------------------- | ----------------------------- |
| Espace client Oney  | https://www.oney.fr           |
| Service client Oney | 3670 (0.15€/min + prix appel) |

---

# PLB-RET-013 - Frais de retour

## 1. 🎯 Objectif

Informer le client sur les frais de retour et les options pour les éviter.

## 2. 🗂️ Métadonnées (ID, Catégorie, Tags, Priorité)

| Propriété          | Valeur                                                                               |
| ------------------ | ------------------------------------------------------------------------------------ |
| **Identifiant**    | PLB-RET-013                                                                          |
| **Catégorie**      | 2. MES COMMANDES ET RETOURS                                                          |
| **Sous-catégorie** | 2.5 Demande de retour                                                                |
| **Tags Clés**      | `frais de retour`, `retour gratuit`, `coût retour`, `payant`, `frais de port retour` |
| **Priorité**       | P3                                                                                   |

## 3. 🔎 Conditions de Déclenchement

L'agent doit s'activer si le client pose une question sur les frais de retour.

**Exemples de formulations clients :**

- "Les retours sont-ils gratuits ?"
- "Combien coûte un retour ?"
- "Le retour est-il à ma charge ?"

## 4. 📋 Informations à Identifier dans l'email

| Information                             | Utilité                                                   |
| --------------------------------------- | --------------------------------------------------------- |
| Produit Alltricks vs vendeur partenaire | Adapter la réponse (frais Alltricks vs politique vendeur) |
| Statut Alltricks+ mentionné             | Clarifier que les frais s'appliquent aussi                |
| Proximité d'un magasin mentionnée       | Mettre en avant l'option gratuite en magasin              |

## 5. 💬 Gabarits de Réponse

### 5.1. Réponse Standard - Produit Alltricks

```
Bonjour [Prénom],

Voici les informations sur les frais de retour chez Alltricks :

**Pour les produits vendus et expédiés par Alltricks :**

Lors de votre demande de retour sur "Mes Commandes & Retours", vous aurez le choix entre 3 options :

**OPTION 1 : Retour dans l'un de nos 9 magasins - GRATUIT**
- Déposez votre article dans un **magasin Alltricks**
- **Aucuns frais de retour**
- L'avoir est généré **immédiatement** au moment du dépôt
- Vous pourrez choisir entre un avoir ou un remboursement
- Liste des magasins : https://www.alltricks.fr/magasins

**OPTION 2 : Échange gratuit sous forme d'avoir - GRATUIT**
- Cet avoir, du montant des articles retournés, vous sera crédité sur votre compte
- **Aucuns frais de retour** avec cette option
- Vous permettra de passer une nouvelle commande

**OPTION 3 : Remboursement sur le moyen de paiement utilisé - PAYANT**
- Une **participation aux frais de retour sera retenue** sur le remboursement
- Les frais sont automatiquement déduits lors de la création de l'avoir
- S'applique à tous les clients, y compris Alltricks+

**Retour pris en charge par Alltricks (GRATUIT) :**
- En cas de produit défectueux ou d'erreur de notre part
- Aucuns frais ne vous seront facturés

**Pour les produits vendus par un vendeur partenaire :**
La politique de frais de retour est propre à chaque vendeur. Utilisez "Contacter le vendeur" dans votre commande.

L'équipe Alltricks
```

---

## 6. ⚠️ Règles et Points d'Attention

| Situation                                | Action                                                   |
| ---------------------------------------- | -------------------------------------------------------- |
| Client Alltricks+ demande retour gratuit | Préciser que les frais s'appliquent aussi aux Alltricks+ |
| Produit défectueux                       | Retour pris en charge par Alltricks                      |
| Client proche d'un magasin               | Mettre en avant le retour gratuit en magasin             |

**Points clés FAQ :**

- Retour standard = frais déduits de l'avoir
- Retour en magasin = GRATUIT + avoir immédiat
- Alltricks+ = frais de retour aussi
- Vendeur partenaire = politique propre au vendeur

---

## 7. 🔗 Ressources et Liens

| Ressource     | URL                                               |
| ------------- | ------------------------------------------------- |
| Nos magasins  | https://www.alltricks.fr/magasins                 |
| Mes commandes | https://www.alltricks.fr/mon-compte/mes-commandes |
