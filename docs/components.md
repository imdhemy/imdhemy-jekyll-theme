# Components and Layouts

## Layouts

- `default`: global shell, header, footer, and asset loading.
- `home`: hero + contributions + testimonials + latest posts + social section.
- `blog`: page header + paginated post list + pagination + social section.
- `archive`: archive header + filtered post list.
- `post`: post header + content + post navigation + related posts.
- `page`: page header + content.

## Key Includes

- `header.html`: desktop/mobile nav, active link state.
- `hero.html`: main home hero and primary/secondary CTA.
- `latest-posts.html`: latest post list with card items.
- `post-item.html`: reusable post card.
- `post-header.html`: title, author, read time, tags, image.
- `post-navigation.html`: previous/next post links.
- `related-posts.html`: tag-aware related posts.
- `reading-progress.html`: top progress indicator (post pages).

## JS Modules

- `burger-menu.js`: mobile nav toggle + close behaviors.
- `header-state.js`: applies `is-scrolled` header state.
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

## Accessibility Notes

- Skip link is present globally.
- Header toggle uses `aria-controls` and `aria-expanded`.
- Keyboard support includes Escape to close mobile nav.
