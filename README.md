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

## Development Quick Start

Use this sequence every time you start working on the theme locally.

### 1. Prerequisites

- Ruby + Bundler
- Node.js + npm

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
