# Content Elements: Blockquotes and Admonitions

This theme supports styled blockquotes and admonitions in post/page content.

## Blockquote

Use standard Markdown:

```md
> Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.
```

## Admonitions

Admonitions are rendered using HTML blocks with one of these classes:

- `note`
- `tip`
- `info`
- `caution`
- `danger`

### Note

```html
<div class="note">
  <p>This is a note for additional context.</p>
</div>
```

### Tip

```html
<div class="tip">
  <p>This is a practical tip for readers.</p>
</div>
```

### Info

```html
<div class="info">
  <p>This is informational content.</p>
</div>
```

### Caution

```html
<div class="caution">
  <p>This indicates something readers should verify carefully.</p>
</div>
```

### Danger

```html
<div class="danger">
  <p>This highlights a high-risk or critical warning.</p>
</div>
```

## Markdown Inside Admonitions

Enable Markdown rendering inside the block:

```html
<div class="tip" markdown="1">
Use **bold**, `inline code`, and [links](https://example.com) here.
</div>
```

## UX Guidance

- Use `note` and `info` for neutral support information.
- Use `tip` for actionable recommendations.
- Reserve `caution` and `danger` for truly important warnings.
- Keep admonitions concise; avoid chaining many in a row.
