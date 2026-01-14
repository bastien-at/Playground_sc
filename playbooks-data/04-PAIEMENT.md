# 💳 PLAYBOOKS PAIEMENT - Format IA-Ready

> **Thématique** : Paiement et Incidents  
> **Playbooks** : PLB-019 à PLB-024

---

# PLB-019 - Paiement refusé

## 1. 🎯 Objectif

Aider le client dont le paiement a été refusé à identifier la cause et à trouver une solution.

---

## 2. 🗂️ Métadonnées

| Propriété          | Valeur                                                                                     |
| ------------------ | ------------------------------------------------------------------------------------------ |
| **Identifiant**    | PLB-019                                                                                    |
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

**Points clés FAQ :**

- 3D Secure obligatoire pour les paiements CB
- Plafond bancaire souvent en cause pour gros montants
- Alternatives : PayPal, virement, Oney, chèque

---

## 7. 🔗 Ressources et Liens

| Ressource      | URL                                |
| -------------- | ---------------------------------- |
| Page Paiements | https://www.alltricks.fr/paiements |

---

---

# PLB-020 - Paiement en plusieurs fois Oney

## 1. 🎯 Objectif

Expliquer le fonctionnement du paiement en plusieurs fois avec Oney.

---

## 2. 🗂️ Métadonnées

| Propriété          | Valeur                                                                   |
| ------------------ | ------------------------------------------------------------------------ |
| **Identifiant**    | PLB-020                                                                  |
| **Catégorie**      | 3. PAIEMENT ET REMBOURSEMENT                                             |
| **Sous-catégorie** | 3.1 Question à propos des paiements                                      |
| **Tags Clés**      | `oney`, `plusieurs fois`, `3x`, `4x`, `10x`, `mensualité`, `financement` |
| **Priorité**       | P2                                                                       |

---

## 3. 🔎 Conditions de Déclenchement

L'agent doit s'activer si le client pose des questions sur Oney.

**Exemples de formulations clients :**

- "Comment payer en plusieurs fois ?"
- "C'est quoi Oney ?"
- "Y a-t-il des frais pour le 4x ?"

---

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

---

## 6. ⚠️ Règles et Points d'Attention

**Points clés FAQ :**

- 3x/4x sans frais
- 10x avec frais, documents requis, délai 5-7 jours
- Contact Oney : 3670

---

## 7. 🔗 Ressources et Liens

| Ressource      | URL                                |
| -------------- | ---------------------------------- |
| Page Paiements | https://www.alltricks.fr/paiements |
| Oney           | 3670                               |

---

---

# PLB-021 - Commande en attente de paiement

## 1. 🎯 Objectif

Expliquer pourquoi une commande est en attente et comment finaliser.

---

## 2. 🗂️ Métadonnées

| Propriété          | Valeur                                                |
| ------------------ | ----------------------------------------------------- |
| **Identifiant**    | PLB-021                                               |
| **Catégorie**      | 3. PAIEMENT ET REMBOURSEMENT                          |
| **Sous-catégorie** | 3.1 Question à propos des paiements                   |
| **Tags Clés**      | `attente paiement`, `virement`, `chèque`, `finaliser` |
| **Priorité**       | P2                                                    |

---

## 3. 🔎 Conditions de Déclenchement

L'agent doit s'activer si le client a une commande en attente de paiement.

---

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

---

## 6. ⚠️ Règles et Points d'Attention

**Points clés FAQ :**

- Virement : 2-3 jours, RIB unique par commande
- Réservation 7 jours max
- Adresse chèque : AVANIS, 5 avenue Newton, 78180 Montigny-le-Bretonneux

---

## 7. 🔗 Ressources et Liens

| Ressource     | URL                                               |
| ------------- | ------------------------------------------------- |
| Mes commandes | https://www.alltricks.fr/mon-compte/mes-commandes |

---

---

# PLB-022 - Débité mais commande annulée

## 1. 🎯 Objectif

Rassurer et orienter le client débité sans commande validée.

---

## 2. 🗂️ Métadonnées

| Propriété          | Valeur                                        |
| ------------------ | --------------------------------------------- |
| **Identifiant**    | PLB-022                                       |
| **Catégorie**      | 3. PAIEMENT ET REMBOURSEMENT                  |
| **Sous-catégorie** | 3.2 Anomalie au sujet d'un paiement           |
| **Tags Clés**      | `débité`, `annulé`, `prélevé`, `double débit` |
| **Priorité**       | P1                                            |

---

## 3. 🔎 Conditions de Déclenchement

L'agent doit s'activer si le client signale un débit sans commande.

---

## 4. ✅ Décision (OK/KO)

| Situation constatée                                                          | Décision | Suite à donner                                                                          |
| ---------------------------------------------------------------------------- | -------- | --------------------------------------------------------------------------------------- |
| Client indique un débit et ne retrouve aucune commande / aucune confirmation | **KO**   | **Handoff vers un conseiller** (vérification interne commande + paiement indispensable) |

---

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

---

## 6. ⚠️ Règles et Points d'Attention

**Points clés FAQ :**

- Demander détails du débit
- Traitement prioritaire

---

## 7. 🔗 Ressources et Liens

| Ressource | URL |
| --------- | --- |

---

---

# PLB-023 - Déconnexion pendant le paiement

## 1. 🎯 Objectif

Rassurer le client déconnecté pendant le paiement.

---

## 2. 🗂️ Métadonnées

| Propriété          | Valeur                                         |
| ------------------ | ---------------------------------------------- |
| **Identifiant**    | PLB-023                                        |
| **Catégorie**      | 3. PAIEMENT ET REMBOURSEMENT                   |
| **Sous-catégorie** | 3.1 Question à propos des paiements            |
| **Tags Clés**      | `déconnecté`, `coupure`, `paiement interrompu` |
| **Priorité**       | P3                                             |

---

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

---

## 7. 🔗 Ressources et Liens

| Ressource     | URL                                               |
| ------------- | ------------------------------------------------- |
| Mes commandes | https://www.alltricks.fr/mon-compte/mes-commandes |

---

---

# PLB-024 - Modes de paiement disponibles

## 1. 🎯 Objectif

Informer sur tous les modes de paiement acceptés.

---

## 2. 🗂️ Métadonnées

| Propriété          | Valeur                                                       |
| ------------------ | ------------------------------------------------------------ |
| **Identifiant**    | PLB-024                                                      |
| **Catégorie**      | 3. PAIEMENT ET REMBOURSEMENT                                 |
| **Sous-catégorie** | 3.1 Question à propos des paiements                          |
| **Tags Clés**      | `mode paiement`, `comment payer`, `CB`, `paypal`, `virement` |
| **Priorité**       | P3                                                           |

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
