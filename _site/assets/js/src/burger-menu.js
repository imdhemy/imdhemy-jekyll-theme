const menuIcon = 'menu-outline';
const closeIcon = 'close';

export const init = () => {
  const menuToggle = document.querySelector('.site-header__toggle');
  if (!menuToggle) return;
  const target = document.querySelector(menuToggle.dataset.target);
  if (!target) return;

  const closeMenu = () => {
    if (!target.classList.contains('is-hidden')) {
      target.classList.add('is-hidden');
      menuToggle.setAttribute('aria-expanded', 'false');
      const icon = menuToggle.querySelector('ion-icon');
      if (icon) icon.name = menuIcon;
    }
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    target.classList.toggle('is-hidden');
    menuToggle.setAttribute('aria-expanded', isOpen ? 'false' : 'true');

    const icon = menuToggle.querySelector('ion-icon');
    if (icon) icon.name = isOpen ? menuIcon : closeIcon;
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
      closeMenu();
    }
  });
};
