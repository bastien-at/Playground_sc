# 👤 PLAYBOOKS COMPTE CLIENT - Format IA-Ready

> **Thématique** : Gestion du Compte  
> **Playbooks** : PLB-CPT-029 à PLB-CPT-032

---

# PLB-CPT-029 - Problème de connexion

## 1. 🎯 Objectif

Aider le client qui n'arrive pas à se connecter à son compte.

---

## 2. 🗂️ Métadonnées

| Propriété          | Valeur                                                             |
| ------------------ | ------------------------------------------------------------------ |
| **Identifiant**    | PLB-CPT-029                                                        |
| **Catégorie**      | 6. COMPTE CLIENT                                                   |
| **Sous-catégorie** | 6.1 Fonctionnement du compte client                                |
| **Tags Clés**      | `connexion`, `connecter`, `mot de passe`, `identifiants`, `bloqué` |
| **Priorité**       | P2                                                                 |

---

## 3. 🔎 Conditions de Déclenchement

L'agent doit s'activer si le client a des difficultés de connexion.

**Exemples de formulations clients :**

- "Je n'arrive pas à me connecter"
- "Mon mot de passe ne fonctionne pas"
- "Compte bloqué"

---

## 4. ✅ Décision (OK/KO)

| Situation constatée                                                                           | Décision | Suite à donner                                                        |
| --------------------------------------------------------------------------------------------- | -------- | --------------------------------------------------------------------- |
| Problème de connexion / mot de passe / compte bloqué                                          | **OK**   | Appliquer le gabarit ci-dessous                                       |
| Suspicion de compte compromis / piratage (activité anormale, e-mail modifié, etc.)            | **KO**   | **Handoff vers un conseiller** (vérification identité / sécurisation) |
| Client demande une modification d'email / informations personnelles liée à l'accès            | **KO**   | **Handoff vers un conseiller** (contrôles nécessaires)                |
| Problème persistant après toutes les vérifications (cache/cookies, autre navigateur/appareil) | **KO**   | **Handoff vers un conseiller** (diagnostic technique / accès interne) |

---

## 5. 💬 Gabarits de Réponse

### 5.1. Réponse Standard

```
Bonjour [Prénom],

Voici les étapes pour résoudre votre problème de connexion :

**🔍 Vérifications de base :**
1. Vérifiez que la touche **Majuscule** n'est pas activée
2. Assurez-vous qu'il n'y a pas d'espace avant ou après le mot de passe
3. Vérifiez que vous utilisez la bonne adresse email

**🔑 Réinitialiser votre mot de passe :**
1. Sur la page de connexion, cliquez sur **"Mot de passe oublié"**
2. Saisissez votre adresse email
3. Consultez votre boîte mail (et les **spams/indésirables**)
4. Cliquez sur le lien reçu pour créer un nouveau mot de passe

**💻 Si le problème persiste :**
- Essayez un autre navigateur
- Videz le cache et les cookies de votre navigateur
- Essayez depuis un autre appareil

**📧 Achat PayPal Express ?**
Un compte a peut-être été créé avec votre email PayPal. Essayez "Mot de passe oublié" avec cette adresse.

L'équipe Alltricks
```

---

## 6. ⚠️ Règles et Points d'Attention

**Points clés FAQ :**

- Vérifier majuscules et espaces
- Email de réinitialisation peut être dans les spams
- PayPal Express crée un compte avec l'email PayPal

---

## 7. 🔗 Ressources et Liens

| Ressource      | URL                                 |
| -------------- | ----------------------------------- |
| Page connexion | https://www.alltricks.fr/mon-compte |

---

---

# PLB-CPT-030 - Mot de passe oublié

## 1. 🎯 Objectif

Guider le client pour réinitialiser son mot de passe.

---

## 2. 🗂️ Métadonnées

| Propriété          | Valeur                                                                   |
| ------------------ | ------------------------------------------------------------------------ |
| **Identifiant**    | PLB-CPT-030                                                              |
| **Catégorie**      | 6. COMPTE CLIENT                                                         |
| **Sous-catégorie** | 6.1 Fonctionnement du compte client                                      |
| **Tags Clés**      | `mot de passe oublié`, `réinitialiser`, `nouveau mot de passe`, `oublié` |
| **Priorité**       | P3                                                                       |

---

## 3. 🔎 Conditions de Déclenchement

L'agent doit s'activer si le client demande une réinitialisation de mot de passe ou indique ne plus pouvoir accéder à son compte.

**Exemples de formulations clients :**

- "J'ai oublié mon mot de passe"
- "Je ne peux plus me connecter"
- "Je n'ai pas reçu l'email de réinitialisation"

---

## 4. ✅ Décision (OK/KO)

| Situation constatée                                                                                    | Décision | Suite à donner                                                             |
| ------------------------------------------------------------------------------------------------------ | -------- | -------------------------------------------------------------------------- |
| Demande de réinitialisation de mot de passe                                                            | **OK**   | Appliquer le gabarit ci-dessous                                            |
| Client n'a plus accès à l'adresse email du compte                                                      | **KO**   | **Handoff vers un conseiller** (vérification identité / mise à jour email) |
| Email de réinitialisation non reçu malgré spam/indésirables + délai raisonnable + nouvelles tentatives | **KO**   | **Handoff vers un conseiller** (vérification délivrabilité / compte)       |
| Suspension / blocage suspect (tentatives multiples, message d'erreur inhabituel)                       | **KO**   | **Handoff vers un conseiller** (contrôles anti-fraude / déblocage)         |

---

## 5. 💬 Gabarits de Réponse

### 5.1. Réponse Standard

```
Bonjour [Prénom],

Pour réinitialiser votre mot de passe :

1. Rendez-vous sur la page de connexion
2. Cliquez sur **"J'ai oublié mon mot de passe"**
3. Saisissez l'adresse email de votre compte
4. Un email vous sera envoyé automatiquement
5. Cliquez sur le lien pour créer un nouveau mot de passe

**📧 Vous ne recevez pas l'email ?**
Vérifiez votre dossier **Spam** ou **Courriers indésirables**.

L'équipe Alltricks
```

---

## 6. ⚠️ Règles et Points d'Attention

**Points clés FAQ :**

- Lien envoyé par email automatiquement
- Vérifier les spams

---

## 7. 🔗 Ressources et Liens

| Ressource      | URL                                 |
| -------------- | ----------------------------------- |
| Page connexion | https://www.alltricks.fr/mon-compte |

---

---

# PLB-CPT-031 - Suppression de compte

## 1. 🎯 Objectif

Qualifier une demande RGPD / suppression de données personnelles et l'escalader vers un conseiller.

---

## 2. 🗂️ Métadonnées

| Propriété          | Valeur                                                                         |
| ------------------ | ------------------------------------------------------------------------------ |
| **Identifiant**    | PLB-CPT-031                                                                    |
| **Catégorie**      | 6. COMPTE CLIENT                                                               |
| **Sous-catégorie** | 6.1 Fonctionnement du compte client                                            |
| **Tags Clés**      | `supprimer compte`, `fermer compte`, `RGPD`, `données personnelles`, `effacer` |
| **Priorité**       | P3                                                                             |

---

## 3. 🔎 Conditions de Déclenchement

L'agent doit s'activer si le client demande la suppression de son compte, l'effacement de ses données, ou toute demande explicitement liée au RGPD.

**Exemples de formulations clients :**

- "Supprimez mon compte"
- "Je veux effacer mes données"
- "Je fais une demande RGPD"

---

## 4. ✅ Décision (OK/KO)

| Situation constatée                                                             | Décision | Suite à donner                                  |
| ------------------------------------------------------------------------------- | -------- | ----------------------------------------------- |
| Demande de suppression de compte / effacement de données / demande liée au RGPD | **KO**   | **Handoff vers un conseiller** (procédure RGPD) |

---

## 5. 💬 Gabarits de Réponse

### 5.1. Réponse - KO

```
Bonjour [Prénom],

Votre demande concerne le RGPD / la suppression de données personnelles.

Je transmets votre demande à un conseiller afin qu’elle soit traitée selon la procédure dédiée.

L'équipe Alltricks
```

---

## 6. ⚠️ Règles et Points d'Attention

**Points clés FAQ :**

- Toute demande RGPD / données personnelles est **KO**
- Ne pas détailler de procédure ni confirmer une suppression

---

## 7. 🔗 Ressources et Liens

| Ressource          | URL                                   |
| ------------------ | ------------------------------------- |
| Formulaire contact | https://www.alltricks.fr/contact/form |

---

---

# PLB-CPT-032 - Newsletter

## 1. 🎯 Objectif

Qualifier une demande de gestion newsletter et l'escalader vers un conseiller.

---

## 2. 🗂️ Métadonnées

| Propriété          | Valeur                                                        |
| ------------------ | ------------------------------------------------------------- |
| **Identifiant**    | PLB-CPT-032                                                   |
| **Catégorie**      | 6. COMPTE CLIENT                                              |
| **Sous-catégorie** | 6.3 Désinscription des newsletters                            |
| **Tags Clés**      | `newsletter`, `désabonner`, `emails`, `trop d'emails`, `spam` |
| **Priorité**       | P4                                                            |

---

## 3. 🔎 Conditions de Déclenchement

L'agent doit s'activer si le client demande un désabonnement newsletter, une modification de préférences ou signale trop d'emails.

**Exemples de formulations clients :**

- "Je veux me désabonner"
- "Je reçois trop d'emails"
- "Je veux régler mes préférences newsletter"

---

## 4. ✅ Décision (OK/KO)

| Situation constatée                                              | Décision | Suite à donner                 |
| ---------------------------------------------------------------- | -------- | ------------------------------ |
| Demande de désabonnement / gestion / personnalisation newsletter | **KO**   | **Handoff vers un conseiller** |

---

## 5. 💬 Gabarits de Réponse

### 5.1. Réponse - KO

```
Bonjour [Prénom],

Votre demande concerne la gestion des newsletters (désabonnement / paramètres).

Je transmets votre demande à un conseiller afin qu’elle soit traitée.

L'équipe Alltricks
```

---

## 6. ⚠️ Règles et Points d'Attention

**Points clés FAQ :**

- Toute demande newsletter est **KO**
- Ne pas donner de procédure de désinscription ni de manipulation de préférences

---

## 7. 🔗 Ressources et Liens

| Ressource          | URL                                   |
| ------------------ | ------------------------------------- |
| Formulaire contact | https://www.alltricks.fr/contact/form |

---
