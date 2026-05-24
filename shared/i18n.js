// Shared i18n for all OpenAEC subpages
(function() {
  const STORAGE_KEY = 'openaec-lang';

  function getCurrentLang() {
    return localStorage.getItem(STORAGE_KEY) || 'nl';
  }

  function setLanguage(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
    applyTranslations(lang);
    updateButtons(lang);
  }

  function updateButtons(lang) {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
  }

  // Set innerHTML / attribute only when it actually differs — keeps the DOM
  // quiet so we don't poke anything that's watching mutations.
  function setHtmlIfChanged(el, html) {
    if (el.innerHTML !== html) el.innerHTML = html;
  }
  function setAttrIfChanged(el, attr, value) {
    if (el.getAttribute(attr) !== value) el.setAttribute(attr, value);
  }

  function applyTranslations(lang) {
    if (lang === 'nl') {
      // Dutch is the default — restore original content from data-i18n-nl
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const original = el.getAttribute('data-i18n-nl');
        if (original != null) setHtmlIfChanged(el, original);
      });
      applyInlineTranslations(lang);
      return;
    }

    // For non-NL languages, find the page's translation data.
    // EN  → /shared/translations/<page>.json   (legacy default, always exists)
    // FR  → /shared/translations/<page>.fr.json (with EN fallback)
    // TR  → /shared/translations/<page>.tr.json (with EN fallback)
    const pageId = document.querySelector('meta[name="i18n-page"]')?.content;
    if (!pageId) {
      applyInlineTranslations(lang);
      return;
    }

    const urls = (lang === 'en')
      ? [`/shared/translations/${pageId}.json`]
      : [`/shared/translations/${pageId}.${lang}.json`, `/shared/translations/${pageId}.json`];

    function loadFirstAvailable(list) {
      if (!list.length) return Promise.resolve(null);
      return fetch(list[0])
        .then(r => r.ok ? r.json() : loadFirstAvailable(list.slice(1)))
        .catch(() => loadFirstAvailable(list.slice(1)));
    }

    loadFirstAvailable(urls)
      .then(translations => {
        if (!translations) { applyInlineTranslations(lang); return; }
        document.querySelectorAll('[data-i18n]').forEach(el => {
          const key = el.getAttribute('data-i18n');
          if (!el.getAttribute('data-i18n-nl')) {
            el.setAttribute('data-i18n-nl', el.innerHTML);
          }
          const translation = key.split('.').reduce((obj, k) => obj?.[k], translations);
          if (translation) {
            const attr = el.getAttribute('data-i18n-attr');
            if (attr) setAttrIfChanged(el, attr, translation);
            else setHtmlIfChanged(el, translation);
          }
        });
        applyInlineTranslations(lang);
      })
      .catch(() => applyInlineTranslations(lang));
  }

  function applyInlineTranslations(lang) {
    // Apply translations from data-i18n-<lang> attributes (used by nav links).
    // Non-EN, non-NL languages fall back to EN if their own attribute is missing.
    document.querySelectorAll('[data-i18n-en], [data-i18n-fr], [data-i18n-tr]').forEach(el => {
      if (!el.getAttribute('data-i18n-nl')) {
        el.setAttribute('data-i18n-nl', el.innerHTML);
      }
      if (lang === 'nl') {
        const original = el.getAttribute('data-i18n-nl');
        if (original != null) setHtmlIfChanged(el, original);
        return;
      }
      const own = el.getAttribute('data-i18n-' + lang);
      const en  = el.getAttribute('data-i18n-en');
      const newHtml = own || en;
      if (newHtml) setHtmlIfChanged(el, newHtml);
    });
  }

  // ───────────────────────────────────────────────────────────────────────
  // Wire-up — no MutationObserver. Language buttons are bound via event
  // delegation on `document`, so any .lang-btn (also those injected later
  // by nav.js) works without polling or watching DOM mutations. nav.js
  // dispatches a 'nav:loaded' CustomEvent after it injects the navbar; we
  // listen for that to apply translations + activate the right button.
  // ───────────────────────────────────────────────────────────────────────
  document.addEventListener('click', (e) => {
    const btn = e.target.closest && e.target.closest('.lang-btn');
    if (btn) setLanguage(btn.getAttribute('data-lang'));
  });

  document.addEventListener('nav:loaded', () => {
    const lang = getCurrentLang();
    if (lang !== 'nl') applyInlineTranslations(lang);
    updateButtons(lang);
  });

  function init() {
    const lang = getCurrentLang();
    document.documentElement.lang = lang;
    if (lang !== 'nl') applyTranslations(lang);
    updateButtons(lang);
  }

  // Expose globally
  window.setLanguage = setLanguage;
  window.getCurrentLang = getCurrentLang;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
