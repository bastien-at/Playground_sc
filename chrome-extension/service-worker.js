chrome.runtime.onInstalled.addListener(async () => {
  const existing = await chrome.storage.sync.get(['sfSidebarConfig']);
  if (!existing?.sfSidebarConfig) {
    await chrome.storage.sync.set({
      sfSidebarConfig: {
        workflowApiUrl: '',
        n8nWebhookUrl:
          'https://n8n.srv1094459.hstgr.cloud/webhook/mailbot-test',
        n8nApiKeyHeaderName: '',
        n8nApiKey: '',
        checklist: [
          { id: 'identity', label: "Vérifier l'identité", checked: false },
          { id: 'need', label: 'Qualifier le besoin', checked: false },
          {
            id: 'next',
            label: 'Planifier la prochaine action',
            checked: false,
          },
        ],
      },
    });
  }
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (
    !message ||
    (message.type !== 'n8nSuggest' &&
      message.type !== 'executeWorkflow' &&
      message.type !== 'mailbotTicketFlow')
  )
    return;

  (async () => {
    try {
      const { sfSidebarConfig } = await chrome.storage.sync.get([
        'sfSidebarConfig',
      ]);

      const parseN8nText = (text) => {
        if (typeof text !== 'string') {
          return { suggestion: '' };
        }

        let json;
        try {
          json = JSON.parse(text);
        } catch {
          return { suggestion: text };
        }

        const item = Array.isArray(json) ? json[0] : json;

        // Support both FR field names (reponse) and EN nested format (response.gemini)
        const reponse = item?.reponse;
        const gemini = item?.response?.gemini;

        // Agent status: GO / KO
        const status = reponse?.status ?? gemini?.status ?? null;

        // Judge: check both format locations
        const judge = reponse?.judge ?? gemini?.judge ?? item?.judge ?? null;

        // Suggestion text:
        //   - GO:  reponse.message  OR  gemini.response
        //   - KO:  reponse.template_conseiller  OR  reponse.reason
        const suggestion =
          reponse?.message ??
          gemini?.response ??
          gemini?.message ??
          reponse?.template_conseiller ??
          reponse?.reason ??
          item?.suggestion ??
          item?.reply ??
          item?.answer ??
          item?.text ??
          json?.suggestion ??
          json?.reply ??
          json?.answer ??
          json?.text ??
          (typeof json === 'string' ? json : JSON.stringify(json, null, 2));

        // Categorization: motif_details > motif (object) > gemini metadata
        const motifRaw = item?.motif;
        const motifObj = motifRaw && typeof motifRaw === 'object' ? motifRaw : null;
        const motifDetails = item?.motif_details ?? motifObj ?? null;

        return {
          suggestion,
          status,
          judgeDecision: judge?.decision ?? null,
          judgeNote: typeof judge?.note === 'number' ? judge.note : null,
          judgeCommentaire: judge?.commentaire ?? null,
          categorie: motifDetails?.categorie ?? null,
          sousCategorie: motifDetails?.sous_categorie ?? null,
          priorite: motifDetails?.priorite ?? null,
          actionRecommandee: motifDetails?.action_recommandee ?? null,
          raw: json,
        };
      };

      const firstString = (...values) => {
        for (const v of values) {
          if (typeof v === 'string' && v.trim()) return v.trim();
        }
        return '';
      };

      if (message.type === 'mailbotTicketFlow') {
        const ticketId =
          typeof message?.payload?.ticketId === 'string'
            ? message.payload.ticketId
            : '';
        if (!ticketId) {
          sendResponse({ ok: false, error: 'TICKET_ID_MISSING' });
          return;
        }

        const userMessage =
          typeof message?.payload?.message === 'string'
            ? message.payload.message
            : '';

        const headers = {
          'content-type': 'application/json',
        };

        const apiKeyHeaderName = sfSidebarConfig?.n8nApiKeyHeaderName;
        const apiKey = sfSidebarConfig?.n8nApiKey;
        if (apiKeyHeaderName && apiKey) {
          headers[apiKeyHeaderName] = apiKey;
        }

        const dataWebhookUrl =
          'https://n8n.srv1094459.hstgr.cloud/webhook/data-mailbot';
        const mailbotWebhookUrl =
          'https://n8n.srv1094459.hstgr.cloud/webhook/mailbot-test';

        const payload1 = {
          id: ticketId,
        };

        const res1 = await fetch(dataWebhookUrl, {
          method: 'POST',
          headers,
          body: JSON.stringify(payload1),
        });

        const json1 = await res1.json().catch(() => null);

        // If data-mailbot fails but the user already provided their own message,
        // we can still proceed without blocking the whole flow.
        if (!res1.ok || !json1) {
          if (!userMessage) {
            sendResponse({
              ok: false,
              error: `DATA_MAILBOT_HTTP_${res1.status}`,
              details: json1 ?? null,
            });
            return;
          }
          // Fall through with empty ticket data — userMessage takes priority below
        }

        const item1 = json1 ? (Array.isArray(json1) ? json1[0] : json1) : {};
        const finalMessage = firstString(
          userMessage,
          item1?.message,
          item1?.payload?.message,
          item1?.data?.message,
          item1?.body?.message,
          item1?.input,
          item1?.emailText,
        );

        if (!finalMessage) {
          sendResponse({
            ok: false,
            error: 'MAILBOT_MESSAGE_MISSING',
            details: {
              ticketId,
              receivedFromDataMailbot: json1,
              hint: "Le textarea emailText est vide et data-mailbot n'a pas renvoyé de message. Clique 'Capturer le texte de l'email' ou remplis le textarea avant d'envoyer.",
            },
            debug: {
              payloadSentToDataMailbot: payload1,
              extractedItemFromDataMailbot: item1,
              userMessage,
            },
          });
          return;
        }

        const firstname = firstString(
          item1?.firstname,
          item1?.payload?.firstname,
          item1?.data?.firstname,
        );
        const lastname = firstString(
          item1?.lastname,
          item1?.payload?.lastname,
          item1?.data?.lastname,
        );
        const email = firstString(
          item1?.email,
          item1?.payload?.email,
          item1?.data?.email,
        );

        const payload2 = {
          firstname: firstname || undefined,
          lastname: lastname || undefined,
          email: email || undefined,
          message: finalMessage,
          emailText: finalMessage,
          customer_message: finalMessage,
          input: finalMessage,
          ticketId,
          salesforceUrl:
            typeof message?.payload?.salesforceUrl === 'string'
              ? message.payload.salesforceUrl
              : '',
          dataMailbot: item1,
        };

        const res2 = await fetch(mailbotWebhookUrl, {
          method: 'POST',
          headers,
          body: JSON.stringify(payload2),
        });

        const text2 = await res2.text();
        let json2 = null;
        try {
          json2 = text2 ? JSON.parse(text2) : null;
        } catch {
          json2 = null;
        }
        if (!res2.ok) {
          sendResponse({
            ok: false,
            error: `MAILBOT_TEST_HTTP_${res2.status}`,
            details: json2 ?? text2 ?? null,
            debug: {
              payloadSentToMailbotTest: payload2,
              mailbotTestRawText: text2,
            },
          });
          return;
        }

        const parsed = parseN8nText(text2);
        sendResponse({
          ok: true,
          ...parsed,
          data: json1,
          result: json2,
          debug: {
            payloadSentToMailbotTest: payload2,
            mailbotTestRawText: text2,
          },
        });
        return;
      }

      // Preferred path: call the same Next API route used by the app.
      if (message.type === 'executeWorkflow') {
        const apiUrl =
          (message?.apiUrl && typeof message.apiUrl === 'string'
            ? message.apiUrl
            : null) || sfSidebarConfig?.workflowApiUrl;
        if (!apiUrl) {
          sendResponse({ ok: false, error: 'WORKFLOW_API_URL_MISSING' });
          return;
        }

        const headers = {
          'content-type': 'application/json',
        };

        const apiKeyHeaderName = sfSidebarConfig?.n8nApiKeyHeaderName;
        const apiKey = sfSidebarConfig?.n8nApiKey;
        if (apiKeyHeaderName && apiKey) {
          headers[apiKeyHeaderName] = apiKey;
        }

        const res = await fetch(apiUrl, {
          method: 'POST',
          headers,
          body: JSON.stringify(message.payload ?? {}),
        });

        const json = await res.json().catch(() => null);
        if (!res.ok || !json) {
          sendResponse({
            ok: false,
            error: `WORKFLOW_HTTP_${res.status}`,
            details: json ?? null,
          });
          return;
        }

        if (!json.success) {
          sendResponse({
            ok: false,
            error: json?.error?.code || 'WORKFLOW_ERROR',
            details: json?.error?.message || json,
          });
          return;
        }

        const data = json.data;
        const suggestion =
          data?.response?.gemini?.response ??
          data?.response?.gemini?.message ??
          data?.reponse ??
          data?.suggestion ??
          JSON.stringify(data, null, 2);
        const status = data?.response?.gemini?.status ?? null;
        const koReason = data?.response?.gemini?.ko_reason ?? null;

        sendResponse({ ok: true, suggestion, status, koReason, raw: json });
        return;
      }

      const webhookUrl = sfSidebarConfig?.n8nWebhookUrl;
      if (!webhookUrl) {
        sendResponse({ ok: false, error: 'N8N_WEBHOOK_URL_MISSING' });
        return;
      }

      const headers = {
        'content-type': 'application/json',
      };

      const apiKeyHeaderName = sfSidebarConfig?.n8nApiKeyHeaderName;
      const apiKey = sfSidebarConfig?.n8nApiKey;
      if (apiKeyHeaderName && apiKey) {
        headers[apiKeyHeaderName] = apiKey;
      }

      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(message.payload ?? {}),
      });

      const text = await res.text();
      if (!res.ok) {
        let errJson = null;
        try {
          errJson = text ? JSON.parse(text) : null;
        } catch {
          errJson = null;
        }

        // n8n test webhook common error: not registered / one-shot expired
        if (errJson?.code === 404 && typeof errJson?.message === 'string') {
          sendResponse({
            ok: false,
            error: 'N8N_WEBHOOK_NOT_REGISTERED',
            details: errJson?.hint
              ? `${errJson.message}\n${errJson.hint}`
              : errJson.message,
          });
          return;
        }

        sendResponse({
          ok: false,
          error: `N8N_HTTP_${res.status}`,
          details: errJson ?? text,
        });
        return;
      }

      const parsed = parseN8nText(text);
      sendResponse({ ok: true, ...parsed });
    } catch (err) {
      sendResponse({
        ok: false,
        error: 'N8N_REQUEST_FAILED',
        details: String(err),
      });
    }
  })();

  return true;
});
