# 💳 PLAYBOOKS PAIEMENT - Format IA-Ready

> **Thématique** : Paiement et Incidents  
> **Playbooks** : PLB-PAY-019 à PLB-PAY-024

---

# PLB-PAY-019 - Paiement refusé

## 1. 🎯 Objectif

Aider le client dont le paiement a été refusé à identifier la cause et à trouver une solution.

---

## 2. 🗂️ Métadonnées (ID, Catégorie, Tags, Priorité)

| Propriété          | Valeur                                                                                     |
| ------------------ | ------------------------------------------------------------------------------------------ |
| **Identifiant**    | PLB-PAY-019                                                                                |
| **Catégorie**      | 3. PAIEMENT ET REMBOURSEMENT                                                               |
| **Sous-catégorie** | 3.1 Question à propos des paiements                                                        |
| **Tags Clés**      | `paiement refusé`, `carte refusée`, `erreur paiement`, `CB bloquée`, `transaction échouée` |
| **Priorité**       | P1                                                                                         |

---

## 3. 🔎 Conditions de Déclenchement

L'agent doit s'activer si le client ne peut pas finaliser son paiement.

**Exemples de formulations clients :**

- "Mon paiement est refusé"
- "Ma carte ne passe pas"
- "Je n'arrive pas à payer"

---

## 4. 📋 Informations à Identifier dans l'email

| Information                                    | Utilité                                                    |
| ---------------------------------------------- | ---------------------------------------------------------- |
| Message d'erreur / étape où le paiement échoue | Qualifier le problème (3DS, infos CB, erreur technique)    |
| Mention d'un débit / transaction sur le relevé | Basculer vers investigation (PLB-PAY-022)                  |
| Tentatives déjà effectuées (si mentionnées)    | Éviter les répétitions et orienter (banque vs alternative) |

---

## 5. 💬 Gabarits de Réponse

### 5.1. Réponse Standard

```
Bonjour [Prénom],

Je suis désolé pour ce désagrément. Voici les vérifications à effectuer si votre paiement par carte est refusé :

**🔍 Vérifications à faire :**

1. **Plafond de paiement**
   Contactez votre banque pour vérifier si vous avez atteint votre plafond. Vous pouvez demander une augmentation temporaire.

2. **Informations de carte**
   Vérifiez le numéro, la date d'expiration et le cryptogramme (3 chiffres au dos).

3. **3D Secure (authentification)**
   Votre banque peut demander une validation via SMS ou application. Assurez-vous que ce service est activé.

4. **Nouvelle carte**
   Une carte récente nécessite parfois un premier retrait ou paiement physique pour être activée.

5. **Blocage sécurité**
   Pour les montants élevés, contactez votre banque pour autoriser le paiement.

**💡 Alternatives de paiement :**
PayPal, virement bancaire, Oney (plusieurs fois), chèque

L'équipe Alltricks
```

---

## 6. ⚠️ Règles et Points d'Attention

| Situation constatée                                                           | Décision | Suite à donner                                                               |
| ----------------------------------------------------------------------------- | -------- | ---------------------------------------------------------------------------- |
| Paiement refusé ponctuel / client peut refaire un essai après vérifications   | **GO**   | Guider sur les vérifications (plafonds, infos carte, 3D Secure) + retenter   |
| Paiement refusé à répétition après vérifications (plafond/3DS/infos carte OK) | **KO**   | Orienter vers la banque (autorisation / 3D Secure) + proposer un autre moyen |
| Client indique un débit / suspicion de paiement passé sans commande confirmée | **KO**   | Basculer vers PLB-PAY-022 (vérification interne indispensable) / handoff     |

**Points clés FAQ :**

- 3D Secure obligatoire pour les paiements CB
- Plafond bancaire souvent en cause pour gros montants
- Alternatives : PayPal, virement, Oney, chèque

## 7. 🔗 Ressources et Liens

| Ressource      | URL                                |
| -------------- | ---------------------------------- |
| Page Paiements | https://www.alltricks.fr/paiements |

# PLB-PAY-020 - Paiement en plusieurs fois Oney

## 1. 🎯 Objectif

Expliquer le fonctionnement du paiement en plusieurs fois avec Oney.

## 2. 🗂️ Métadonnées (ID, Catégorie, Tags, Priorité)

| Propriété          | Valeur                                                                   |
| ------------------ | ------------------------------------------------------------------------ |
| **Identifiant**    | PLB-PAY-020                                                              |
| **Catégorie**      | 3. PAIEMENT ET REMBOURSEMENT                                             |
| **Sous-catégorie** | 3.1 Question à propos des paiements                                      |
| **Tags Clés**      | `oney`, `plusieurs fois`, `3x`, `4x`, `10x`, `mensualité`, `financement` |
| **Priorité**       | P2                                                                       |

## 3. 🔎 Conditions de Déclenchement

L'agent doit s'activer si le client pose des questions sur Oney.

**Exemples de formulations clients :**

- "Comment payer en plusieurs fois ?"
- "C'est quoi Oney ?"
- "Y a-t-il des frais pour le 4x ?"

## 4. 📋 Informations à Identifier dans l'email

| Information                               | Utilité                                    |
| ----------------------------------------- | ------------------------------------------ |
| Option souhaitée (3x/4x/10x)              | Adapter explications et délais             |
| Message d'erreur / refus mentionné        | Orienter (Oney vs problème technique)      |
| Question financement (mensualités, frais) | Répondre précisément sur le fonctionnement |

## 5. 💬 Gabarits de Réponse

### 5.1. Réponse Standard

```
Bonjour [Prénom],

Vous pouvez payer en plusieurs fois avec **Oney** :

**💳 Options :**
- **3 ou 4 fois SANS FRAIS**
- **10 fois** (frais variables selon le montant)

**🔄 Comment ça marche :**
1. Sélectionnez Oney lors du paiement
2. Remplissez le formulaire Oney
3. Pour le 10x : fournissez pièce d'identité, justificatif de domicile, RIB
4. Une fois accepté, la commande est validée
5. Mensualités prélevées automatiquement

**⏱️ Délais :**
- 3x/4x : quelques minutes
- 10x : 5 à 7 jours ouvrés

**📞 Contact Oney :** 3670 (0.15€/min)

Plus d'infos : https://www.alltricks.fr/paiements

L'équipe Alltricks
```

## 6. ⚠️ Règles et Points d'Attention

| Situation constatée                                               | Décision | Suite à donner                                                       |
| ----------------------------------------------------------------- | -------- | -------------------------------------------------------------------- |
| Demande d'information (conditions, frais, délai, documents)       | **GO**   | Expliquer les options (3x/4x/10x), les délais et les documents       |
| Refus Oney / dossier rejeté / scoring Oney défavorable            | **KO**   | Orienter vers Oney (3670) et proposer un autre moyen de paiement     |
| Problème technique bloquant au checkout (impossible de finaliser) | **KO**   | Handoff vers un conseiller pour investigation + proposer alternative |

**Points clés FAQ :**

- 3x/4x sans frais
- 10x avec frais, documents requis, délai 5-7 jours
- Contact Oney : 3670

## 7. 🔗 Ressources et Liens

| Ressource      | URL                                |
| -------------- | ---------------------------------- |
| Page Paiements | https://www.alltricks.fr/paiements |
| Oney           | 3670                               |

# PLB-PAY-021 - Commande en attente de paiement

## 1. 🎯 Objectif

Expliquer pourquoi une commande est en attente et comment finaliser.

## 2. 🗂️ Métadonnées (ID, Catégorie, Tags, Priorité)

| Propriété          | Valeur                                                |
| ------------------ | ----------------------------------------------------- |
| **Identifiant**    | PLB-PAY-021                                           |
| **Catégorie**      | 3. PAIEMENT ET REMBOURSEMENT                          |
| **Sous-catégorie** | 3.1 Question à propos des paiements                   |
| **Tags Clés**      | `attente paiement`, `virement`, `chèque`, `finaliser` |
| **Priorité**       | P2                                                    |

## 3. 🔎 Conditions de Déclenchement

L'agent doit s'activer si le client a une commande en attente de paiement.

## 4. 📋 Informations à Identifier dans l'email

| Information                                | Utilité                                    |
| ------------------------------------------ | ------------------------------------------ |
| Mode de paiement (virement, chèque, autre) | Donner la procédure et les délais adaptés  |
| Date d'envoi du paiement (si mentionnée)   | Évaluer si le délai est normal ou dépassé  |
| Besoin de finaliser/changer de mode        | Indiquer le chemin "Finaliser ma commande" |

## 5. 💬 Gabarits de Réponse

### 5.1. Réponse Standard

```
Bonjour [Prénom],

Le statut "En attente de paiement" signifie que nous n'avons pas encore reçu votre règlement.

**⏱️ Délais :**
- **Virement** : 2 à 3 jours ouvrés (RIB disponible dans "Mes Commandes", unique par commande)
- **Chèque** : après réception à AVANIS, 5 avenue Newton, 78180 Montigny-le-Bretonneux

**⚠️ Important :**
Commande réservée **7 jours**. Passé ce délai, disponibilité non garantie.

**💡 Changer de mode de paiement :**
"Mes Commandes" > "Finaliser ma commande"

L'équipe Alltricks
```

## 6. ⚠️ Règles et Points d'Attention

| Situation constatée                                                             | Décision | Suite à donner                                                             |
| ------------------------------------------------------------------------------- | -------- | -------------------------------------------------------------------------- |
| Paiement par virement/chèque en cours, délais standards non dépassés            | **GO**   | Expliquer délais + où trouver le RIB / l'adresse chèque + rappeler 7 jours |
| Client souhaite finaliser/changer de mode de paiement depuis "Mes Commandes"    | **GO**   | Indiquer le chemin "Finaliser ma commande"                                 |
| Paiement envoyé mais commande toujours "en attente" au-delà des délais annoncés | **KO**   | Handoff vers un conseiller (vérification réception paiement)               |
| Plus de 7 jours / commande expirée / indisponibilité annoncée                   | **KO**   | Informer qu'il faut repasser commande (selon disponibilité)                |

**Points clés FAQ :**

- Virement : 2-3 jours, RIB unique par commande
- Réservation 7 jours max
- Adresse chèque : AVANIS, 5 avenue Newton, 78180 Montigny-le-Bretonneux

## 7. 🔗 Ressources et Liens

| Ressource     | URL                                               |
| ------------- | ------------------------------------------------- |
| Mes commandes | https://www.alltricks.fr/mon-compte/mes-commandes |

# PLB-PAY-022 - Débité mais commande annulée

## 1. 🎯 Objectif

Rassurer et orienter le client débité sans commande validée.

## 2. 🗂️ Métadonnées (ID, Catégorie, Tags, Priorité)

| Propriété          | Valeur                                        |
| ------------------ | --------------------------------------------- |
| **Identifiant**    | PLB-PAY-022                                   |
| **Catégorie**      | 3. PAIEMENT ET REMBOURSEMENT                  |
| **Sous-catégorie** | 3.2 Anomalie au sujet d'un paiement           |
| **Tags Clés**      | `débité`, `annulé`, `prélevé`, `double débit` |
| **Priorité**       | P1                                            |

## 3. 🔎 Conditions de Déclenchement

L'agent doit s'activer si le client signale un débit sans commande.

## 4. 📋 Informations à Identifier dans l'email

| Information                                      | Utilité                                |
| ------------------------------------------------ | -------------------------------------- |
| Date et montant du débit                         | Permet de retrouver la transaction     |
| Intitulé de la transaction / identifiant         | Facilite l'identification du paiement  |
| Email / nom / CP / numéro de commande (si dispo) | Aider à retrouver la commande associée |

## 5. 💬 Gabarits de Réponse

### 5.1. Réponse Standard

```
Bonjour [Prénom],

Je comprends votre inquiétude.

Pour vous confirmer précisément si une commande a bien été créée et à quel statut elle se trouve, une vérification dans nos outils est nécessaire.

Je transmets donc votre demande à un conseiller qui va prendre le relais.

**📋 Informations à fournir :**
- Date exacte du débit
- Montant prélevé
- Intitulé de la transaction sur votre relevé
- Numéro de commande (si vous l'avez)

Si possible, ajoutez aussi :
- Adresse e-mail utilisée pour la commande
- Nom + code postal de livraison
- Identifiant de transaction (visible sur le relevé bancaire)

Nous identifierons le paiement et procéderons à la validation ou à la création d'un avoir remboursable.

Traitement prioritaire garanti.

L'équipe Alltricks
```

## 6. ⚠️ Règles et Points d'Attention

| Situation constatée                                                          | Décision | Suite à donner                                                                          |
| ---------------------------------------------------------------------------- | -------- | --------------------------------------------------------------------------------------- |
| Client indique un débit et ne retrouve aucune commande / aucune confirmation | **KO**   | **Handoff vers un conseiller** (vérification interne commande + paiement indispensable) |

**Points clés FAQ :**

- Demander détails du débit
- Traitement prioritaire

## 7. 🔗 Ressources et Liens

| Ressource      | URL                                               |
| -------------- | ------------------------------------------------- |
| Mes commandes  | https://www.alltricks.fr/mon-compte/mes-commandes |
| Page Paiements | https://www.alltricks.fr/paiements                |

# PLB-PAY-023 - Déconnexion pendant le paiement

## 1. 🎯 Objectif

Rassurer le client déconnecté pendant le paiement.

## 2. 🗂️ Métadonnées (ID, Catégorie, Tags, Priorité)

| Propriété          | Valeur                                         |
| ------------------ | ---------------------------------------------- |
| **Identifiant**    | PLB-PAY-023                                    |
| **Catégorie**      | 3. PAIEMENT ET REMBOURSEMENT                   |
| **Sous-catégorie** | 3.1 Question à propos des paiements            |
| **Tags Clés**      | `déconnecté`, `coupure`, `paiement interrompu` |
| **Priorité**       | P3                                             |

## 3. 🔎 Conditions de Déclenchement

L'agent doit s'activer si le client indique une déconnexion / coupure pendant le paiement.

## 4. 📋 Informations à Identifier dans l'email

| Information                              | Utilité                               |
| ---------------------------------------- | ------------------------------------- |
| Réception d'un email de confirmation     | Distinguer commande finalisée vs non  |
| Débit constaté sur le compte             | Déclencher une vérification (handoff) |
| Possibilité de relancer depuis le compte | Guider vers "Finaliser ma commande"   |

## 5. 💬 Gabarits de Réponse

### 5.1. Réponse Standard

```
Bonjour [Prénom],

Pas d'inquiétude !

**✅ Règle :**
En général, sans email de confirmation, la commande n'a pas été finalisée.

Si vous constatez malgré tout un débit sur votre compte, indiquez-le nous dans votre message : une vérification dans nos outils sera nécessaire.

**🔄 Reprendre votre commande :**
1. Connectez-vous à "Mes Commandes"
2. Cliquez sur "Finaliser ma commande" (si disponible)

Si le bouton n'est pas accessible, dites-le nous.

L'équipe Alltricks
```

## 6. ⚠️ Règles et Points d'Attention

| Situation constatée                                                      | Décision | Suite à donner                                                          |
| ------------------------------------------------------------------------ | -------- | ----------------------------------------------------------------------- |
| Déconnexion pendant paiement + aucun email de confirmation + aucun débit | **GO**   | Rassurer + inviter à reprendre/relancer la commande via "Mes Commandes" |
| Déconnexion pendant paiement + débit constaté (même sans confirmation)   | **KO**   | Handoff vers un conseiller (vérification interne commande + paiement)   |

## 7. 🔗 Ressources et Liens

| Ressource     | URL                                               |
| ------------- | ------------------------------------------------- |
| Mes commandes | https://www.alltricks.fr/mon-compte/mes-commandes |

# PLB-PAY-024 - Modes de paiement disponibles

## 1. 🎯 Objectif

Informer sur tous les modes de paiement acceptés.

## 2. 🗂️ Métadonnées (ID, Catégorie, Tags, Priorité)

| Propriété          | Valeur                                                       |
| ------------------ | ------------------------------------------------------------ |
| **Identifiant**    | PLB-PAY-024                                                  |
| **Catégorie**      | 3. PAIEMENT ET REMBOURSEMENT                                 |
| **Sous-catégorie** | 3.1 Question à propos des paiements                          |
| **Tags Clés**      | `mode paiement`, `comment payer`, `CB`, `paypal`, `virement` |
| **Priorité**       | P3                                                           |

---

## 3. 🔎 Conditions de Déclenchement

L'agent doit s'activer si le client demande les moyens de paiement acceptés ou refuse un moyen non disponible.

---

## 4. 📋 Informations à Identifier dans l'email

| Information                | Utilité                                          |
| -------------------------- | ------------------------------------------------ |
| Moyen de paiement souhaité | Répondre si disponible / proposer alternative    |
| Mention vendeur partenaire | Rappeler les restrictions possibles (CB parfois) |

---

## 5. 💬 Gabarits de Réponse

### 5.1. Réponse Standard

```
Bonjour [Prénom],

Modes de paiement chez Alltricks :

**💳 Carte bancaire** - Visa, MasterCard, Amex, Bancontact (3D Secure)
**🅿️ PayPal** - Paiement instantané
**🔄 Oney** - 3x/4x sans frais, 10x avec frais
**🏦 Virement** - Sous 2-3 jours
**📝 Chèque** - À l'ordre d'AVANIS
**🎁 Chèque-cadeau / Avoir** - Dans le champ dédié
**💰 Cagnotte Alltricks+** - Pour les membres

⚠️ Vendeurs partenaires : parfois CB uniquement.

Plus d'infos : https://www.alltricks.fr/paiements

L'équipe Alltricks
```

---

## 7. 🔗 Ressources et Liens

| Ressource      | URL                                |
| -------------- | ---------------------------------- |
| Page Paiements | https://www.alltricks.fr/paiements |
