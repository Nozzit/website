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

    // For English, find the page's translation data
    const pageId = document.querySelector('meta[name="i18n-page"]')?.content;
    if (!pageId) {
      // No page-specific translations, but still apply inline nav translations
      applyInlineTranslations(lang);
      return;
    }

    fetch(`/shared/translations/${pageId}.json`)
      .then(r => r.json())
      .then(translations => {
        document.querySelectorAll('[data-i18n]').forEach(el => {
          const key = el.getAttribute('data-i18n');
          // Save original Dutch content
          if (!el.getAttribute('data-i18n-nl')) {
            el.setAttribute('data-i18n-nl', el.innerHTML);
          }
          const translation = key.split('.').reduce((obj, k) => obj?.[k], translations);
          if (translation) {
            el.innerHTML = translation;
          }
        });
        // Also apply nav inline translations
        applyInlineTranslations(lang);
      })
      .catch(() => {
        // Silent fail on fetch - still apply inline translations
        applyInlineTranslations(lang);
      });
  }

  function applyInlineTranslations(lang) {
    // Apply translations from data-i18n-en attributes (used by nav links)
    document.querySelectorAll('[data-i18n-en]').forEach(el => {
      if (!el.getAttribute('data-i18n-nl')) {
        el.setAttribute('data-i18n-nl', el.innerHTML);
      }
      if (lang === 'en') {
        el.innerHTML = el.getAttribute('data-i18n-en');
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
