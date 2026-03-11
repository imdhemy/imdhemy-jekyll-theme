# Imdhemy Jekyll Theme

Jekyll theme for my personal website: [imdhemy.com](https://imdhemy.com).

## Documentation

All documentation lives in the [`docs/`](./docs) directory.

- [Documentation Home](./docs/README.md)
- [Getting Started](./docs/getting-started.md)
- [Configuration Reference](./docs/configuration.md)
- [Customization Guide](./docs/customization.md)
- [AI Design System Guide](./docs/ai-design-guide.md)
- [Components and Layouts](./docs/components.md)
- [Content Elements](./docs/content-elements.md)
- [Upgrade Guide](./UPGRADE.md)

## Optional Tooling

The gem also ships an optional image optimization executable for downstream sites:

```bash
bundle exec imdhemy-image path/to/image.jpg
bundle exec imdhemy-image --recursive assets/images
bundle exec imdhemy-image --dry-run path/to/images
```

The tool is opt-in and intended for projects using the theme. It is not part of the theme render pipeline.

Inside this theme repository during development, use the local wrapper instead:

```bash
./bin/imdhemy-image assets/images/social.png
```

## Example Site

A complete runnable example is available in [`example/`](./example).

## Development

Use the local workflow documented in [Getting Started](./docs/getting-started.md#5-local-development).

## License

The theme is available as open source under the terms of the [MIT License](./LICENSE.txt).
