# Getting Started

## 1. Install

Add the theme to your site's `Gemfile`:

```ruby
gem "imdhemy-jekyll-theme", "1.0.0"
```

Set it in `_config.yml`:

```yaml
theme: imdhemy-jekyll-theme
```

Then install dependencies:

```bash
bundle install
```

## 2. Minimal Site Configuration

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

## 3. Blog Setup

Enable pagination and set your blog index page to use the `blog` layout.

Example:

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

## 4. Home and Post Experience

- Home uses `layout: home` and includes hero, contributions, testimonials, latest posts, and social section.
- Posts use `layout: post` and include:
  - post header
  - content body
  - next/previous navigation
  - related posts
  - optional reading progress bar

## 5. Local Development

```bash
npm install
npm start
```

This runs Jekyll preview and JS watch mode.
