# Configuration Reference

## Core Site Keys

```yaml
title: "Your Site"
description: "Site description"
url: "https://example.com"
baseurl: ""
```

## Author

```yaml
author:
  name: "Your Name"
  description: "Short bio"
  avatar: "/images/theme/avatar.jpeg"
```

## Navigation

```yaml
navigation:
  - title: Home
    url: /
  - title: Blog
    url: /blog
  - title: About
    url: /about
```

Notes:

- Active nav state works for normal pages, blog pages, post pages, and tag/archive routes.
- URLs are normalized (`index.html` and `.html` are handled).

## Theme Text

All keys are optional and have defaults.

```yaml
theme_text:
  hero_kicker: "Personal blog and engineering notes"
  hero_cta_label: "Start reading"
  hero_secondary_cta_label: "About me"
  hero_secondary_cta_url: "/about"
  latest_posts_subtitle: "Fresh writing you can read in a few minutes."
  back_to_posts_label: "Back to all posts"
  previous_article_label: "Previous article"
  next_article_label: "Next article"
  series_toggle_hint: "Collapse to hide series posts"
  related_posts_heading: "Keep reading"
  comments_heading: "Discussion"
  comments_toggle_hint: "Open to view reactions and comments"
  search_placeholder: "Search"
  search_clear_label: "Clear search"
  search_submit_label: "Search site content"
  search_idle_text: "Start typing to search the site."
  search_too_short_text: "Type at least %d characters to search."
  search_loading_text: "Loading search index..."
  search_empty_text: "No results found."
  search_error_text: "Search is unavailable right now."
```

## Theme Features

```yaml
theme_features:
  reading_progress: true
  series_visible_limit: 5
```

- Set to `false` to disable the reading progress bar on post pages.
- `series_visible_limit` defines how many series items are shown before the `... X other posts` reveal control appears.

## Search

```yaml
theme_search:
  enabled: true
  min_query_length: 2
  max_results: 8
  content_limit: 6000
  content_preview_length: 140
```

- Search is client-side and reads from the generated `/assets/search.json` index.
- The published theme ships the `assets/search.json` template, so `remote_theme` and gem consumers generate the index automatically during `jekyll build`.
- The search box appears in the desktop navbar and inside the mobile menu.
- Posts and pages are indexed by default.
- Set `search: false` in front matter to exclude a page or post from the search index.
- `content_limit` truncates indexed body text per document to reduce payload size.
- `content_preview_length` controls the result snippet length shown in the UI.

## SEO

All keys are optional.

```yaml
theme_seo:
  title_separator: "|"
  default_image: "/images/social.png"
  default_image_alt: "Site social preview"
  twitter_site: "@your_handle"
  locale: "en_US"
  type: "Person"
  name: "Your Name"
  logo: "/images/theme/logo.png"
  same_as:
    - "https://github.com/your-user"
    - "https://linkedin.com/in/your-user"
  robots_default: "index, follow"
  enable_breadcrumbs: true
```

Behavior:

- SEO metadata is rendered for all layouts, not only posts.
- Posts get `article:*` meta tags and `BlogPosting` structured data.
- Home gets `WebSite` structured data.
- Blog and archive pages get `CollectionPage` structured data.
- Breadcrumb structured data is enabled by default.
- `default_image` is used when a page or post does not provide `image`.
- Social image metadata includes `og:image`, `og:image:secure_url` for HTTPS images, conservative `og:image:type` hints for common file extensions, and both OG/Twitter image alt text when `image_alt` or `default_image_alt` is provided.

Recommended post/page front matter:

```yaml
---
title: "Post title"
description: "Clear summary for search and social previews"
image: "/images/posts/social-card.jpg"
image_alt: "Meaningful description for the social preview image"
keywords:
  - payments
  - laravel
last_modified_at: 2026-03-13 12:00:00 +0000
robots: "index, follow"
noindex: false
sitemap: true
seo_title: "Optional custom title for SERP snippets"
---
```

Notes:

- `description` is strongly recommended for pages, posts, blog hubs, and archives.
- Use `noindex: true` for pages that should stay crawlable but not be indexed.
- Use `sitemap: false` to exclude a page or post from `sitemap.xml`.
- If a page uses `noindex: true` and should also stay out of `sitemap.xml`, set `sitemap: false` as well.
- `robots` overrides the default robots policy entirely for a page.
- `seo_title` lets you shorten or refine the search snippet title without changing the on-page heading.

## Post Series Front Matter

Use `list` in post front matter to group posts into a linked series.

```yaml
---
layout: post
title: "Part 2"
list: "Building a payment gateway"
---
```

- The series block is rendered at the top of the post header.
- All posts with the same `list` value are listed in chronological order.
- The current post is highlighted.
- The series block is open by default and can be collapsed.

## Comments (Giscus)

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

- Comments render only on post pages.
- Required keys: `repo`, `repo_id`, `category`, `category_id`.
- `host` and `term` are optional and map to Giscus script options.
- Reactions are controlled by `reactions_enabled`.

## Theme Style Tokens

All keys are optional.
The default scheme is based on primary color `#3b82f6`.

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

## Footer Social Links

```yaml
footer:
  social:
    - icon: logo-github
      url: "https://github.com/your-user"
    - icon: logo-linkedin
      url: "https://linkedin.com/in/your-user"
```

## Optional Sections

### Contributions

```yaml
contributions:
  - name: Project Name
    url: "https://example.com"
    logo: "/images/theme/project-logo.png"
```

### Testimonials

```yaml
testimonials:
  - name: "Person Name"
    description: "Role"
    image: "/images/theme/avatar.jpeg"
    content: "Testimonial text"
```
