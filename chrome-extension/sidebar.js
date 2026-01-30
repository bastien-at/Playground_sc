const state = {
  context: null,
  config: null,
  emailText: '',
};

function el(id) {
  return document.getElementById(id);
}

function setLoading(buttonId, isLoading) {
  const btn = el(buttonId);
  if (!btn) return;
  if (isLoading) {
    btn.classList.add('loading');
    btn.disabled = true;
  } else {
    btn.classList.remove('loading');
    btn.disabled = false;
  }
}

function setButtonState(buttonId, state, duration = 2000) {
  const btn = el(buttonId);
  if (!btn) return;

  btn.classList.remove('success', 'error', 'loading');

  if (state === 'success' || state === 'error') {
    btn.classList.add(state);
    setTimeout(() => {
      btn.classList.remove(state);
    }, duration);
  }
}

function setStatus(elementId, message, type = 'info', large = false) {
  const statusEl = el(elementId);
  if (!statusEl) return;

  statusEl.className = 'status';

  if (large) {
    const checkIcon =
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>';
    const xIcon =
      '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>';

    if (type === 'success') {
      statusEl.className = 'status statusSuccessLarge';
      statusEl.innerHTML = `${checkIcon}<span>${message}</span>`;
    } else if (type === 'error') {
      statusEl.className = 'status statusErrorLarge';
      statusEl.innerHTML = `${xIcon}<span>${message}</span>`;
    }

    setTimeout(() => {
      statusEl.classList.add('hiding');
      setTimeout(() => {
        statusEl.className = 'status';
        statusEl.textContent = '';
      }, 400);
    }, 4000);
  } else {
    statusEl.textContent = message;

    if (type === 'success') {
      statusEl.className = 'status statusSuccess fadeIn';
    } else if (type === 'error') {
      statusEl.className = 'status statusError fadeIn';
    } else if (type === 'info') {
      statusEl.className = 'status statusInfo fadeIn';
    }
  }
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

    if (text) {
      setStatus(
        'n8nStatus',
        `Email capturé (${src === 'selection' ? 'sélection' : 'page'})`,
        'success',
      );
      setButtonState('captureEmail', 'success', 1500);
    } else {
      setStatus(
        'n8nStatus',
        "Aucun texte email détecté. Essayez de sélectionner le contenu de l'email.",
        'error',
      );
      setButtonState('captureEmail', 'error', 1500);
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
  el('n8nWebhookUrl').value = state.config.n8nWebhookUrl || '';
  el('judgePanel').hidden = true;
  requestContext();

  const applySuggestionResponse = (response) => {
    el('responseSection').hidden = false;

    const categorie = response?.categorie || null;
    const sousCategorie = response?.sousCategorie || null;
    const priorite = response?.priorite || null;
    const actionRecommandee = response?.actionRecommandee || null;

    const hasCategorizationData =
      categorie || sousCategorie || priorite || actionRecommandee;

    if (hasCategorizationData) {
      el('categorizationPanel').hidden = false;

      if (categorie) {
        el('categorieItem').hidden = false;
        el('categorieValue').textContent = categorie;
      } else {
        el('categorieItem').hidden = true;
      }

      if (sousCategorie) {
        el('sousCategorieItem').hidden = false;
        el('sousCategorieValue').textContent = sousCategorie;
      } else {
        el('sousCategorieItem').hidden = true;
      }

      if (priorite) {
        el('prioriteItem').hidden = false;
        el('prioriteValue').textContent = priorite;
      } else {
        el('prioriteItem').hidden = true;
      }

      if (actionRecommandee) {
        el('actionItem').hidden = false;
        el('actionValue').textContent = actionRecommandee;
      } else {
        el('actionItem').hidden = true;
      }
    } else {
      el('categorizationPanel').hidden = true;
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

      const checkIcon =
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>';
      const xIcon =
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>';
      const alertIcon =
        '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>';

      agentBadge.innerHTML = agentStatus ? `Agent: ${agentStatus}` : 'Agent: -';
      judgeBadge.innerHTML = judgeDecision
        ? `Juge: ${judgeDecision}`
        : 'Juge: -';

      const applyBadgeTone = (badgeEl, status) => {
        if (!status) return;
        const s = String(status).toUpperCase();
        const checkIcon =
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>';
        const xIcon =
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>';
        const alertIcon =
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>';

        if (s === 'GO' || s === 'OK' || s === 'ACCEPT' || s === 'SEND') {
          badgeEl.classList.add('badgeGo');
          const currentText = badgeEl.textContent;
          badgeEl.innerHTML = `${checkIcon} ${currentText}`;
        } else if (s === 'REVIEW') {
          badgeEl.classList.add('badgeReview');
          const currentText = badgeEl.textContent;
          badgeEl.innerHTML = `${alertIcon} ${currentText}`;
        } else if (s === 'KO' || s === 'REJECT') {
          badgeEl.classList.add('badgeKo');
          const currentText = badgeEl.textContent;
          badgeEl.innerHTML = `${xIcon} ${currentText}`;
        }
      };

      applyBadgeTone(agentBadge, agentStatus);
      applyBadgeTone(judgeBadge, judgeDecision);

      if (judgeNote !== null) {
        const clamped = Math.max(0, Math.min(10, judgeNote));
        const starIcon =
          '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>';
        judgeScore.innerHTML = `${starIcon} Confiance: ${clamped}/10`;
        progress.style.width = `${clamped * 10}%`;

        if (clamped >= 7) {
          progress.style.background = 'hsl(var(--primary))';
        } else if (clamped >= 4) {
          progress.style.background = 'rgba(217, 119, 6, 1)';
        } else {
          progress.style.background = 'rgba(220, 38, 38, 1)';
        }
      } else {
        judgeScore.innerHTML = 'Confiance: -';
        progress.style.width = '0%';
        progress.style.background = 'hsl(var(--primary))';
      }

      comment.textContent = response?.judgeCommentaire
        ? String(response.judgeCommentaire)
        : '';
    }

    el('n8nSuggestion').value = response?.suggestion || '';
  };

  el('closeDrawer').addEventListener('click', () => {
    window.parent.postMessage(
      { source: 'sf-advisor-sidebar', type: 'closeDrawer' },
      '*',
    );
  });

  el('copySuggestion').addEventListener('click', async () => {
    const text = el('n8nSuggestion').value || '';
    if (!text) {
      setStatus('n8nStatus', 'Aucune réponse à copier', 'error');
      setButtonState('copySuggestion', 'error', 1500);
      return;
    }

    setLoading('copySuggestion', true);
    await copy(text);
    setLoading('copySuggestion', false);
    setStatus('n8nStatus', 'Réponse copiée dans le presse-papiers', 'success');
    setButtonState('copySuggestion', 'success', 1500);
  });

  el('sendTicketToMailbot').addEventListener('click', async () => {
    const ticketId = state.context?.recordId || '';
    if (!ticketId) {
      setStatus(
        'mailbotStatus',
        "Impossible de détecter l'ID du ticket sur cette page",
        'error',
      );
      setButtonState('sendTicketToMailbot', 'error', 2000);
      return;
    }

    setLoading('sendTicketToMailbot', true);
    setStatus('mailbotStatus', 'Génération de la réponse en cours...', 'info');

    const emailText = (el('emailText')?.value || '').trim();

    chrome.runtime.sendMessage(
      {
        type: 'mailbotTicketFlow',
        payload: {
          ticketId,
          message: emailText,
          salesforceUrl: state.context?.href || '',
        },
      },
      async (response) => {
        setLoading('sendTicketToMailbot', false);
        const err = chrome.runtime.lastError;
        if (err) {
          setStatus(
            'mailbotStatus',
            `Erreur extension: ${err.message}`,
            'error',
          );
          setButtonState('sendTicketToMailbot', 'error', 2000);
          return;
        }

        if (!response?.ok) {
          setStatus(
            'mailbotStatus',
            `Erreur Mailbot: ${response?.error || 'UNKNOWN'}`,
            'error',
          );
          setButtonState('sendTicketToMailbot', 'error', 2000);
          const details =
            response?.details || response?.debug
              ? JSON.stringify(
                  {
                    details: response?.details ?? null,
                    debug: response?.debug ?? null,
                  },
                  null,
                  2,
                )
              : '';
          if (details) {
            el('n8nSuggestion').value = details;
          }
          return;
        }

        applySuggestionResponse(response);
        setStatus(
          'mailbotStatus',
          'Réponse générée avec succès',
          'success',
          true,
        );
        setButtonState('sendTicketToMailbot', 'success', 2000);
      },
    );
  });
}

main();
