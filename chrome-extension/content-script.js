(() => {
  const EXT_ROOT_ID = 'sf-advisor-sidebar-root';
  const TOGGLE_ID = 'sf-advisor-sidebar-toggle';
  const DOCK_STYLE_ID = 'sf-advisor-sidebar-dock-style';
  const SIDEBAR_WIDTH_PX = 360;

  const isLightning = /\.lightning\.force\.com$/i.test(location.hostname);
  const isSalesforceDomain =
    /salesforce\.com$/i.test(location.hostname) ||
    /\.my\.salesforce\.com$/i.test(location.hostname);
  if (!isLightning && !isSalesforceDomain) return;

  function parseContext() {
    const url = new URL(location.href);
    const ctx = {
      href: url.href,
      host: url.host,
      pathname: url.pathname,
      recordId: null,
      objectApiName: null,
    };

    const lightningR = url.pathname.match(/\/lightning\/r\/([^/]+)\/([^/]+)\//);
    if (lightningR) {
      ctx.objectApiName = lightningR[1];
      ctx.recordId = lightningR[2];
      return ctx;
    }

    const lightningN = url.pathname.match(/\/lightning\/n\/([^/]+)/);
    if (lightningN) {
      ctx.objectApiName = 'nav';
      ctx.recordId = null;
      return ctx;
    }

    return ctx;
  }

  function getSelectedText() {
    const sel = window.getSelection?.();
    const text = sel ? String(sel.toString() || '') : '';
    return text.trim();
  }

  function bestEffortEmailTextFromDom() {
    const candidates = [];

    const pushCandidate = (el) => {
      if (!el) return;
      const text = (el.innerText || el.textContent || '').trim();
      if (text && text.length >= 40) {
        candidates.push({ el, text });
      }
    };

    // Common rich text areas / email bodies / composer areas
    document
      .querySelectorAll(
        [
          // email-ish containers
          '[data-aura-class*="email"]',
          '[data-aura-class*="Email"]',
          '[class*="email"]',
          '[class*="Email"]',
          // rich text / formatted text
          '[contenteditable="true"]',
          'div[role="textbox"]',
          // lightning formatted text
          'lightning-formatted-rich-text',
          'lightning-formatted-text',
          // fallbacks
          'article',
          'section',
        ].join(','),
      )
      .forEach((el) => pushCandidate(el));

    // Prefer visible candidates (avoid hidden)
    const visible = candidates.filter(({ el }) => {
      const r = el.getBoundingClientRect?.();
      if (!r) return true;
      return r.width > 0 && r.height > 0;
    });

    const pool = visible.length ? visible : candidates;
    if (!pool.length) return '';

    // Pick the longest text block; it's usually the email body.
    pool.sort((a, b) => b.text.length - a.text.length);
    return pool[0].text;
  }

  function ensureSidebar() {
    if (document.getElementById(EXT_ROOT_ID)) return;

    const ensureDockStyle = () => {
      if (document.getElementById(DOCK_STYLE_ID)) return;
      const style = document.createElement('style');
      style.id = DOCK_STYLE_ID;
      style.textContent = `
        :root { --sf-advisor-sidebar-width: ${SIDEBAR_WIDTH_PX}px; }

        /* Base: make room for the drawer */
        html.sf-advisor-sidebar-docked body {
          margin-right: var(--sf-advisor-sidebar-width) !important;
          transition: margin-right 160ms ease;
        }

        /* Lightning containers often ignore body margin - add padding to key containers */
        html.sf-advisor-sidebar-docked .viewport,
        html.sf-advisor-sidebar-docked .oneWorkspace,
        html.sf-advisor-sidebar-docked .workspaceManager,
        html.sf-advisor-sidebar-docked .oneWorkspaceTabset,
        html.sf-advisor-sidebar-docked section.layoutContent.stage.panelSlide,
        html.sf-advisor-sidebar-docked .col1,
        html.sf-advisor-sidebar-docked .col2,
        html.sf-advisor-sidebar-docked .col3 {
          padding-right: var(--sf-advisor-sidebar-width) !important;
          box-sizing: border-box !important;
        }

        /* Fixed headers need right offset */
        html.sf-advisor-sidebar-docked .slds-global-header_container {
          padding-right: var(--sf-advisor-sidebar-width) !important;
          box-sizing: border-box !important;
        }

        /* Highlights header is sometimes fixed with inline right: 16px. Shift it left. */
        html.sf-advisor-sidebar-docked .highlights.fixed-position,
        html.sf-advisor-sidebar-docked .slds-page-header_record-home.fixed-position {
          right: calc(var(--sf-advisor-sidebar-width) + 16px) !important;
        }
      `;
      document.documentElement.appendChild(style);
    };

    const setDocked = (docked) => {
      ensureDockStyle();
      document.documentElement.classList.toggle(
        'sf-advisor-sidebar-docked',
        Boolean(docked),
      );
    };

    const root = document.createElement('div');
    root.id = EXT_ROOT_ID;
    root.style.position = 'fixed';
    root.style.top = '0';
    root.style.right = '0';
    root.style.height = '100vh';
    root.style.width = `${SIDEBAR_WIDTH_PX}px`;
    root.style.zIndex = '2147483647';
    root.style.display = 'block';
    root.style.background = '#ffffff';

    const toggle = document.createElement('button');
    toggle.id = TOGGLE_ID;
    toggle.type = 'button';
    toggle.textContent = 'Assistant';
    toggle.style.position = 'fixed';
    toggle.style.top = '16px';
    toggle.style.right = `${SIDEBAR_WIDTH_PX + 8}px`;
    toggle.style.zIndex = '2147483647';
    toggle.style.padding = '8px 10px';
    toggle.style.borderRadius = '999px';
    toggle.style.border = '1px solid rgba(0,0,0,0.15)';
    toggle.style.background = '#ffffff';
    toggle.style.boxShadow = '0 6px 18px rgba(0,0,0,0.15)';
    toggle.style.cursor = 'pointer';
    toggle.style.font =
      '12px/1.2 system-ui, -apple-system, Segoe UI, Roboto, Arial';

    const iframe = document.createElement('iframe');
    iframe.src = chrome.runtime.getURL('sidebar.html');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = '0';
    iframe.style.background = '#ffffff';

    let isOpen = true;
    setDocked(true);

    toggle.addEventListener('click', () => {
      isOpen = !isOpen;
      root.style.display = isOpen ? 'block' : 'none';
      setDocked(isOpen);
    });

    window.addEventListener('message', (event) => {
      const data = event?.data;
      if (!data || data.source !== 'sf-advisor-sidebar') return;

      if (data.type === 'closeDrawer') {
        isOpen = false;
        root.style.display = 'none';
        setDocked(false);
        return;
      }

      if (data.type === 'requestContext') {
        event.source?.postMessage(
          {
            source: 'sf-advisor-sidebar',
            type: 'context',
            payload: parseContext(),
          },
          event.origin,
        );
      }

      if (data.type === 'requestEmailText') {
        const selected = getSelectedText();
        const text = selected || bestEffortEmailTextFromDom();
        event.source?.postMessage(
          {
            source: 'sf-advisor-sidebar',
            type: 'emailText',
            payload: {
              text,
              source: selected ? 'selection' : 'dom',
            },
          },
          event.origin,
        );
      }

      if (data.type === 'pasteIntoSalesforce') {
        const text = String(data?.payload?.text || '');
        const active = document.activeElement;

        const isEditable = (el) => {
          if (!el) return false;
          const tag = (el.tagName || '').toLowerCase();
          if (tag === 'textarea') return true;
          if (tag === 'input') {
            const t = (el.getAttribute('type') || 'text').toLowerCase();
            return !['button', 'submit', 'checkbox', 'radio', 'file'].includes(
              t,
            );
          }
          if (el.isContentEditable) return true;
          return false;
        };

        try {
          if (isEditable(active)) {
            if (active.isContentEditable) {
              active.focus();
              document.execCommand('insertText', false, text);
            } else {
              active.focus();
              active.value = text;
              active.dispatchEvent(new Event('input', { bubbles: true }));
              active.dispatchEvent(new Event('change', { bubbles: true }));
            }

            event.source?.postMessage(
              {
                source: 'sf-advisor-sidebar',
                type: 'pasteResult',
                payload: { ok: true },
              },
              event.origin,
            );
          } else {
            event.source?.postMessage(
              {
                source: 'sf-advisor-sidebar',
                type: 'pasteResult',
                payload: { ok: false, error: 'NO_FOCUSED_FIELD' },
              },
              event.origin,
            );
          }
        } catch (e) {
          event.source?.postMessage(
            {
              source: 'sf-advisor-sidebar',
              type: 'pasteResult',
              payload: { ok: false, error: 'PASTE_FAILED', details: String(e) },
            },
            event.origin,
          );
        }
      }
    });

    root.appendChild(iframe);
    document.documentElement.appendChild(root);
    document.documentElement.appendChild(toggle);
  }

  ensureSidebar();

  // --- Auto-sync context on SPA navigation (no refresh needed) ---
  let lastHref = location.href;

  function broadcastContextIfChanged() {
    if (location.href === lastHref) return;
    lastHref = location.href;
    const iframe = document.querySelector(`#${EXT_ROOT_ID} iframe`);
    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage(
        {
          source: 'sf-advisor-sidebar',
          type: 'context',
          payload: parseContext(),
        },
        '*',
      );
    }
  }

  // Intercept history.pushState / replaceState (Lightning SPA navigation)
  const origPushState = history.pushState;
  const origReplaceState = history.replaceState;
  history.pushState = function (...args) {
    origPushState.apply(this, args);
    broadcastContextIfChanged();
  };
  history.replaceState = function (...args) {
    origReplaceState.apply(this, args);
    broadcastContextIfChanged();
  };

  window.addEventListener('popstate', () => broadcastContextIfChanged());
  window.addEventListener('hashchange', () => broadcastContextIfChanged());

  // Polling fallback – some Lightning navigations bypass history API
  setInterval(broadcastContextIfChanged, 1000);
})();
