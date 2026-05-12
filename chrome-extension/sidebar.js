const state = {
  context: null,
  config: null,
  generationStart: null,
};

function el(id) {
  return document.getElementById(id);
}

// ---- View navigation ----
function showView(id) {
  ['viewHome', 'viewResponse'].forEach((v) => {
    const node = el(v);
    if (node) node.hidden = v !== id;
  });
}

// ---- Ticket strip (update both home + response) ----
function updateTicketStrips(recordId, subject, lang, priority) {
  const pairs = [
    ['ticketId', 'ticketSubject', 'ticketLang', 'ticketPriority'],
    ['ticketIdResp', 'ticketSubjectResp', 'ticketLangResp', 'ticketPriorityResp'],
  ];
  pairs.forEach(([idEl, subEl, langEl, prioEl]) => {
    const tid  = el(idEl);
    const tsub = el(subEl);
    const tlng = el(langEl);
    const tpri = el(prioEl);
    if (tid)  tid.textContent  = recordId ? `#${recordId}` : '--';
    if (tsub) tsub.textContent = subject  || (recordId ? 'Ticket Salesforce' : "En attente d'un ticket…");
    if (tlng) tlng.textContent = lang     || '--';
    if (tpri) {
      tpri.textContent = priority || '--';
      tpri.className = 'mb-priority' + (priority ? '' : ' mb-priority--none');
    }
  });
}

// ---- Button states ----
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

function setButtonState(buttonId, feedbackState, duration = 2000) {
  const btn = el(buttonId);
  if (!btn) return;
  btn.classList.remove('success', 'error', 'loading');
  if (feedbackState === 'success' || feedbackState === 'error') {
    btn.classList.add(feedbackState);
    setTimeout(() => btn.classList.remove(feedbackState), duration);
  }
}

// ---- Status messages ----
const CHECK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12l5 5L20 6"/></svg>`;
const X_SVG    = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6L6 18"/></svg>`;

function setStatus(elementId, message, type = 'info') {
  const node = el(elementId);
  if (!node) return;
  node.className = 'mb-status';
  if (!message) { node.innerHTML = ''; return; }

  if (type === 'success') {
    node.classList.add('mb-status--success');
    node.innerHTML = `${CHECK_SVG}<span>${message}</span>`;
  } else if (type === 'error') {
    node.classList.add('mb-status--error');
    node.innerHTML = `${X_SVG}<span>${message}</span>`;
  } else {
    node.classList.add('mb-status--info');
    node.textContent = message;
  }
}

// ---- Clipboard ----
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

// ---- Config ----
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

// ---- Salesforce context request ----
function requestContext() {
  window.parent.postMessage({ source: 'sf-advisor-sidebar', type: 'requestContext' }, '*');
}

// ---- Judge banner HTML builder ----
const ICON_CHECK = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12l5 5L20 6"/></svg>`;
const ICON_ALERT = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l10 18H2L12 3z"/><path d="M12 10v5M12 18v.5"/></svg>`;
const ICON_X     = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6L6 18"/></svg>`;

const VERDICT_MAP = {
  SEND: {
    cls: 'send',
    label: 'À envoyer',
    eyebrow: 'Verdict du juge · SEND',
    defaultSub: 'Réponse validée par le juge IA — prête à copier-coller.',
    icon: ICON_CHECK,
  },
  REVIEW: {
    cls: 'review',
    label: 'À relire',
    eyebrow: 'Verdict du juge · REVIEW',
    defaultSub: 'Vérifiez les points soulevés avant envoi.',
    icon: ICON_ALERT,
  },
  REJECT: {
    cls: 'reject',
    label: 'À rejeter',
    eyebrow: 'Verdict du juge · REJECT',
    defaultSub: 'Réponse non conforme — régénérez ou rédigez manuellement.',
    icon: ICON_X,
  },
};

function resolveVerdict(agentStatus, judgeDecision) {
  // Judge decision always takes precedence over agent status
  if (judgeDecision) {
    const jd = String(judgeDecision).toUpperCase();
    if (['SEND', 'ACCEPT', 'GO'].includes(jd)) return 'SEND';
    if (jd === 'REVIEW') return 'REVIEW';
    if (['REJECT', 'KO'].includes(jd)) return 'REJECT';
  }
  // Fallback: derive verdict from agent status when there is no judge
  if (agentStatus) {
    const as = String(agentStatus).toUpperCase();
    if (['GO', 'OK', 'ACCEPT'].includes(as)) return 'SEND';
    if (as === 'REVIEW') return 'REVIEW';
    if (['KO', 'REJECT'].includes(as)) return 'REJECT';
  }
  return null;
}

function buildJudgeBannerHTML(verdict, score, commentaire) {
  const v = VERDICT_MAP[verdict] || VERDICT_MAP['REVIEW'];
  const scoreText = score !== null && score !== undefined ? score : '–';
  const sub = commentaire || v.defaultSub;

  return `
    <div class="mb-judge-banner mb-judge-banner--${v.cls}">
      <div class="mb-judge-top">
        <div class="mb-judge-icon">${v.icon}</div>
        <div class="mb-judge-left">
          <div class="mb-judge-eyebrow">${v.eyebrow}</div>
          <div class="mb-judge-label">${v.label}</div>
        </div>
        <div class="mb-judge-score-circle">
          <span class="mb-judge-score-num">${scoreText}</span>
          <span class="mb-judge-score-den">/10</span>
        </div>
      </div>
      <div class="mb-judge-sub">${sub}</div>
    </div>
  `;
}

function buildNoteRowHTML(tone, text) {
  const icons = {
    ok:   { cls: 'mb-note-icon--ok',   icon: ICON_CHECK },
    warn: { cls: 'mb-note-icon--warn', icon: ICON_ALERT },
    bad:  { cls: 'mb-note-icon--bad',  icon: ICON_X },
  };
  const t = icons[tone] || icons.warn;
  return `
    <div class="mb-note-row">
      <div class="mb-note-icon ${t.cls}">${t.icon}</div>
      <span>${text}</span>
    </div>
  `;
}

// ---- Footer time ----
function updateFooterTime(seconds) {
  const s = `${seconds}s`;
  ['footerTime', 'footerTime2'].forEach((id) => {
    const node = el(id);
    if (node) node.textContent = s;
  });
}

// ---- Apply response to the UI ----
function applySuggestionResponse(response, elapsed) {
  // Response text
  el('n8nSuggestion').value = response?.suggestion || '';

  // Subtitle
  if (elapsed) {
    el('responseSubtitle').textContent = `Mailbot · ${elapsed}s`;
  }

  // -- Judge banner --
  const agentStatus  = response?.status         ? String(response.status)        : null;
  const judgeDecision = response?.judgeDecision  ? String(response.judgeDecision) : null;
  const judgeNote    = typeof response?.judgeNote === 'number' ? response.judgeNote : null;
  const judgeComment = response?.judgeCommentaire ? String(response.judgeCommentaire) : null;

  const verdict = resolveVerdict(agentStatus, judgeDecision);
  const bannerWrap = el('judgeBannerWrap');

  if (verdict) {
    bannerWrap.innerHTML = buildJudgeBannerHTML(verdict, judgeNote, judgeComment);

    // Update ticket strip priority colour
    const prioNodes = [el('ticketPriority'), el('ticketPriorityResp')];
    prioNodes.forEach((n) => {
      if (!n) return;
      if (verdict === 'REJECT') n.style.color = 'var(--bad-600)';
      else if (verdict === 'REVIEW') n.style.color = 'var(--warn-600)';
      else n.style.color = 'var(--ok-600)';
    });
  } else {
    bannerWrap.innerHTML = '';
  }

  // -- Judge notes --
  const notesEl = el('judgeNotes');
  const notesWrap = el('judgeNotesWrap');
  notesEl.innerHTML = '';

  const toneForVerdict = verdict === 'SEND' ? 'ok' : verdict === 'REVIEW' ? 'warn' : 'bad';

  if (judgeComment) {
    notesEl.innerHTML = buildNoteRowHTML(toneForVerdict, judgeComment);
    notesWrap.hidden = false;
  } else if (verdict) {
    // Generic notes per verdict
    const genericNotes = {
      SEND: [
        { t: 'ok',   text: 'Ton conforme aux guidelines Alltricks' },
        { t: 'ok',   text: 'Réponse validée — prête à l\'envoi' },
      ],
      REVIEW: [
        { t: 'warn', text: 'Points à vérifier avant envoi' },
        { t: 'ok',   text: 'Structure de la réponse correcte' },
      ],
      REJECT: [
        { t: 'bad',  text: 'Réponse non conforme aux guidelines' },
        { t: 'warn', text: 'Régénérez ou rédigez manuellement' },
      ],
    };
    (genericNotes[verdict] || []).forEach(({ t, text }) => {
      notesEl.innerHTML += buildNoteRowHTML(t, text);
    });
    notesWrap.hidden = false;
  } else {
    notesWrap.hidden = true;
  }

  // -- Categorization --
  const categorie       = response?.categorie        || null;
  const sousCategorie   = response?.sousCategorie    || null;
  const priorite        = response?.priorite         || null;
  const actionRecommandee = response?.actionRecommandee || null;

  const hasCat = categorie || sousCategorie || priorite || actionRecommandee;
  el('categorizationPanel').hidden = !hasCat;

  if (hasCat) {
    const setItem = (itemId, valueId, val) => {
      el(itemId).hidden = !val;
      if (val) el(valueId).textContent = val;
    };
    setItem('categorieItem',    'categorieValue',    categorie);
    setItem('sousCategorieItem','sousCategorieValue', sousCategorie);
    setItem('prioriteItem',     'prioriteValue',     priorite);
    setItem('actionItem',       'actionValue',       actionRecommandee);

    // Update priority in ticket strip
    if (priorite) updateTicketStrips(state.context?.recordId, null, null, priorite);
  }

  if (elapsed) updateFooterTime(elapsed);
}

// ---- Generate flow ----
function triggerGeneration(fromResponse = false) {
  const ticketId = state.context?.recordId || '';
  const statusId = fromResponse ? 'mailbotStatus' : 'homeStatus';

  if (!ticketId) {
    setStatus(statusId, "Impossible de détecter l'ID du ticket sur cette page", 'error');
    setButtonState(fromResponse ? 'regenerateBtnAlt' : 'generateBtn', 'error', 2000);
    return;
  }

  const genBtnId = fromResponse ? 'regenerateBtnAlt' : 'generateBtn';
  setLoading(genBtnId, true);
  if (fromResponse) setLoading('regenerateBtn', true);

  setStatus(statusId, 'Génération de la réponse en cours…', 'info');
  state.generationStart = Date.now();

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
    (response) => {
      const elapsed = ((Date.now() - state.generationStart) / 1000).toFixed(1);

      setLoading(genBtnId, false);
      if (fromResponse) setLoading('regenerateBtn', false);

      const err = chrome.runtime.lastError;
      if (err) {
        setStatus(statusId, `Erreur extension : ${err.message}`, 'error');
        setButtonState(genBtnId, 'error', 2000);
        return;
      }

      if (!response?.ok) {
        const errCode = response?.error || 'UNKNOWN';
        let errMsg = `Erreur Mailbot : ${errCode}`;

        if (errCode === 'MAILBOT_MESSAGE_MISSING') {
          errMsg = "Email client introuvable — colle le texte dans le champ ci-dessous et réessaie.";
          // Open context section so the user sees the textarea immediately
          const details = el('contextDetails');
          if (details) details.open = true;
          if (!fromResponse) showView('viewHome');
          setTimeout(() => el('emailText')?.focus(), 150);
        } else if (errCode.startsWith('DATA_MAILBOT_HTTP_')) {
          errMsg = `Webhook data-mailbot inaccessible (${errCode}). Vérifie que le workflow n8n est actif.`;
        }

        setStatus(statusId, errMsg, 'error');
        setButtonState(genBtnId, 'error', 2000);
        const details =
          response?.details || response?.debug
            ? JSON.stringify({ details: response?.details ?? null, debug: response?.debug ?? null }, null, 2)
            : '';
        if (details && el('n8nSuggestion')) el('n8nSuggestion').value = details;
        return;
      }

      setStatus(statusId, '', null);
      applySuggestionResponse(response, elapsed);
      showView('viewResponse');
    },
  );
}

// ---- Message listener (Salesforce context) ----
window.addEventListener('message', (event) => {
  const data = event?.data;
  if (!data || data.source !== 'sf-advisor-sidebar') return;

  if (data.type === 'context') {
    state.context = data.payload;
    const recordId   = state.context?.recordId || null;
    const objectName = state.context?.objectApiName || null;
    const subject    = objectName && recordId ? `${objectName} · ${recordId}` : (objectName || null);
    updateTicketStrips(recordId, subject, null, null);
    el('headerSub').textContent = recordId ? `Connecté · ${recordId}` : 'Connecté · prêt';
  }

  if (data.type === 'emailText') {
    const text = data?.payload?.text || '';
    state.emailText = text;
    if (el('emailText')) el('emailText').value = text;

    const src = data?.payload?.source;
    if (text) {
      setStatus('homeStatus', `Email capturé (${src === 'selection' ? 'sélection' : 'page'})`, 'success');
    } else {
      setStatus('homeStatus', "Aucun texte email détecté. Essayez de sélectionner le contenu.", 'error');
    }
  }
});

// ---- Main ----
async function main() {
  state.config = await loadConfig();
  el('n8nWebhookUrl').value = state.config.n8nWebhookUrl || '';

  requestContext();

  // Close drawer
  el('closeDrawer').addEventListener('click', () => {
    window.parent.postMessage({ source: 'sf-advisor-sidebar', type: 'closeDrawer' }, '*');
  });

  // Generate
  el('generateBtn').addEventListener('click', () => triggerGeneration(false));

  // Back to home
  el('backToHome').addEventListener('click', () => {
    setStatus('mailbotStatus', '', null);
    showView('viewHome');
  });

  // Regenerate (header icon)
  el('regenerateBtn').addEventListener('click', () => triggerGeneration(true));

  // Regenerate (action row button)
  el('regenerateBtnAlt').addEventListener('click', () => triggerGeneration(true));

  // Copy
  el('copySuggestion').addEventListener('click', async () => {
    const text = el('n8nSuggestion').value || '';
    if (!text) {
      setStatus('mailbotStatus', 'Aucune réponse à copier', 'error');
      setButtonState('copySuggestion', 'error', 1500);
      return;
    }
    setLoading('copySuggestion', true);
    await copy(text);
    setLoading('copySuggestion', false);
    setStatus('mailbotStatus', 'Réponse copiée dans le presse-papiers', 'success');
    setButtonState('copySuggestion', 'success', 1500);
  });
}

main();
