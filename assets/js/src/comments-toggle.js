const giscusAttributeMap = {
  category: 'data-category',
  categoryId: 'data-category-id',
  emitMetadata: 'data-emit-metadata',
  inputPosition: 'data-input-position',
  lang: 'data-lang',
  loading: 'data-loading',
  mapping: 'data-mapping',
  reactionsEnabled: 'data-reactions-enabled',
  repo: 'data-repo',
  repoId: 'data-repo-id',
  strict: 'data-strict',
  term: 'data-term',
  theme: 'data-theme',
};

const mountGiscus = (mount) => {
  if (!mount || mount.dataset.giscusLoaded === 'true') {
    return;
  }

  const script = document.createElement('script');
  script.src = mount.dataset.giscusScriptSrc || 'https://giscus.app/client.js';
  script.async = true;
  script.crossOrigin = 'anonymous';

  for (const [datasetKey, attributeName] of Object.entries(giscusAttributeMap)) {
    const value = mount.dataset[`giscus${datasetKey.charAt(0).toUpperCase()}${datasetKey.slice(1)}`];
    if (value) {
      script.setAttribute(attributeName, value);
    }
  }

  mount.append(script);
  mount.dataset.giscusLoaded = 'true';
};

export const init = () => {
  const sections = document.querySelectorAll('[data-comments-collapsible]');
  if (!sections.length) {
    return;
  }

  sections.forEach((section) => {
    const toggle = section.querySelector('[data-comments-toggle]');
    const panel = section.querySelector('[data-comments-panel]');
    const mount = section.querySelector('[data-giscus-mount]');
    if (!toggle || !panel || !mount) {
      return;
    }

    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      const nextExpanded = !expanded;

      toggle.setAttribute('aria-expanded', nextExpanded ? 'true' : 'false');
      section.classList.toggle('is-open', nextExpanded);
      panel.hidden = !nextExpanded;

      if (nextExpanded) {
        mountGiscus(mount);
      }
    });
  });
};
