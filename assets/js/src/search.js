const ROOT_SELECTOR = '[data-search-root]';

let searchDocumentsPromise;

const normalizeText = (value) =>
  (value || '')
    .toString()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const tokenize = (value) =>
  normalizeText(value)
    .split(' ')
    .filter((token) => token.length > 0);

const uniqueTokens = (value) => [...new Set(tokenize(value))];

const compareDatesDesc = (left, right) => {
  const leftTime = left.date ? Date.parse(left.date) : 0;
  const rightTime = right.date ? Date.parse(right.date) : 0;

  if (Number.isNaN(leftTime) || Number.isNaN(rightTime)) {
    return 0;
  }

  return rightTime - leftTime;
};

const prepareDocument = (searchDocument) => {
  const title = searchDocument.title || '';
  const content = searchDocument.content || '';
  const tags = Array.isArray(searchDocument.tags) ? searchDocument.tags : [];
  const categories = Array.isArray(searchDocument.categories) ? searchDocument.categories : [];

  return {
    ...searchDocument,
    title,
    content,
    tags,
    categories,
    normalizedTitle: normalizeText(title),
    normalizedContent: normalizeText(content),
    normalizedTags: tags.map(normalizeText).filter(Boolean),
    normalizedCategories: categories.map(normalizeText).filter(Boolean),
  };
};

const getSearchDocuments = async (searchUrl) => {
  if (!searchDocumentsPromise) {
    searchDocumentsPromise = fetch(searchUrl, {
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Search index request failed with ${response.status}`);
        }

        return response.json();
      })
      .then((documents) => documents.map(prepareDocument))
      .catch((error) => {
        searchDocumentsPromise = undefined;
        throw error;
      });
  }

  return searchDocumentsPromise;
};

const scoreDocument = (searchDocument, query, tokens) => {
  let score = 0;

  if (searchDocument.normalizedTitle.includes(query)) {
    score += 140;
  }

  if (searchDocument.normalizedContent.includes(query)) {
    score += 30;
  }

  tokens.forEach((token) => {
    if (searchDocument.normalizedTitle.includes(token)) {
      score += 60;
    }

    if (searchDocument.normalizedTags.some((tag) => tag.includes(token))) {
      score += 30;
    }

    if (searchDocument.normalizedCategories.some((category) => category.includes(token))) {
      score += 18;
    }

    if (searchDocument.normalizedContent.includes(token)) {
      score += 10;
    }
  });

  const matchedTokenCount = tokens.filter(
    (token) =>
      searchDocument.normalizedTitle.includes(token) ||
      searchDocument.normalizedTags.some((tag) => tag.includes(token)) ||
      searchDocument.normalizedCategories.some((category) => category.includes(token)) ||
      searchDocument.normalizedContent.includes(token),
  ).length;

  if (matchedTokenCount === 0) {
    return 0;
  }

  if (matchedTokenCount === tokens.length) {
    score += 24;
  }

  if (searchDocument.type === 'post') {
    score += 4;
  }

  return score;
};

const search = (documents, query, maxResults) => {
  const normalizedQuery = normalizeText(query);
  const tokens = uniqueTokens(query);

  if (!normalizedQuery || tokens.length === 0) {
    return [];
  }

  return documents
    .map((searchDocument) => ({
      searchDocument,
      score: scoreDocument(searchDocument, normalizedQuery, tokens),
    }))
    .filter((entry) => entry.score > 0)
    .sort(
      (left, right) =>
        right.score - left.score || compareDatesDesc(left.searchDocument, right.searchDocument),
    )
    .slice(0, maxResults)
    .map((entry) => entry.searchDocument);
};

const createSnippet = (content, query, maxLength) => {
  const cleanContent = content.replace(/\s+/g, ' ').trim();

  if (!cleanContent) {
    return '';
  }

  const normalizedQuery = normalizeText(query);
  const normalizedContent = normalizeText(cleanContent);
  const matchIndex = normalizedContent.indexOf(normalizedQuery);

  if (matchIndex === -1) {
    return cleanContent.length > maxLength ? `${cleanContent.slice(0, maxLength).trimEnd()}...` : cleanContent;
  }

  const start = Math.max(matchIndex - Math.floor(maxLength / 3), 0);
  const end = Math.min(start + maxLength, cleanContent.length);
  const prefix = start > 0 ? '...' : '';
  const suffix = end < cleanContent.length ? '...' : '';

  return `${prefix}${cleanContent.slice(start, end).trim()}${suffix}`;
};

const createMeta = (searchDocument) => {
  const metaParts = [];

  if (searchDocument.type) {
    metaParts.push(searchDocument.type === 'post' ? 'Post' : 'Page');
  }

  if (searchDocument.tags.length > 0) {
    metaParts.push(searchDocument.tags.slice(0, 2).join(', '));
  }

  return metaParts.join('  •  ');
};

const renderResults = (root, results, query, statusText) => {
  const resultsList = root.querySelector('[data-search-results]');
  const status = root.querySelector('[data-search-status]');

  resultsList.innerHTML = '';
  status.textContent = statusText;

  results.forEach((searchDocument) => {
    const item = window.document.createElement('li');
    item.className = 'site-search__result-item';

    const link = window.document.createElement('a');
    link.className = 'site-search__result-link';
    link.href = searchDocument.url;

    const title = window.document.createElement('span');
    title.className = 'site-search__result-title';
    title.textContent = searchDocument.title;
    link.append(title);

    const meta = createMeta(searchDocument);
    if (meta) {
      const metaEl = window.document.createElement('span');
      metaEl.className = 'site-search__result-meta';
      metaEl.textContent = meta;
      link.append(metaEl);
    }

    const previewLength = Number(root.dataset.searchContentPreviewLength || '140');
    const snippet = createSnippet(searchDocument.content, query, previewLength);
    if (snippet) {
      const snippetEl = window.document.createElement('span');
      snippetEl.className = 'site-search__result-snippet';
      snippetEl.textContent = snippet;
      link.append(snippetEl);
    }

    item.append(link);
    resultsList.append(item);
  });
};

const openPanel = (root) => {
  const panel = root.querySelector('[data-search-panel]');
  const input = root.querySelector('[data-search-input]');

  panel.hidden = false;
  input.setAttribute('aria-expanded', 'true');
  panel.setAttribute('aria-hidden', 'false');
};

const closePanel = (root) => {
  const panel = root.querySelector('[data-search-panel]');
  const input = root.querySelector('[data-search-input]');

  panel.hidden = true;
  input.setAttribute('aria-expanded', 'false');
  panel.setAttribute('aria-hidden', 'true');
};

const focusResultLink = (root, direction) => {
  const links = [...root.querySelectorAll('.site-search__result-link')];

  if (links.length === 0) {
    return;
  }

  const activeIndex = links.findIndex((link) => link === window.document.activeElement);
  const nextIndex =
    activeIndex === -1
      ? direction > 0
        ? 0
        : links.length - 1
      : (activeIndex + direction + links.length) % links.length;

  links[nextIndex].focus();
};

const bindSearchRoot = (root) => {
  const input = root.querySelector('[data-search-input]');
  const clearButton = root.querySelector('[data-search-clear]');
  const form = root.querySelector('.site-search__form');
  const searchUrl = root.dataset.searchUrl;
  const maxResults = Number(root.dataset.searchMaxResults || '8');
  const minQueryLength = Number(root.dataset.searchMinQueryLength || '2');
  const idleText = root.dataset.searchIdleText || 'Start typing to search the site.';
  const tooShortTemplate =
    root.dataset.searchTooShortText || 'Type at least %d characters to search.';
  const loadingText = root.dataset.searchLoadingText || 'Loading search index...';
  const emptyText = root.dataset.searchEmptyText || 'No results found.';
  const errorText = root.dataset.searchErrorText || 'Search is unavailable right now.';

  const setStatus = (text) => {
    const status = root.querySelector('[data-search-status]');
    status.textContent = text;
  };

  const resetResults = () => {
    root.querySelector('[data-search-results]').innerHTML = '';
  };

  const toggleClearButton = () => {
    clearButton.hidden = input.value.length === 0;
  };

  const runSearch = async () => {
    const query = input.value.trim();

    toggleClearButton();

    if (query.length === 0) {
      resetResults();
      setStatus(idleText);
      closePanel(root);
      return;
    }

    openPanel(root);

    if (query.length < minQueryLength) {
      resetResults();
      setStatus(tooShortTemplate.replace('%d', `${minQueryLength}`));
      return;
    }

    setStatus(loadingText);

    try {
      const documents = await getSearchDocuments(searchUrl);
      const results = search(documents, query, maxResults);

      if (results.length === 0) {
        renderResults(root, [], query, emptyText);
        return;
      }

      renderResults(
        root,
        results,
        query,
        `${results.length} result${results.length === 1 ? '' : 's'} for "${query}"`,
      );
    } catch {
      resetResults();
      setStatus(errorText);
    }
  };

  input.addEventListener('focus', () => {
    if (input.value.trim().length > 0) {
      void runSearch();
    }
  });

  input.addEventListener('input', () => {
    void runSearch();
  });

  input.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (root.querySelector('.site-search__result-link')) {
        openPanel(root);
      }
      focusResultLink(root, 1);
    }

    if (event.key === 'Escape') {
      closePanel(root);
    }
  });

  root.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closePanel(root);
      input.focus();
    }

    if (event.key === 'ArrowDown' && event.target.matches('.site-search__result-link')) {
      event.preventDefault();
      focusResultLink(root, 1);
    }

    if (event.key === 'ArrowUp' && event.target.matches('.site-search__result-link')) {
      event.preventDefault();

      if (event.target === root.querySelector('.site-search__result-link')) {
        input.focus();
        return;
      }

      focusResultLink(root, -1);
    }
  });

  clearButton.addEventListener('click', () => {
    input.value = '';
    toggleClearButton();
    resetResults();
    setStatus(idleText);
    closePanel(root);
    input.focus();
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const firstResult = root.querySelector('.site-search__result-link');

    if (firstResult) {
      window.location.assign(firstResult.href);
      return;
    }

    void runSearch();
  });

  window.document.addEventListener('click', (event) => {
    if (!root.contains(event.target)) {
      closePanel(root);
    }
  });

  closePanel(root);
};

export const init = () => {
  const searchRoots = window.document.querySelectorAll(ROOT_SELECTOR);

  if (searchRoots.length === 0) {
    return;
  }

  searchRoots.forEach(bindSearchRoot);
};
