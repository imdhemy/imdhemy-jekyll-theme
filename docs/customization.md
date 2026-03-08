# Customization Guide

## Styling Strategy

The theme now uses semantic component classes with Sass, not utility-class styling.

Recommended customization order:

1. Start with `_config.yml` (`theme_text`, `theme_style`, `theme_features`).
2. Override component styles in your own stylesheet.
3. Override includes/layouts only if structure changes are required.

## Brand and Color

Use `theme_style` tokens for most visual branding updates:

```yaml
theme_style:
  accent: "#3b82f6"
  accent_strong: "#2563eb"
  accent_soft: "#dbeafe"
  accent_surface: "#eff6ff"
  success: "#16a34a"
  info: "#2563eb"
  warning: "#d97706"
  danger: "#dc2626"
  background: "#eef4ff"
  surface: "#ffffff"
  text: "#0f172a"
  muted: "#475569"
  border: "#c9d8f2"
```

## Hero Content

Use `theme_text` to control hero messaging and CTAs:

```yaml
theme_text:
  hero_kicker: "Engineering, product, and architecture"
  hero_cta_label: "Read articles"
  hero_secondary_cta_label: "Work with me"
  hero_secondary_cta_url: "/contact"
```

## Reading Experience

- Reading progress bar is enabled by default.
- Disable it if your audience prefers minimal UI:

```yaml
theme_features:
  reading_progress: false
```

## Comments and Reactions

Use Giscus to enable reactions and comments on post pages:

```yaml
theme_comments:
  enabled: true
  provider: "giscus"
  giscus:
    host: "https://giscus.app"
    repo: "owner/repo"
    repo_id: "R_kgDOExample"
    category: "General"
    category_id: "DIC_kwDOExample4Cc0JvA"
    mapping: "pathname"
    term: ""
    strict: "0"
    reactions_enabled: "1"
    emit_metadata: "0"
    input_position: "bottom"
    theme: "preferred_color_scheme"
    lang: "en"
    loading: "lazy"
```

Keep `enabled: false` while bootstrapping IDs to avoid empty integrations.

## Safe Template Overrides

If you override include files in your site:

- Keep original include names (e.g. `header.html`, `hero.html`).
- Preserve required accessibility attributes (`aria-*`, skip link behavior).
- Keep nav logic normalization if you edit active link checks.

## Advanced CSS Overrides

If you need custom CSS overrides, target semantic classes such as:

- `.site-header`, `.site-header.is-scrolled`
- `.hero-section`, `.hero-title`, `.primary-button`, `.secondary-button`
- `.post-card`, `.post-navigation`, `.related-posts`
- `.content`

Avoid relying on internal spacing values in case of future minor updates.
