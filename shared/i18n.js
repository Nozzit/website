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

  // Set innerHTML only when it actually differs — avoids no-op DOM mutations
  // that would otherwise re-trigger any MutationObserver watching the subtree.
  function setHtmlIfChanged(el, html) {
    if (el.innerHTML !== html) el.innerHTML = html;
  }
  function setAttrIfChanged(el, attr, value) {
    if (el.getAttribute(attr) !== value) el.setAttribute(attr, value);
  }

  function applyTranslations(lang) {
    if (lang === 'nl') {
      // Dutch is the default - restore original content from data-i18n-nl attribute
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const original = el.getAttribute('data-i18n-nl');
        if (original != null) setHtmlIfChanged(el, original);
      });
      applyInlineTranslations(lang);
      return;
    }

    // For non-NL languages, find the page's translation data.
    // EN  → /shared/translations/<page>.json  (legacy default, always exists)
    // FR  → /shared/translations/<page>.fr.json (with EN fallback if absent)
    // TR  → /shared/translations/<page>.tr.json (with EN fallback if absent)
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

  function bindLangButtons() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      if (!btn._i18nBound) {
        btn._i18nBound = true;
        btn.addEventListener('click', () => setLanguage(btn.getAttribute('data-lang')));
      }
    });
  }

  // Initialize
  function init() {
    const lang = getCurrentLang();
    document.documentElement.lang = lang;
    updateButtons(lang);
    if (lang !== 'nl') {
      applyTranslations(lang);
    }

    bindLangButtons();

    // Wait for nav.js to inject shared/nav.html into #shared-nav, then bind
    // its language buttons + apply translations ONCE and disconnect.
    // Previously this observer watched the whole <body> subtree with
    // childList+subtree, and the callback mutated innerHTML — which re-fired
    // the observer infinitely (100% CPU). Scope it tightly + one-shot.
    const navContainer = document.getElementById('shared-nav');
    if (navContainer && !navContainer.querySelector('.lang-btn')) {
      const observer = new MutationObserver(() => {
        if (navContainer.querySelector('.lang-btn')) {
          observer.disconnect();
          bindLangButtons();
          const currentLang = getCurrentLang();
          if (currentLang !== 'nl') applyInlineTranslations(currentLang);
          updateButtons(currentLang);
        }
      });
      observer.observe(navContainer, { childList: true, subtree: true });
      // Safety net: stop watching after 5s no matter what.
      setTimeout(() => observer.disconnect(), 5000);
    }
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
