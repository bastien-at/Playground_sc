# 🛒 PLAYBOOKS COMMANDES - Format IA-Ready

> **Thématique** : Gestion des Commandes  
> **Playbooks** : PLB-CMD-014 à PLB-CMD-018

---

# PLB-CMD-014 - Annulation de commande

## 1. 🎯 Objectif

Expliquer au client les conditions et la procédure pour annuler sa commande selon son statut.

---

## 2. 🗂️ Métadonnées (ID, Catégorie, Tags, Priorité)

| Propriété          | Valeur                                                                         |
| ------------------ | ------------------------------------------------------------------------------ |
| **Identifiant**    | PLB-CMD-014                                                                    |
| **Catégorie**      | 2. MES COMMANDES ET RETOURS                                                    |
| **Sous-catégorie** | 2.3 Annulation de commande                                                     |
| **Tags Clés**      | `annuler`, `annulation`, `supprimer commande`, `ne veux plus`, `annuler achat` |
| **Priorité**       | P1                                                                             |

---

## 3. 🔎 Conditions de Déclenchement

L'agent doit s'activer si le client souhaite annuler sa commande.

**Exemples de formulations clients :**

- "Je voudrais annuler ma commande"
- "Comment supprimer ma commande ?"
- "Je ne veux plus de cette commande"

---

## 4. 📋 Informations à Identifier dans l'email

| Information                             | Utilité                                                |
| --------------------------------------- | ------------------------------------------------------ |
| Numéro de commande mentionné            | Reprendre la référence sans jamais l'inventer          |
| Statut/avancement indiqué (si connu)    | Orienter sur annulation vs refus/retour                |
| Produit Alltricks vs vendeur partenaire | Adapter la démarche (annulation SC vs contact vendeur) |

---

## 5. 💬 Gabarits de Réponse

### 5.1. Réponse Standard - Produit Alltricks

```
Bonjour [Prénom],

Voici comment annuler votre commande selon son statut :

**✅ Si votre commande n'est PAS encore en livraison :**
1. Connectez-vous à "Mes Commandes & Retours" : https://www.alltricks.fr/mon-compte/mes-commandes
2. Sélectionnez la commande concernée
3. Cliquez sur "Annuler ma commande"
4. Validez pour confirmer l'annulation

Le remboursement est traité sous 5 jours ouvrés après validation de l'annulation.

**❌ Si votre commande est DÉJÀ en livraison :**
L'annulation n'est plus possible, mais vous avez deux options :

**Option 1 : Refuser le colis à la livraison**
- Indiquez au livreur que vous refusez le colis
- Il sera retourné à notre entrepôt gratuitement
- Un avoir sera créé à réception

**Option 2 : Accepter puis retourner**
- Réceptionnez le colis
- Effectuez un retour via "Mes Commandes & Retours"
- Un avoir sera créé (frais de retour déduits)

Dans les deux cas, vous pourrez demander le remboursement de l'avoir depuis "Mes Avoirs".

L'équipe Alltricks
```

---

## 6. ⚠️ Règles et Points d'Attention

| Situation             | Action                           |
| --------------------- | -------------------------------- |
| Commande en livraison | Proposer refus ou retour         |
| Vendeur partenaire    | Contacter le vendeur directement |

---

---

# PLB-CMD-015 - Commande incomplète

## 1. 🎯 Objectif

Guider le client qui n'a pas reçu tous les articles de sa commande vers la procédure de réclamation.

---

## 2. 🗂️ Métadonnées (ID, Catégorie, Tags, Priorité)

| Propriété          | Valeur                                                                        |
| ------------------ | ----------------------------------------------------------------------------- |
| **Identifiant**    | PLB-CMD-015                                                                   |
| **Catégorie**      | 5. PRODUIT REÇU ABÎMÉ OU NON CONFORME OU MANQUANT                             |
| **Sous-catégorie** | 5.2 Concerne un autre produit                                                 |
| **Tags Clés**      | `incomplet`, `manque`, `article manquant`, `pas tout reçu`, `colis incomplet` |
| **Priorité**       | P1                                                                            |

---

## 3. 🔎 Conditions de Déclenchement

L'agent doit s'activer si le client signale qu'il n'a pas reçu tous ses articles.

**Exemples de formulations clients :**

- "Il manque un article dans ma commande"
- "Je n'ai pas reçu tous mes produits"
- "Ma commande est incomplète"

---

## 4. 📋 Informations à Identifier dans l'email

| Information                                   | Utilité                                            |
| --------------------------------------------- | -------------------------------------------------- |
| Numéro de commande mentionné                  | Reprendre la référence sans jamais l'inventer      |
| Article(s) manquant(s) cité(s)                | Cadrer la réclamation et éviter les allers-retours |
| Mention de colis multiples / plusieurs envois | Vérifier si l'envoi est fractionné                 |

---

## 5. 💬 Gabarits de Réponse

### 5.1. Réponse Standard - Produit Alltricks

```
Bonjour [Prénom],

Je suis désolé d'apprendre qu'il manque un article dans votre commande.

**🔍 Première vérification importante :**
Votre commande a peut-être été expédiée en **plusieurs colis**.
1. Connectez-vous à "Mes Commandes & Retours" : https://www.alltricks.fr/mon-compte/mes-commandes
2. Cliquez sur votre commande
3. Vérifiez si plusieurs envois sont prévus

**📦 Si vous avez bien reçu tous les colis et qu'un article manque :**
1. Depuis votre commande, cliquez sur "Contacter votre Service Client"
2. Sélectionnez le motif : **"Je rencontre un problème sur un produit neuf livré (produit endommagé, manque des éléments...)"**
3. Décrivez l'article manquant

Nous traiterons votre demande dans les plus brefs délais.

L'équipe Alltricks
```

---

## 6. ⚠️ Règles et Points d'Attention

| Situation                                  | Action                                 |
| ------------------------------------------ | -------------------------------------- |
| Client n'a pas vérifié les colis multiples | Demander de vérifier d'abord           |
| Réclamation urgente                        | Orienter vers le formulaire de contact |

---

---

# PLB-CMD-016 - Modification de commande

## 1. 🎯 Objectif

Expliquer au client qu'il n'est pas possible de modifier une commande validée et lui proposer des alternatives.

---

## 2. 🗂️ Métadonnées (ID, Catégorie, Tags, Priorité)

| Propriété          | Valeur                                                               |
| ------------------ | -------------------------------------------------------------------- |
| **Identifiant**    | PLB-CMD-016                                                          |
| **Catégorie**      | 2. MES COMMANDES ET RETOURS                                          |
| **Sous-catégorie** | 2.4 Modification de commande                                         |
| **Tags Clés**      | `modifier commande`, `ajouter article`, `changer`, `enlever produit` |
| **Priorité**       | P2                                                                   |

---

## 3. 🔎 Conditions de Déclenchement

L'agent doit s'activer si le client veut modifier sa commande.

**Exemples de formulations clients :**

- "Je voudrais ajouter un article à ma commande"
- "Pouvez-vous modifier ma commande ?"
- "J'ai oublié un produit"

---

## 4. 📋 Informations à Identifier dans l'email

| Information                          | Utilité                                                          |
| ------------------------------------ | ---------------------------------------------------------------- |
| Numéro de commande mentionné         | Reprendre la référence sans jamais l'inventer                    |
| Type de modification demandée        | Expliquer l'alternative adaptée (nouvelle commande / annulation) |
| Statut/avancement indiqué (si connu) | Déterminer si une annulation est possible                        |

---

## 5. 💬 Gabarits de Réponse

### 5.1. Réponse Standard

```
Bonjour [Prénom],

Une fois validée, il n'est malheureusement **pas possible de modifier une commande** (ajout, suppression ou modification d'articles).

Notre processus logistique démarre immédiatement après validation pour vous garantir des délais de livraison optimaux.

**🛒 Si vous souhaitez commander un article supplémentaire :**
Vous devrez passer une nouvelle commande.

💡 **Bon à savoir :** La livraison est gratuite à partir de 100€ !

**❌ Si vous souhaitez annuler un article de votre commande :**
- Si la commande n'est pas en livraison : vous pouvez l'annuler entièrement depuis "Mes Commandes & Retours"
- Si elle est en livraison : refusez le colis ou effectuez un retour après réception

L'équipe Alltricks
```

---

## 6. ⚠️ Règles et Points d'Attention

| Situation                      | Action                               |
| ------------------------------ | ------------------------------------ |
| Client veut retirer un article | Proposer annulation totale ou retour |

---

---

# PLB-CMD-017 - Facture

## 1. 🎯 Objectif

Indiquer au client où et comment télécharger sa facture.

---

## 2. 🗂️ Métadonnées (ID, Catégorie, Tags, Priorité)

| Propriété          | Valeur                                                                              |
| ------------------ | ----------------------------------------------------------------------------------- |
| **Identifiant**    | PLB-CMD-017                                                                         |
| **Catégorie**      | 2. MES COMMANDES ET RETOURS                                                         |
| **Sous-catégorie** | 2.1 Suivi livraison                                                                 |
| **Tags Clés**      | `facture`, `télécharger facture`, `obtenir facture`, `comptabilité`, `justificatif` |
| **Priorité**       | P3                                                                                  |

---

## 3. 🔎 Conditions de Déclenchement

L'agent doit s'activer si le client cherche sa facture.

**Exemples de formulations clients :**

- "Où puis-je trouver ma facture ?"
- "Comment télécharger ma facture ?"
- "J'ai besoin de ma facture pour ma comptabilité"

---

## 4. 📋 Informations à Identifier dans l'email

| Information                             | Utilité                                            |
| --------------------------------------- | -------------------------------------------------- |
| Numéro de commande mentionné            | Reprendre la référence sans jamais l'inventer      |
| Produit Alltricks vs vendeur partenaire | Adapter la démarche (facture Alltricks vs vendeur) |
| Contexte achat événement/stand          | Identifier un cas nécessitant un conseiller        |

---

## 5. 💬 Gabarits de Réponse

### 5.1. Réponse Standard - Produit Alltricks

```
Bonjour [Prénom],

Voici comment télécharger votre facture :

**📄 Pour un article vendu et expédié par Alltricks :**
1. Connectez-vous à votre espace client
2. Accédez à "Mes Commandes & Retours" : https://www.alltricks.fr/mon-compte/mes-commandes
3. Cliquez sur la référence de votre commande
4. Cliquez sur "Voir ma facture"

La facture sera automatiquement téléchargée.

⚠️ **Note :** La facture est disponible uniquement après l'expédition de votre commande.

L'équipe Alltricks
```

---

## 6. ⚠️ Règles et Points d'Attention

| Situation             | Action                        |
| --------------------- | ----------------------------- |
| Commande non expédiée | Facture pas encore disponible |
| Achat en événement    | Transmettre à un conseiller   |

---

---

# PLB-CMD-018 - Commande PayPal non visible

## 1. 🎯 Objectif

Expliquer au client pourquoi sa commande PayPal n'apparaît pas dans son compte habituel et comment y accéder.

---

## 2. 🗂️ Métadonnées (ID, Catégorie, Tags, Priorité)

| Propriété          | Valeur                                                                               |
| ------------------ | ------------------------------------------------------------------------------------ |
| **Identifiant**    | PLB-CMD-018                                                                          |
| **Catégorie**      | 3. PAIEMENT ET REMBOURSEMENT                                                         |
| **Sous-catégorie** | 3.2 Anomalie au sujet d'un paiement                                                  |
| **Tags Clés**      | `paypal`, `commande invisible`, `pas de commande`, `paypal express`, `compte paypal` |
| **Priorité**       | P3                                                                                   |

---

## 3. 🔎 Conditions de Déclenchement

L'agent doit s'activer si le client ne trouve pas sa commande PayPal.

**Exemples de formulations clients :**

- "Ma commande PayPal n'apparaît pas"
- "J'ai payé par PayPal mais je ne vois pas ma commande"
- "Où est ma commande PayPal ?"

---

## 4. 📋 Informations à Identifier dans l'email

| Information                            | Utilité                                     |
| -------------------------------------- | ------------------------------------------- |
| Adresse e-mail PayPal utilisée         | Expliquer le compte créé via PayPal Express |
| Date du paiement / montant             | Nécessaire si escalade pour vérification    |
| Numéro de transaction PayPal           | Nécessaire si escalade pour vérification    |
| Mention d'un débit / paiement confirmé | Déterminer si une escalade est nécessaire   |

---

## 5. 💬 Gabarits de Réponse

### 5.1. Réponse Standard

```
Bonjour [Prénom],

Lors d'un paiement avec **PayPal Express**, un compte Alltricks est automatiquement créé avec l'adresse email de votre compte PayPal.

**🔍 Si cette adresse diffère de votre compte Alltricks habituel :**
Votre commande apparaît sur ce nouveau compte.

**Pour y accéder :**
1. Rendez-vous sur la page de connexion Alltricks
2. Cliquez sur "Mot de passe oublié"
3. Saisissez l'adresse email de votre compte PayPal
4. Créez votre mot de passe via le lien reçu par email
5. Connectez-vous pour retrouver votre commande

**📧 Si vous avez bien été débité / si le paiement est confirmé mais que vous ne retrouvez aucune commande :**
Une vérification dans nos outils est nécessaire.

Je transmets donc votre demande à un conseiller qui va prendre le relais.

** Informations à fournir :**
- Date du paiement
- Montant
- Numéro de transaction PayPal
- Adresse e-mail PayPal utilisée

L'équipe Alltricks
```

---

## 6. ⚠️ Règles et Points d'Attention

| Situation constatée                                                                                                                   | Décision | Suite à donner                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------------------------------------------------------------------------------- |
| Paiement PayPal Express effectué, commande non visible car l'adresse e-mail PayPal diffère de l'adresse du compte Alltricks habituel  | **OK**   | Expliquer l'accès via l'e-mail PayPal (parcours "Mot de passe oublié")                  |
| Client indique un débit / paiement confirmé mais ne retrouve aucune commande / aucune confirmation (quelle que soit l'adresse e-mail) | **KO**   | **Handoff vers un conseiller** (vérification interne commande + paiement indispensable) |

| Situation                 | Action                                            |
| ------------------------- | ------------------------------------------------- |
| Pas de confirmation email | Le paiement n'a peut-être pas abouti              |
| Client a 2 comptes        | Expliquer qu'un compte a été créé automatiquement |

**Points clés FAQ :**

- PayPal Express crée un compte avec l'email PayPal
- Le client peut avoir 2 comptes Alltricks (email perso + email PayPal)
- Mot de passe à créer via "Mot de passe oublié"

---

## 7. 🔗 Ressources et Liens

| Ressource      | URL                                 |
| -------------- | ----------------------------------- |
| Page connexion | https://www.alltricks.fr/mon-compte |
