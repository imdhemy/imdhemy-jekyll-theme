export const init = () => {
  const header = document.querySelector('#main-header');
  if (!header) return;

  const updateHeaderState = () => {
    if (window.scrollY > 8) {
      header.classList.add('is-scrolled');
      return;
    }
    header.classList.remove('is-scrolled');
  };

  updateHeaderState();
  window.addEventListener('scroll', updateHeaderState, { passive: true });
};
