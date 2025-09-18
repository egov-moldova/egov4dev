(function () {
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
    } catch (e) {
      // Fail silently
    }
  }

  function collapseSoon() { setTimeout(collapseNav, 0); }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', collapseSoon, { once: true });
  } else {
    collapseSoon();
  }
})();
