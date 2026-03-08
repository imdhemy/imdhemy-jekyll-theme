# Content Elements

This guide documents the content elements supported by the theme and how to use them in posts/pages.

Reference example: [`example/_posts/2022-12-22-elements.md`](../example/_posts/2022-12-22-elements.md).

## Paragraphs and Links

Use normal Markdown paragraphs and links:

```md
A paragraph with a [link](https://example.com).
```

## Horizontal Rule

```md
---
```

## Headings

```md
# H1
## H2
### H3
#### H4
##### H5
###### H6
```

## Lists

### Ordered list

```md
1. First
2. Second
3. Third
```

### Unordered list

```md
- First
- Second
- Third
```

## Tables

### Normal table

```md
| Name | Role | Team |
|------|:----:|-----:|
| Ada  | Eng  | Core |
| Lin  | PM   | Web  |
```

### Wide table

If a table is wide, keep it in Markdown; the content shell supports horizontal overflow naturally.

```md
| Long column | Another long column | Extra long column |
|-------------|---------------------|-------------------|
| Value 1     | Value 2             | Value 3           |
```

## Blockquotes

```md
> Two things are infinite: the universe and human stupidity.
```

## Admonitions

Use HTML blocks with one of these classes:

- `note`
- `tip`
- `info`
- `caution`
- `danger`

### Note

```html
<div class="note">
  <p>This is a note.</p>
</div>
```

### Tip

```html
<div class="tip">
  <p>This is a practical tip.</p>
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
  <p>This needs extra care.</p>
</div>
```

### Danger

```html
<div class="danger">
  <p>This indicates high risk.</p>
</div>
```

### Markdown inside admonitions

```html
<div class="tip" markdown="1">
Use **bold**, `inline code`, and [links](https://example.com) here.
</div>
```

## Code and Syntax Highlighting

### Fenced code block

````md
```php
<?php

echo "Hello";
```
````

### Inline code

```md
Use `bundle exec jekyll build` to build the site.
```

### Rouge highlight block (line numbers)

```liquid
{% highlight ruby linenos %}
def foo
  puts 'foo'
end
{% endhighlight %}
```

### Highlight specific lines

```liquid
{% highlight ruby mark_lines="1 2" %}
def foo
  puts 'foo'
end
{% endhighlight %}
```

### Diff block

````md
```diff
+ Added line
- Removed line
```
````

## Images

```md
![Cover image](/example/images/posts/pic-01.jpeg)
```

Use descriptive alt text.

## Embedded Video

### YouTube

```html
<iframe class="w-full aspect-video" src="https://www.youtube.com/embed/8Qn_spdM5Zg" frameborder="0" allowfullscreen></iframe>
```

### Vimeo

```html
<iframe class="w-full aspect-video" src="https://player.vimeo.com/video/1084537" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
```

## Embedded Audio

### SoundCloud

```html
<iframe class="w-full aspect-auto" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/240233494&amp;color=ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"></iframe>
```

### Spotify

```html
<iframe src="https://embed.spotify.com/?uri=spotify:track:6rqhFgbbKwnb9MLmUQDhG6" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>
```

## Math Formulas (MathJax)

Enable math rendering in front matter:

```yaml
---
layout: post
title: "Math Post"
math: true
---
```

### Inline formula

```md
$x^2 + y^2 = z^2$
```

### Block formula

```md
$$
\int_0^\infty x^2 dx
$$
```

## Element Authoring Tips

- Prefer Markdown first, then HTML only when needed.
- Keep embeds purposeful; avoid stacking many heavy iframes in one article.
- Use admonitions sparingly to maintain visual hierarchy.
- Use semantic heading order (`h1 -> h2 -> h3`) for readability and accessibility.
