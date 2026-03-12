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
  read_article_label: "Read article"
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
- The search box appears in the desktop navbar and inside the mobile menu.
- Posts and pages are indexed by default.
- Set `search: false` in front matter to exclude a page or post from the search index.
- `content_limit` truncates indexed body text per document to reduce payload size.
- `content_preview_length` controls the result snippet length shown in the UI.

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
