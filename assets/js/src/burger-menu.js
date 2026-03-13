const menuIcon = 'menu-outline';
const closeIcon = 'close';

export const init = () => {
  const menuToggle = document.querySelector('.site-header__toggle');
  if (!menuToggle) return;
  const target = document.querySelector(menuToggle.dataset.target);
  if (!target) return;
  const toggleLabel = menuToggle.querySelector('.sr-only');
  const openLabel = menuToggle.dataset.openLabel || 'Open navigation menu';
  const closeLabel = menuToggle.dataset.closeLabel || 'Close navigation menu';

  const syncButtonState = (isOpen) => {
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    menuToggle.setAttribute('aria-label', isOpen ? closeLabel : openLabel);

    if (toggleLabel) {
      toggleLabel.textContent = isOpen ? closeLabel : openLabel;
    }

    const icon = menuToggle.querySelector('ion-icon');
    if (icon) icon.name = isOpen ? closeIcon : menuIcon;

    target.hidden = !isOpen;
    target.classList.toggle('is-hidden', !isOpen);
  };

  const closeMenu = () => {
    if (!target.hidden) {
      syncButtonState(false);
    }
  };

  syncButtonState(false);

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    const nextOpen = !isOpen;
    syncButtonState(nextOpen);

    if (nextOpen) {
      const firstInteractive = target.querySelector(
        'a, button, input, [tabindex]:not([tabindex="-1"])',
      );
      if (firstInteractive) {
        firstInteractive.focus();
      }
      return;
    }

    menuToggle.focus();
  });

  document.addEventListener('click', (event) => {
    const clickInsideMenu = target.contains(event.target);
    const clickOnButton = menuToggle.contains(event.target);
    if (!clickInsideMenu && !clickOnButton) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      const wasOpen = !target.hidden;
      closeMenu();
      if (wasOpen) {
        menuToggle.focus();
      }
    }
  });
};
