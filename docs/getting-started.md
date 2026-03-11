# Getting Started

## 1. Install (RubyGem)

Install the theme from RubyGems:

- Gem page: <https://rubygems.org/gems/imdhemy-jekyll-theme>

Add the theme to your site's `Gemfile`:

```ruby
gem "imdhemy-jekyll-theme"
```

Set it in `_config.yml`:

```yaml
theme: imdhemy-jekyll-theme
```

Then install dependencies:

```bash
bundle install
```

## 2. Migrate From `remote_theme`

If your site currently uses:

```yaml
remote_theme: imdhemy/imdhemy-jekyll-theme
```

Migrate to the gem setup:

1. Remove `remote_theme` from `_config.yml`.
2. Add `theme: imdhemy-jekyll-theme` to `_config.yml`.
3. Add `gem "imdhemy-jekyll-theme"` to your `Gemfile`.
4. Run `bundle install`.

## 3. Minimal Site Configuration

```yaml
title: "Your Site"
description: "Your site description"
url: "https://example.com"
baseurl: ""

author:
  name: "Your Name"
  description: "Writer, builder, and engineer"
  avatar: "/images/theme/avatar.jpeg"

navigation:
  - title: Home
    url: /
  - title: Blog
    url: /blog
  - title: About
    url: /about
```

For all available options, see [Configuration Reference](./configuration.md).

## 4. Blog Setup

Enable pagination and set your blog index page to use the `blog` layout.

```yaml
paginate: 10
paginate_path: "/blog/:num/"
```

Create `blog/index.html`:

```yaml
---
layout: blog
title: Blog
description: Latest posts
---
```

## 5. Home and Post Experience

- Home uses `layout: home` and includes hero, contributions, testimonials, latest posts, and social section.
- Posts use `layout: post` and include:
  - post header
  - optional post series (when `list` is set in front matter)
  - content body
  - collapsible discussions (Giscus, optional)
  - next/previous navigation
  - related posts
  - optional reading progress bar

## 6. Local Development

### Prerequisites

- Ruby 3.3.4 + Bundler
- Node.js 24 + npm

Version pins are defined in:

- `.ruby-version`
- `.nvmrc`
- `.node-version`
- `.tool-versions`

### Install dependencies

```bash
bundle install
npm install
```

### Start preview + JS watcher

```bash
npm start
```

This runs:

- `bundle exec rake preview`
- `vite build --watch`

### Useful standalone commands

```bash
npm run rake      # Jekyll preview only
npm run js:build  # JS production build
npm run js:watch  # JS watcher only
```

## 7. Optional Image Optimization

The gem ships an optional executable for downstream sites to optimize post images before publishing.

Examples:

```bash
bundle exec imdhemy-image path/to/image.jpg
bundle exec imdhemy-image assets/images
bundle exec imdhemy-image --recursive images/posts
bundle exec imdhemy-image --dry-run images/posts
```

Notes:

- it optimizes only the paths you pass in
- it does not run automatically during Jekyll preview or build
- it does not rewrite image references
- it prefers conservative same-format optimization
- supported formats currently focus on `jpg`, `jpeg`, and `png`

The executable uses available system optimizers when present, such as `jpegoptim`, `oxipng`, `pngcrush`, or `sips`.
