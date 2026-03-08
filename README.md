# Imdhemy Jekyll Theme

Jekyll theme for my personal website. [imdhemy.com](https://imdhemy.com)

## Installation (Recommended: RubyGem)

Install the theme as a gem and pin a semantic version.

Add to your site's `Gemfile`:

```ruby
gem "imdhemy-jekyll-theme", "1.0.0"
```

Set the theme in your site's `_config.yml`:

```yaml
theme: imdhemy-jekyll-theme
```

Then run:

```bash
bundle install
```

## Migrating From `remote_theme`

If your site currently uses:

```yaml
remote_theme: imdhemy/imdhemy-jekyll-theme
```

Migrate to the gem flow:

1. Remove `remote_theme` from `_config.yml`.
2. Add `theme: imdhemy-jekyll-theme` to `_config.yml`.
3. Add `gem "imdhemy-jekyll-theme", "<semantic-version>"` to your `Gemfile`.
4. Run `bundle install`.

## Usage

You can find examples in the [example](/example) directory.

## Customize Theme Copy

The theme exposes UI text keys so users can control the added content from `_config.yml`.

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

theme_features:
  reading_progress: true

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

## Development Quick Start

Use this sequence every time you start working on the theme locally.

### 1. Prerequisites

- Ruby 3.3.4 + Bundler
- Node.js 24 + npm

The project pins runtime versions in:

- `.ruby-version`
- `.nvmrc`
- `.node-version`
- `.tool-versions`

### 2. Install dependencies

```bash
bundle install
npm install
```

### 3. Start development

Run the theme preview and JS watcher together:

```bash
npm start
```

This runs:

- `bundle exec rake preview` to serve the example site from `http://127.0.0.1:4000/example/`
- `vite build --watch` to rebuild `assets/js/dist/main.js` on JS changes

### 4. Day-to-day workflow

- Edit layouts/includes/styles in the theme root.
- Edit sample content under `example/` to verify real pages.
- Keep `npm start` running while you work.

### 5. Useful standalone commands

```bash
npm run rake      # Jekyll preview only
npm run js:build  # JS production build
npm run js:watch  # JS watcher only
```

## License

The theme is available as open source under the terms of the [MIT License](/LICENSE.txt).
