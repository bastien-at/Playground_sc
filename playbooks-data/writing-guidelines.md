# ✍️ WRITING GUIDELINES - Guide de rédaction pour l'IA Mailbot

> **Objectif** : Définir les règles de rédaction des playbooks et des réponses générées par l'IA pour garantir cohérence, clarté et ton de marque Alltricks.

---

## Référence (source d'autorité)

Les règles de **ton**, **structure**, **style**, **permissions/interdictions** et **décision GO/KO** sont définies dans :
`prompts-data/Agent_reponse.md`

Ce document sert de guide éditorial pour la rédaction et la maintenance des playbooks.

---

## 1. Variables et personnalisation

### Variables standard

| Variable            | Description            | Exemple         |
| ------------------- | ---------------------- | --------------- |
| `[Prénom]`          | Prénom du client       | Marie           |
| `[numero_commande]` | Référence commande     | AT-123456       |
| `[transporteur]`    | Nom du transporteur    | Colissimo       |
| `[date]`            | Date formatée          | 15 janvier 2025 |
| `[montant]`         | Montant en euros       | 49,90€          |
| `[nom_vendeur]`     | Nom vendeur partenaire | BikeShop Pro    |

### Règles d'utilisation

- Toujours entre crochets `[variable]`
- Ne jamais inventer de valeur
- Si la variable n'est pas disponible, utiliser une formulation générique

```markdown
❌ "Votre commande AT-123456 a été expédiée"
✅ "Votre commande n°[numero_commande] a été expédiée"
✅ "Votre commande a été expédiée" (si pas de numéro disponible)
```

---

## 2. Cas particuliers

### Client mécontent

```markdown
1. Accusé de réception avec empathie
2. Pas d'excuse excessive (1 seule suffit)
3. Solution concrète immédiate
4. Orientation vers le service client si nécessaire
```

**Exemple**

```
Bonjour [Prénom],

Je comprends parfaitement votre frustration et je suis sincèrement désolé pour cette situation.

Voici ce que je vous propose :
[solution]

Si vous avez besoin d'une assistance complémentaire, notre équipe est disponible via le formulaire de contact.

L'équipe Alltricks
```

### Information incertaine

```markdown
Ne jamais affirmer une information qu'on ne peut pas vérifier.

❌ "Votre colis arrivera demain"
✅ "Les délais habituels sont de 3 à 5 jours ouvrés"

❌ "Votre remboursement a été effectué"
✅ "Les remboursements sont traités sous 5 jours ouvrés"
```

### Vendeur partenaire

Toujours utiliser un template distinct et explicite :

```markdown
Pour un article expédié par un vendeur partenaire, [action spécifique].

Contactez directement le vendeur via :

1. "Mes Commandes & Retours"
2. Sélectionnez l'article
3. Cliquez sur "Contacter le vendeur"
```

---

## 3. Checklist avant envoi

Avant de valider une réponse IA :

- [ ] Le prénom est-il utilisé ?
- [ ] Le ton est-il positif et bienveillant ?
- [ ] La réponse répond-elle à la question ?
- [ ] Y a-t-il une action concrète proposée ?
- [ ] Les liens sont-ils corrects ?
- [ ] La longueur est-elle raisonnable (< 25 lignes) ?
- [ ] Pas de promesse non tenable ?
- [ ] Pas d'information confidentielle ?
- [ ] Distinction Alltricks / Vendeur partenaire si nécessaire ?
- [ ] Signature "L'équipe Alltricks" présente ?
