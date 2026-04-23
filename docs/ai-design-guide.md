# AI Design System Instructions

These instructions apply to agents making design, UI, or UX changes in this theme.

Use these instructions when changing Sass, templates, layout structure, interaction states, or content presentation.

## Primary Rules

1. Work mobile first.
2. Preserve and improve accessibility.
3. Keep the reading experience as the highest-priority UX goal.
4. Extend the existing design language before introducing new patterns.
5. Prefer semantic component classes and Sass partials over ad hoc utility-class expansion.

If a proposed change looks better on desktop but weakens mobile behavior or accessibility, the change is not acceptable.

## Theme Structure

The stylesheet entrypoint is [`assets/css/main.scss`](./../assets/css/main.scss). It loads [`_sass/style.scss`](./../_sass/style.scss), which forwards the theme in this order:

1. Base
2. Utilities
3. Components

Use these Sass areas:

- [`_sass/base/_reset.scss`](./../_sass/base/_reset.scss): browser normalization and foundational element defaults
- [`_sass/base/_typography.scss`](./../_sass/base/_typography.scss): global type rendering choices
- [`_sass/utilities/`](./../_sass/utilities): reusable layout, visual, typography, interaction, and responsive helpers
- [`_sass/components/_core.scss`](./../_sass/components/_core.scss): main site UI and content presentation
- [`_sass/components/_highlight.scss`](./../_sass/components/_highlight.scss): code highlighting

Prefer editing semantic component styles in `_core.scss` or the appropriate partial. Do not scatter one-off classes through templates when a semantic selector already exists.

## Design System Principles

### Typography

Use Inter as the primary interface and reading font for non-code typography.

You must:

- Use `--font-sans`, currently `"Inter", ui-sans-serif, system-ui, sans-serif`, for non-code typography.
- Use generic `monospace` for code typography, including `code`, `kbd`, `pre`, `samp`, and syntax highlighting.
- Use the shared text and heading tokens for font size, line height, weight, and tracking.
- Prefer moderate emphasis: `400` for body text, `500` or `600` for labels and headings, and `700` only when strong emphasis is justified.
- Keep the scale restrained like OpenAI Developers: default prose should use the medium text token, large text should be reserved for lead copy, and card/list titles should not jump to marketing-scale headings.
- Because Inter renders visually heavier than OpenAI Sans, article and post headings should generally use `500` with normal tracking; reserve `600` for high-level marketing or section headings only.

You must not:

- Bundle or reference proprietary fonts such as `OpenAI Sans` unless a compatible license is verified and documented.
- Reintroduce stale theme fonts such as `Manrope` or `Source Serif 4`.
- Add hardcoded font stacks or one-off typography values when an existing token fits.

Typography changes must preserve readability before visual novelty. On mobile, check line wrapping, heading balance, paragraph rhythm, and touch-adjacent label clarity before refining desktop scale.

### Content First

Treat this theme primarily as a reading experience for articles, pages, and structured content.

Visual changes must support:

- fast scanning
- comfortable long-form reading
- clear CTA hierarchy
- stable navigation
- strong contrast between primary content and decorative surfaces

Decorative ideas must not reduce clarity, reading width, spacing rhythm, or content discoverability.

### Semantic Components Over Utility Sprawl

Use semantic classes such as `.site-header`, `.hero-section`, `.post-card`, `.post-title`, `.content`, and `.primary-button`.

When modifying the UI, you must:

- Prefer updating existing semantic selectors.
- Add new semantic classes only when introducing a real new component or state.
- Avoid reintroducing utility-first markup patterns into templates.
- Avoid coupling templates to spacing-only or breakpoint-only class names unless there is already an established pattern for that element.

### Reuse Existing Tokens and Visual Language

Use the existing design tokens before adding new values. The theme exposes CSS custom properties such as:

- `--color-bg`
- `--color-surface`
- `--color-text`
- `--color-muted`
- `--color-border`
- `--color-brand`
- `--color-brand-strong`
- `--color-brand-soft`
- `--color-brand-surface`

When changing colors, emphasis, surfaces, or interaction states, you must:

- Reuse these tokens first.
- Keep contrast strong enough for body copy, labels, links, and controls.
- Keep the brand color as an accent, not a blanket fill for all UI.

## Responsive Strategy

### Mobile First Is Required

Begin all new UI work from the smallest practical viewport and scale upward.

Use this approach:

1. Define the default component styles for mobile outside media queries.
2. Add larger-screen enhancements with `min-width` queries.
3. Use `max-width` queries only for narrow, justified exceptions.

Keep the theme mobile-first. Do not add desktop-first overrides when a mobile-first rule can solve the problem.

When changing layout, you must:

- Assume touch-first interaction on small screens.
- Keep navigation, buttons, cards, and content blocks usable at narrow widths.
- Verify text wraps cleanly without horizontal scrolling.
- Ensure media, tables, and math content do not break the viewport.

### Breakpoints

Use the established breakpoints from [`_sass/utilities/_responsive.scss`](./../_sass/utilities/_responsive.scss):

- `640px`
- `768px`
- `1024px`
- `1280px`
- `1536px`

Do not add new breakpoint values casually. Reuse the existing set unless a component has a strong reason to diverge.

### Layout Expectations

Preserve these layout behaviors:

- Containers must remain visually centered and constrained.
- Mobile spacing must feel compact but not cramped.
- Desktop enhancements must increase structure, not just increase empty space.
- Cards and article shells must keep readable widths.
- Sticky or floating UI must not obstruct content on small screens.

## Accessibility Requirements

Treat accessibility as a required part of the design system, not an optional polish step.

Every UI change must protect or improve:

- keyboard access
- focus visibility
- semantic HTML structure
- readable contrast
- screen-reader clarity
- reduced-motion support
- touch target usability

### Required Accessibility Practices

- Preserve the global skip link.
- Preserve `aria-*` behavior on interactive controls.
- Keep keyboard navigation intact for menus, toggles, links, and expandable sections.
- Do not remove visible focus styles without replacing them with an equal or better alternative.
- Keep interactive targets large enough to use on touch screens.
- Keep heading order logical inside layouts and includes.
- Do not communicate meaning by color alone.
- Respect `prefers-reduced-motion`.
- Avoid low-contrast text on decorative surfaces.
- Keep touch targets comfortably usable on mobile; small icon-only buttons should be enlarged with padding or a larger hit area.
- Keep keyboard and pointer states in parity; hover-only affordances must have an equivalent focus-visible or persistent state.
- Prefer explicit live-region messaging for dynamic UI such as search status, async loading, and disclosure updates when the state is not otherwise obvious.
- Use `aria-current` for active navigation and current-position patterns where applicable.
- When multiple links in the same card target the same destination, make the screen-reader experience intentional and avoid repetitive, ambiguous link text.

Preserve these existing accessibility patterns:

- mobile nav toggle with `aria-controls` and `aria-expanded`
- focus-visible styling on navigation and buttons
- reduced-motion handling in `_core.scss`
- skip-link support in the default layout and header shell

If a visual change introduces ambiguity for keyboard users or screen readers, revise the markup or interaction model before shipping it.

## UX Expectations By Area

### Header and Navigation

Treat the header as a stable orientation element. Changes must preserve:

- clear brand visibility
- obvious navigation hierarchy
- reliable mobile toggle behavior
- a clean scrolled state without loss of contrast

Do not hide critical navigation behind hover-only behavior.

### Hero and Landing Sections

The home page hero must keep:

- immediate value communication
- a clear primary CTA
- restrained decoration
- centered, readable messaging on small screens

Do not add dense visual clutter or multiple competing accent treatments.

### Post Cards and Listings

Listings must optimize scanability:

- title first
- supporting metadata second
- excerpt clarity over ornament
- consistent spacing and alignment across cards

Desktop card enhancements must collapse cleanly to a stacked mobile layout.

For post cards with thumbnails, you must:

- Keep the title as the primary decision anchor.
- Use thumbnails to support scanning, not overpower the title or excerpt.

### Post Pages

Post pages must preserve a strong reading-oriented hierarchy.

Required order:

1. Back link
2. Title
3. Meta
4. Tags
5. Series navigation
6. Image
7. Content

For post pages, you must:

- Keep the title as the first dominant content element.
- Keep series navigation as secondary context, not a pre-title block.
- Keep featured images supportive; they must not lead the hierarchy ahead of the title.
- Keep comments secondary to the article body.

### Comments

Treat comments as supporting engagement UI, not primary reading content.

You must:

- Keep comments collapsed by default unless the product explicitly prioritizes discussion as the primary post-page goal.
- Keep the collapsed state discoverable with clear heading and helper copy.
- Preserve keyboard and screen-reader access to the toggle and panel.

### Article and Page Content

Treat the `.content` area as core product UX. You must protect:

- readable line length
- strong typography hierarchy
- sufficient spacing around headings, lists, tables, code blocks, blockquotes, and admonitions
- overflow handling for tables, math, and embedded media

Do not apply decorative styles that make long-form reading slower or noisier.

## Working Rules for Codex and Other AI Agents

When implementing UI changes, you must:

1. Inspect the existing component and surrounding layout before editing.
2. Prefer modifying current Sass partials over inventing a parallel styling path.
3. Preserve class naming consistency with the existing semantic pattern.
4. If markup changes are required, keep accessibility hooks and interaction contracts intact.
5. Treat desktop-only requests as responsive tasks and verify mobile behavior explicitly.
6. Keep changes local to the relevant component unless there is a clear shared-system reason to generalize.
7. After accessibility-related changes, verify keyboard order, focus visibility, and reduced-motion behavior before considering the task complete.

When introducing a new component, you must:

- Create a semantic class name.
- Place styles in the most relevant Sass partial.
- Define the mobile version first.
- Add larger-screen enhancements second.
- Include focus, hover, active, and disabled states where relevant.

You must not introduce:

- One-off inline styles.
- Arbitrary new color values when tokens already exist.
- Excessive motion.
- Very light text on tinted backgrounds.
- Hard-coded widths that break on mobile.
- Visual-only fixes that ignore markup semantics.

## Verification Checklist

Before finalizing a UI or UX change, you must verify:

- The component works at a narrow mobile viewport first.
- The component still works at tablet and desktop widths.
- There is no unintended horizontal scrolling.
- Focus states remain visible.
- Keyboard interaction still works.
- Contrast remains readable.
- Motion remains acceptable for reduced-motion users.
- Content pages still feel readable after the change.
- Homepage, blog/archive, and post/page layouts still feel like the same theme.

## Related Docs

- [Customization Guide](./customization.md)
- [Components and Layouts](./components.md)
- [Content Elements](./content-elements.md)
