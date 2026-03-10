export const init = () => {
  const sections = document.querySelectorAll('[data-series-collapsible]');
  if (!sections.length) {
    return;
  }

  sections.forEach((section) => {
    const toggle = section.querySelector('[data-series-toggle]');
    const panel = section.querySelector('[data-series-panel]');
    if (!toggle || !panel) {
      return;
    }

    const syncPanelState = () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      section.classList.toggle('is-open', expanded);
      panel.hidden = !expanded;
    };

    syncPanelState();

    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      syncPanelState();
    });

    const overflowToggles = section.querySelectorAll('[data-series-overflow-toggle]');
    if (!overflowToggles.length) {
      return;
    }

    overflowToggles.forEach((overflowToggle) => {
      overflowToggle.addEventListener('click', () => {
        const group = overflowToggle.dataset.seriesOverflowGroup;
        const selector = group
          ? `[data-series-overflow-item][data-series-overflow-group="${group}"]`
          : '[data-series-overflow-item]';
        const overflowItems = section.querySelectorAll(selector);
        overflowItems.forEach((item) => {
          item.hidden = false;
        });
        overflowToggle.hidden = true;
      });
    });
  });
};
