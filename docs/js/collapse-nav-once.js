(function () {
  var KEY = 'egov_nav_collapsed_once_v1';
  try {
    if (window.localStorage && localStorage.getItem(KEY)) return;
  } catch (_) {
    // If localStorage is not accessible, still attempt to collapse
  }

  function collapseNav() {
    try {
      // Uncheck all navigation toggles (primary sidebar)
      var navToggles = document.querySelectorAll('input.md-toggle[id^="__nav"]');
      navToggles.forEach(function (el) {
        if (el.checked) el.checked = false;
      });

      // Close any <details open> elements that may be used in newer templates
      var openDetails = document.querySelectorAll('details[open]');
      openDetails.forEach(function (d) { d.open = false; });

      // Ensure any aria-expanded elements are marked collapsed
      var expanded = document.querySelectorAll('[aria-expanded="true"]');
      expanded.forEach(function (el) { el.setAttribute('aria-expanded', 'false'); });

      // Persist that we've collapsed once, so it won't repeat on next loads
      try { if (window.localStorage) localStorage.setItem(KEY, '1'); } catch (_) {}
    } catch (e) {
      // Fail silently
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', collapseNav, { once: true });
  } else {
    collapseNav();
  }
})();
