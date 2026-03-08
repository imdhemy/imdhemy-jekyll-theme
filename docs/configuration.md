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
  related_posts_heading: "Keep reading"
  comments_heading: "Discussion"
  comments_toggle_hint: "Open to view reactions and comments"
```

## Theme Features

```yaml
theme_features:
  reading_progress: true
```

- Set to `false` to disable the reading progress bar on post pages.

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
