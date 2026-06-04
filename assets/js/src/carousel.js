const getScrollBehavior = () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return 'auto';
  }

  return 'smooth';
};

const updateControls = (track, previousButton, nextButton) => {
  const maxScrollLeft = track.scrollWidth - track.clientWidth;
  const canScroll = maxScrollLeft > 1;
  const atStart = track.scrollLeft <= 1;
  const atEnd = track.scrollLeft >= maxScrollLeft - 1;

  previousButton.disabled = !canScroll || atStart;
  nextButton.disabled = !canScroll || atEnd;
};

const initCarousel = (carousel) => {
  const track = carousel.querySelector('[data-carousel-track]');
  const previousButton = carousel.querySelector('[data-carousel-prev]');
  const nextButton = carousel.querySelector('[data-carousel-next]');

  if (!track || !previousButton || !nextButton) {
    return;
  }

  const scrollByPage = (direction) => {
    track.scrollBy({
      left: direction * track.clientWidth,
      behavior: getScrollBehavior(),
    });
  };

  let animationFrame = null;
  const scheduleUpdate = () => {
    if (animationFrame) {
      window.cancelAnimationFrame(animationFrame);
    }

    animationFrame = window.requestAnimationFrame(() => {
      updateControls(track, previousButton, nextButton);
      animationFrame = null;
    });
  };

  previousButton.addEventListener('click', () => scrollByPage(-1));
  nextButton.addEventListener('click', () => scrollByPage(1));
  track.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', scheduleUpdate);

  updateControls(track, previousButton, nextButton);
};

export const init = () => {
  document.querySelectorAll('[data-carousel]').forEach(initCarousel);
};
