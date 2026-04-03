// Shared navigation loader — drop <script src="/shared/nav.js"></script> in any page
(function() {
  function loadNav() {
    var placeholder = document.getElementById('shared-nav');
    if (!placeholder) {
      // Auto-insert at start of body if no placeholder exists
      placeholder = document.createElement('div');
      placeholder.id = 'shared-nav';
      document.body.insertBefore(placeholder, document.body.firstChild);
    }

    fetch('/shared/nav.html')
      .then(function(res) { return res.text(); })
      .then(function(html) {
        placeholder.innerHTML = html;

        // Add homepage-nav class if on homepage
        if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
          var nav = placeholder.querySelector('.navbar');
          if (nav) nav.classList.add('homepage-nav');
        }
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadNav);
  } else {
    loadNav();
  }
})();
