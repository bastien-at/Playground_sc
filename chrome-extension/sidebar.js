const state = {
  context: null,
  config: null,
  emailText: '',
};

function el(id) {
  return document.getElementById(id);
}

async function loadConfig() {
  const res = await chrome.storage.sync.get(['sfSidebarConfig']);
  return (
    res.sfSidebarConfig || {
      title: 'Assistant Conseiller',
      workflowApiUrl: '',
      n8nWebhookUrl: '',
      n8nApiKeyHeaderName: '',
      n8nApiKey: '',
      checklist: [],
    }
  );
}

function requestContext() {
  window.parent.postMessage(
    { source: 'sf-advisor-sidebar', type: 'requestContext' },
    '*',
  );
}

function requestEmailText() {
  window.parent.postMessage(
    { source: 'sf-advisor-sidebar', type: 'requestEmailText' },
    '*',
  );
}

window.addEventListener('message', (event) => {
  const data = event?.data;
  if (!data || data.source !== 'sf-advisor-sidebar') return;

  if (data.type === 'context') {
    state.context = data.payload;
    const parts = [];
    if (state.context?.objectApiName) parts.push(state.context.objectApiName);
    if (state.context?.recordId) parts.push(state.context.recordId);
    el('subtitle').textContent = parts.length
      ? parts.join(' · ')
      : state.context?.host || '';
  }

  if (data.type === 'emailText') {
    const text = data?.payload?.text || '';
    state.emailText = text;
    el('emailText').value = text;
    const src = data?.payload?.source;
    el('n8nStatus').textContent = text
      ? `Email capturé (${src === 'selection' ? 'sélection' : 'page'}).`
      : "Aucun texte email détecté (essaie de sélectionner le contenu de l'email).";
  }

  if (data.type === 'pasteResult') {
    if (data?.payload?.ok) {
      el('n8nStatus').textContent = 'Collé dans Salesforce.';
    } else if (data?.payload?.error === 'NO_FOCUSED_FIELD') {
      el('n8nStatus').textContent =
        'Clique d’abord dans le champ Salesforce où coller la réponse.';
    } else {
      el('n8nStatus').textContent = 'Impossible de coller dans Salesforce.';
    }
  }
});

async function copy(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }
}

async function main() {
  state.config = await loadConfig();
  el('title').textContent = state.config.title || 'Assistant';
  el('n8nWebhookUrl').value = state.config.n8nWebhookUrl || '';
  el('judgePanel').hidden = true;
  requestContext();

  el('closeDrawer').addEventListener('click', () => {
    window.parent.postMessage(
      { source: 'sf-advisor-sidebar', type: 'closeDrawer' },
      '*',
    );
  });

  el('captureEmail').addEventListener('click', async () => {
    el('n8nStatus').textContent = 'Capture du texte email…';
    requestEmailText();
  });

  el('saveN8n').addEventListener('click', async () => {
    state.config.n8nWebhookUrl = (el('n8nWebhookUrl').value || '').trim();
    await chrome.storage.sync.set({ sfSidebarConfig: state.config });
    el('n8nStatus').textContent = state.config.n8nWebhookUrl
      ? 'Webhook enregistré.'
      : 'Webhook vide.';
  });

  el('suggestN8n').addEventListener('click', async () => {
    el('n8nStatus').textContent = 'Appel n8n en cours…';
    el('n8nSuggestion').value = '';

    const webhookUrl = (el('n8nWebhookUrl').value || '').trim();
    if (!webhookUrl) {
      el('n8nStatus').textContent =
        'Renseigne le Webhook URL (n8n) avant de suggérer.';
      return;
    }

    const emailText = (el('emailText').value || '').trim();
    if (!emailText) {
      el('n8nStatus').textContent =
        "Colle ou capture le texte de l'email avant de suggérer.";
      return;
    }

    const firstname = (el('firstname').value || '').trim();
    const lastname = (el('lastname').value || '').trim();

    state.config.n8nWebhookUrl = webhookUrl;
    await chrome.storage.sync.set({ sfSidebarConfig: state.config });

    chrome.runtime.sendMessage(
      {
        type: 'n8nSuggest',
        payload: {
          firstname,
          lastname,
          message: emailText,
          salesforceUrl: state.context?.href || '',
        },
      },
      async (response) => {
        const err = chrome.runtime.lastError;
        if (err) {
          el('n8nStatus').textContent = `Erreur extension: ${err.message}`;
          return;
        }

        if (!response?.ok) {
          const e = response?.error || 'UNKNOWN';
          el('n8nStatus').textContent = `n8n: ${e}`;
          if (response?.details) {
            el('n8nSuggestion').value = String(response.details);
          }
          return;
        }

        const parts = [];
        if (response?.status) parts.push(String(response.status));
        if (response?.priorite) parts.push(`Priorité: ${response.priorite}`);
        if (response?.categorie) parts.push(`Catégorie: ${response.categorie}`);
        if (response?.sousCategorie) {
          parts.push(`Sous-catégorie: ${response.sousCategorie}`);
        }
        el('n8nStatus').textContent = parts.length
          ? parts.join(' · ')
          : 'Suggestion reçue.';
        if (response?.actionRecommandee) {
          el('n8nStatus').textContent +=
            `\nAction: ${response.actionRecommandee}`;
        }

        const agentStatus = response?.status ? String(response.status) : null;
        const judgeDecision = response?.judgeDecision
          ? String(response.judgeDecision)
          : null;
        const judgeNote =
          typeof response?.judgeNote === 'number' ? response.judgeNote : null;

        const hasJudge = Boolean(
          agentStatus ||
          judgeDecision ||
          judgeNote !== null ||
          response?.judgeCommentaire,
        );
        el('judgePanel').hidden = !hasJudge;

        if (hasJudge) {
          const agentBadge = el('agentStatusBadge');
          const judgeBadge = el('judgeDecisionBadge');
          const judgeScore = el('judgeScore');
          const progress = el('judgeProgress');
          const comment = el('judgeComment');

          agentBadge.className = 'badge';
          judgeBadge.className = 'badge';

          agentBadge.textContent = agentStatus
            ? `Agent: ${agentStatus}`
            : 'Agent: -';
          judgeBadge.textContent = judgeDecision
            ? `Juge: ${judgeDecision}`
            : 'Juge: -';

          const applyBadgeTone = (badgeEl, status) => {
            if (!status) return;
            const s = String(status).toUpperCase();
            if (s === 'GO' || s === 'OK' || s === 'ACCEPT' || s === 'SEND') {
              badgeEl.classList.add('badgeGo');
            } else if (s === 'REVIEW') {
              badgeEl.classList.add('badgeReview');
            } else if (s === 'KO' || s === 'REJECT') {
              badgeEl.classList.add('badgeKo');
            }
          };

          applyBadgeTone(agentBadge, agentStatus);
          applyBadgeTone(judgeBadge, judgeDecision);

          if (judgeNote !== null) {
            const clamped = Math.max(0, Math.min(10, judgeNote));
            judgeScore.textContent = `Confiance: ${clamped}/10`;
            progress.style.width = `${clamped * 10}%`;

            if (clamped >= 7) {
              progress.style.background = 'hsl(var(--primary))';
            } else if (clamped >= 4) {
              progress.style.background = 'rgba(217, 119, 6, 1)';
            } else {
              progress.style.background = 'rgba(220, 38, 38, 1)';
            }
          } else {
            judgeScore.textContent = 'Confiance: -';
            progress.style.width = '0%';
            progress.style.background = 'hsl(var(--primary))';
          }

          comment.textContent = response?.judgeCommentaire
            ? String(response.judgeCommentaire)
            : '';
        }
        el('n8nSuggestion').value = response?.suggestion || '';
      },
    );
  });

  el('copySuggestion').addEventListener('click', async () => {
    await copy(el('n8nSuggestion').value || '');
  });

  el('pasteSuggestion').addEventListener('click', async () => {
    const text = el('n8nSuggestion').value || '';
    if (!text) {
      el('n8nStatus').textContent = 'Aucune suggestion à coller.';
      return;
    }

    window.parent.postMessage(
      {
        source: 'sf-advisor-sidebar',
        type: 'pasteIntoSalesforce',
        payload: { text },
      },
      '*',
    );
  });

  el('copyRecordId').addEventListener('click', async () => {
    const id = state.context?.recordId || '';
    await copy(id);
  });

  el('copyUrl').addEventListener('click', async () => {
    const href = state.context?.href || '';
    await copy(href);
  });
}

main();
