/*
  Persist Material for MkDocs sidebar (nav) open/closed state across page navigations.
  Behavior:
  - Default: all sections are collapsed (closed) if no saved state exists yet.
  - When user opens/closes a section, the state is stored in localStorage per toggle id.
  - On subsequent page loads, the saved state is restored.
*/
(function () {
  const STORAGE_KEY = 'mkdocs.nav.toggleState';

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (_) {
      return null;
    }
  }

  function saveState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (_) {
      // ignore write errors
    }
  }

  function getToggles() {
    // Material uses checkboxes for nav sections; match both class names used across versions
    const selector = 'input.md-nav__toggle[id^="__nav_"], input.md-toggle[id^="__nav_"]';
    return Array.prototype.slice.call(document.querySelectorAll(selector));
  }

  function applyState(toggles, state) {
    if (!toggles || toggles.length === 0) return;
    const hasSaved = state && Object.keys(state).length > 0;

    // If no saved state, ensure all are collapsed by default
    if (!hasSaved) {
      toggles.forEach(t => {
        if (t.checked) t.checked = false;
      });
      return;
    }

    toggles.forEach(t => {
      const id = t.id;
      if (state.hasOwnProperty(id)) {
        t.checked = !!state[id];
      }
    });
  }

  function setupListeners(toggles, state) {
    if (!toggles || toggles.length === 0) return;
    const current = state && typeof state === 'object' ? state : {};

    toggles.forEach(t => {
      t.addEventListener('change', function () {
        current[t.id] = !!t.checked;
        saveState(current);
      });
    });
  }

  function init() {
    const state = loadState();
    const toggles = getToggles();
    applyState(toggles, state);
    setupListeners(toggles, state);
  }

  // Initialize when DOM is ready; also retry once after a short delay to cover instant navigation
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      init();
      setTimeout(init, 150); // retry to catch late-rendered elements
    });
  } else {
    init();
    setTimeout(init, 150);
  }
})();
