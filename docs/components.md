# Components and Layouts

## Layouts

- `default`: global shell, header, footer, and asset loading.
- `home`: hero + contributions + testimonials + latest posts + social section.
- `blog`: page header + paginated post list + pagination + social section.
- `archive`: archive header + filtered post list.
- `post`: post header + content + comments + post navigation + related posts.
- `page`: page header + content.

## Rich Content

- Posts and pages support styled blockquotes.
- Admonitions are supported via `div` blocks with these classes: `note`, `tip`, `info`, `caution`, `danger`.
- See [Content Elements](./content-elements.md) for usage examples.

## Key Includes

- `header.html`: desktop/mobile nav, active link state.
- `hero.html`: main home hero and primary/secondary CTA.
- `latest-posts.html`: latest post list with card items.
- `post-item.html`: reusable post card.
- `post-header.html`: title, author, read time, tags, image.
- `post-series.html`: series heading + ordered links for posts sharing `list`, with collapsible/overflow controls.
- `giscus-comments.html`: configurable Giscus reactions and comments.
- `post-navigation.html`: previous/next post links.
- `related-posts.html`: tag-aware related posts.
- `reading-progress.html`: top progress indicator (post pages).

## JS Modules

- `burger-menu.js`: mobile nav toggle + close behaviors.
- `header-state.js`: applies `is-scrolled` header state.
- `post-series.js`: handles post series collapse/expand and overflow reveal.
- `reading-progress.js`: updates progress bar while reading.

## Data Dependencies

- `site.navigation`
- `site.author`
- `site.footer.social`
- `site.contributions` (optional)
- `site.testimonials` (optional)
- `site.theme_text` (optional)
- `site.theme_style` (optional)
- `site.theme_features` (optional)
- `site.theme_comments` (optional)

## Accessibility Notes

- Skip link is present globally.
- Header toggle uses `aria-controls` and `aria-expanded`.
- Keyboard support includes Escape to close mobile nav.
