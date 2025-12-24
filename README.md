# n8n Workflow Playground (Next.js 15)

Dashboard Next.js (App Router) pour exécuter un workflow n8n **sans passer par l’interface n8n**.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS
- UI shadcn-like (composants locaux basés sur Radix)
- React Hook Form + Zod
- Lucide React

## Setup

### 1) Installer les dépendances

```bash
npm install
```

### 2) Configurer les variables d’environnement

Copie `.env.example` vers `.env.local` puis remplis les valeurs:

```bash
copy .env.example .env.local
```

Variables:

- `N8N_WEBHOOK_URL` (obligatoire): URL du webhook n8n.
- `N8N_API_KEY` (optionnel): envoyé en header `x-n8n-api-key`.
- `N8N_BASIC_AUTH_USER` (optionnel): user Basic Auth.
- `N8N_BASIC_AUTH_PASSWORD` (optionnel): password Basic Auth.

### 3) Lancer le projet

```bash
npm run dev
```

Ouvre ensuite `http://localhost:3000`.

## Fonctionnement

- **UI**: formulaire à gauche (1 message client + options), résultats + historique à droite.
- **API**: `POST /api/execute-workflow`
  - Validation Zod côté serveur
  - Timeout 30s + retry 1 fois en cas d’erreur `5xx`
  - Support Basic Auth via header `Authorization: Basic ...` si `N8N_BASIC_AUTH_USER`/`N8N_BASIC_AUTH_PASSWORD` sont définis
  - `executionId` unique (`crypto.randomUUID()`)
  - Rate limit basique: **10 requêtes/minute/IP** (mémoire process)

### Format API

Body:

```json
{
  "input": { "id": "...", "firstname": "...", "lastname": "...", "message": "..." },
  "dryRun": true,
  "jsonPayload": { "optionnel": true }
}
```

Compat legacy (si tu en as besoin):

```json
{ "param1": "...", "param2": "..." }
```

Response:

```json
{
  "success": true,
  "data": {},
  "executedAt": "...",
  "executionId": "...",
  "durationMs": 123
}
```

ou

```json
{
  "success": false,
  "error": { "message": "...", "status": 500 },
  "executedAt": "...",
  "executionId": "...",
  "durationMs": 123
}
```

## Rendu (description)

- Header `n8n Workflow Playground`
- 2 colonnes (responsive):
  - gauche: exécution
  - droite: résultats JSON + table historique (10 entrées)
- Dark mode via classe `dark` sur `<html>` si besoin.

## Notes

- Le webhook n8n n’est jamais exposé côté client: l’appel se fait via l’API Route Next.
- Le rate limit en mémoire est suffisant pour un petit playground; pour la prod, utiliser Redis/Upstash.
