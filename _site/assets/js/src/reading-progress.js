export const init = () => {
  const bar = document.querySelector('[data-reading-progress]');
  const content = document.querySelector('.content');
  if (!bar || !content) return;

  const updateProgress = () => {
    const contentTop = content.offsetTop;
    const contentHeight = content.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrollY = window.scrollY;

    const total = Math.max(contentHeight - viewportHeight, 1);
    const progressed = Math.min(Math.max(scrollY - contentTop, 0), total);
    const percentage = (progressed / total) * 100;

    bar.style.transform = `scaleX(${percentage / 100})`;
  };

  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
};
