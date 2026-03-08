# Upgrade Guide

This guide documents breaking changes introduced in the latest major update.

## Summary of Breaking Changes

1. Utility-style class naming has been replaced by semantic component classes.
2. Header/nav markup and mobile-menu behavior changed.
3. Several home/post components gained new structure for modernized UX.
4. Post layout now includes optional reading progress include.

If your site only uses configuration and does not override theme templates/styles, upgrade should be straightforward.

## Who Is Affected

You are affected if you do any of the following:

- Override theme include/layout files in your site.
- Maintain custom CSS that targets previous utility classes.
- Inject custom JS tied to old class names or menu open/close classes.

## Breaking Change Details

### 1. CSS Class Naming Migration

Old utility-like class selectors are no longer the stable API.

Examples of changed areas:

- Header/nav classes
- Hero and CTA wrappers
- Post card structure
- Pagination wrapper/classes
- Testimonials/contributions/social wrappers

Action:

- Update custom selectors to semantic classes (see `docs/components.md`).

### 2. Mobile Nav State Class Changes

Mobile menu visibility now uses `is-hidden` state on `.site-mobile-nav`.

Action:

- If you had custom JS toggling old classes, update it to use the new state class.

### 3. Post Page Enhancements

`layout: post` now supports reading progress by default.

Action:

- Disable if needed:

```yaml
theme_features:
  reading_progress: false
```

### 4. Configurable UI Copy

New `theme_text` keys control text introduced by the new UX components.

Action:

- Add only keys you want to override. Missing keys fall back to defaults.

### 5. Themeable Style Tokens

New `theme_style` keys allow color theming via `_config.yml`.

Action:

- Add tokens only if you need custom colors.

## Recommended Upgrade Process

1. Upgrade theme version in `Gemfile`.
2. Run `bundle install`.
3. Add optional config blocks (`theme_text`, `theme_style`, `theme_features`) incrementally.
4. If you maintain overrides, diff your files against latest theme files.
5. Update custom CSS selectors to semantic class names.
6. Run a full visual QA on:
   - Home
   - Blog
   - Post
   - Tag/archive pages
   - Mobile navigation

## Verification Checklist

- Nav active states work on Home, Blog, About, posts, and tag pages.
- Mobile menu opens/closes correctly and Escape closes it.
- Hero buttons and labels match your configured copy.
- Post pages render navigation and related-post blocks as expected.
- No stale CSS selectors remain from previous utility naming.
