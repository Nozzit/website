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

  function applyTranslations(lang) {
    if (lang === 'nl') {
      // Dutch is the default - restore original content from data-i18n-nl attribute
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const original = el.getAttribute('data-i18n-nl');
        if (original) {
          el.innerHTML = original;
        }
      });
      return;
    }

    // For non-NL languages, find the page's translation data.
    // EN  → /shared/translations/<page>.json  (legacy default, always exists)
    // FR  → /shared/translations/<page>.fr.json  (with EN fallback if absent)
    const pageId = document.querySelector('meta[name="i18n-page"]')?.content;
    if (!pageId) {
      applyInlineTranslations(lang);
      return;
    }

    const urls = lang === 'fr'
      ? [`/shared/translations/${pageId}.fr.json`, `/shared/translations/${pageId}.json`]
      : [`/shared/translations/${pageId}.json`];

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
            if (attr) el.setAttribute(attr, translation);
            else el.innerHTML = translation;
          }
        });
        applyInlineTranslations(lang);
      })
      .catch(() => applyInlineTranslations(lang));
  }

  function applyInlineTranslations(lang) {
    // Apply translations from data-i18n-en / data-i18n-fr attributes (used by nav links).
    // FR falls back to EN if no FR attribute is present.
    document.querySelectorAll('[data-i18n-en], [data-i18n-fr]').forEach(el => {
      if (!el.getAttribute('data-i18n-nl')) {
        el.setAttribute('data-i18n-nl', el.innerHTML);
      }
      if (lang === 'en' && el.getAttribute('data-i18n-en')) {
        el.innerHTML = el.getAttribute('data-i18n-en');
      } else if (lang === 'fr') {
        const fr = el.getAttribute('data-i18n-fr');
        const en = el.getAttribute('data-i18n-en');
        if (fr) el.innerHTML = fr;
        else if (en) el.innerHTML = en;
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

    // Bind language buttons (after nav loads via nav.js)
    const observer = new MutationObserver(() => {
      document.querySelectorAll('.lang-btn').forEach(btn => {
        if (!btn._i18nBound) {
          btn._i18nBound = true;
          btn.addEventListener('click', () => setLanguage(btn.getAttribute('data-lang')));
        }
      });
      // Also apply inline translations to newly added nav elements
      const lang = getCurrentLang();
      if (lang !== 'nl') {
        applyInlineTranslations(lang);
      }
      updateButtons(lang);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Also bind any existing buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      if (!btn._i18nBound) {
        btn._i18nBound = true;
        btn.addEventListener('click', () => setLanguage(btn.getAttribute('data-lang')));
      }
    });
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
