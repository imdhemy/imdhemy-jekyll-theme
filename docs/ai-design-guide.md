# AI Design System Guide

This guide is for AI agents making design, UI, or UX changes in this theme. It is written primarily for Codex-style contributors working directly in the repository.

Use this document when changing Sass, templates, layout structure, interaction states, or content presentation.

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

Relevant Sass areas:

- [`_sass/base/_reset.scss`](./../_sass/base/_reset.scss): browser normalization and foundational element defaults
- [`_sass/base/_typography.scss`](./../_sass/base/_typography.scss): global type rendering choices
- [`_sass/utilities/`](./../_sass/utilities): reusable layout, visual, typography, interaction, and responsive helpers
- [`_sass/components/_core.scss`](./../_sass/components/_core.scss): main site UI and content presentation
- [`_sass/components/_highlight.scss`](./../_sass/components/_highlight.scss): code highlighting

Prefer editing the semantic component styles in `_core.scss` or the appropriate partial instead of scattering one-off classes through templates.

## Design System Principles

### Content First

This theme is primarily a reading experience for articles, pages, and structured content. Visual changes should support:

- fast scanning
- comfortable long-form reading
- clear CTA hierarchy
- stable navigation
- strong contrast between primary content and decorative surfaces

Decorative ideas should not reduce clarity, reading width, spacing rhythm, or content discoverability.

### Semantic Components Over Utility Sprawl

The current theme uses semantic classes such as `.site-header`, `.hero-section`, `.post-card`, `.post-title`, `.content`, and `.primary-button`.

When modifying the UI:

- prefer updating existing semantic selectors
- add new semantic classes only when introducing a real new component or state
- avoid reintroducing utility-first markup patterns into templates
- avoid coupling templates to spacing-only or breakpoint-only class names unless there is already an established pattern for that element

### Reuse Existing Tokens and Visual Language

The theme already exposes design tokens through CSS custom properties such as:

- `--color-bg`
- `--color-surface`
- `--color-text`
- `--color-muted`
- `--color-border`
- `--color-brand`
- `--color-brand-strong`
- `--color-brand-soft`
- `--color-brand-surface`

When changing colors, emphasis, surfaces, or interaction states:

- reuse these tokens first
- keep contrast strong enough for body copy, labels, links, and controls
- keep the brand color as an accent, not a blanket fill for all UI

## Responsive Strategy

### Mobile First Is Required

All new UI work should begin from the smallest practical viewport and scale upward.

Expected approach:

1. Define the default component styles for mobile outside media queries.
2. Add larger-screen enhancements with `min-width` queries.
3. Use `max-width` queries only for narrow, justified exceptions.

This theme already has a mostly mobile-first structure. Keep moving it in that direction rather than adding desktop-first overrides.

When changing layout:

- assume touch-first interaction on small screens
- keep navigation, buttons, cards, and content blocks usable at narrow widths
- verify text wraps cleanly without horizontal scrolling
- ensure media, tables, and math content do not break the viewport

### Breakpoints

Current responsive utilities use these major breakpoints in [`_sass/utilities/_responsive.scss`](./../_sass/utilities/_responsive.scss):

- `640px`
- `768px`
- `1024px`
- `1280px`
- `1536px`

Do not add new breakpoint values casually. Prefer reusing the existing set unless a component has a strong reason to diverge.

### Layout Expectations

Common layout behavior to preserve:

- containers should remain visually centered and constrained
- mobile spacing should feel compact but not cramped
- desktop enhancements should increase structure, not just increase empty space
- cards and article shells should keep readable widths
- sticky or floating UI must not obstruct content on small screens

## Accessibility Requirements

Accessibility is a required part of the design system, not an optional polish step.

Every UI change should protect or improve:

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

Existing examples in the theme:

- mobile nav toggle with `aria-controls` and `aria-expanded`
- focus-visible styling on navigation and buttons
- reduced-motion handling in `_core.scss`
- skip-link support in the default layout and header shell

If a visual change introduces ambiguity for keyboard users or screen readers, revise the markup or interaction model before shipping it.

## UX Expectations By Area

### Header and Navigation

The header is a stable orientation element. Changes should preserve:

- clear brand visibility
- obvious navigation hierarchy
- reliable mobile toggle behavior
- a clean scrolled state without loss of contrast

Do not hide critical navigation behind hover-only behavior.

### Hero and Landing Sections

The home page hero should keep:

- immediate value communication
- a clear primary CTA
- restrained decoration
- centered, readable messaging on small screens

Avoid adding dense visual clutter or multiple competing accent treatments.

### Post Cards and Listings

Listings should optimize scanability:

- title first
- supporting metadata second
- excerpt clarity over ornament
- consistent spacing and alignment across cards

Desktop card enhancements must still collapse cleanly to a stacked mobile layout.

For post cards with thumbnails:

- image-first cards are acceptable when the title remains the primary decision anchor
- the thumbnail should support scanning, not overpower the title or excerpt

### Post Pages

Post pages should preserve a strong reading-oriented hierarchy.

Required order:

1. Back link
2. Title
3. Meta
4. Tags
5. Series navigation
6. Image
7. Content

Rules for post pages:

- the title must remain the first dominant content element
- series navigation is secondary context, not a pre-title block
- featured images support the article and should not lead the hierarchy ahead of the title
- comments should remain secondary to the article body

### Comments

Comments are supporting engagement UI, not primary reading content.

Preferred default:

- keep comments collapsed by default unless the product explicitly prioritizes discussion as the primary post-page goal
- keep the collapsed state discoverable with clear heading and helper copy
- preserve keyboard and screen-reader access to the toggle and panel

### Article and Page Content

The `.content` area is core product UX. Protect:

- readable line length
- strong typography hierarchy
- sufficient spacing around headings, lists, tables, code blocks, blockquotes, and admonitions
- overflow handling for tables, math, and embedded media

Do not apply decorative styles that make long-form reading slower or noisier.

## Working Rules for Codex and Other AI Agents

When implementing UI changes:

1. Inspect the existing component and surrounding layout before editing.
2. Prefer modifying current Sass partials over inventing a parallel styling path.
3. Preserve class naming consistency with the existing semantic pattern.
4. If markup changes are required, keep accessibility hooks and interaction contracts intact.
5. Treat desktop-only requests as responsive tasks and verify mobile behavior explicitly.
6. Keep changes local to the relevant component unless there is a clear shared-system reason to generalize.

When introducing a new component:

- create a semantic class name
- place styles in the most relevant Sass partial
- define the mobile version first
- add larger-screen enhancements second
- include focus, hover, active, and disabled states where relevant

Avoid:

- one-off inline styles
- arbitrary new color values when tokens already exist
- excessive motion
- very light text on tinted backgrounds
- hard-coded widths that break on mobile
- visual-only fixes that ignore markup semantics

## Verification Checklist

Before finalizing a UI or UX change, verify:

- the component works at a narrow mobile viewport first
- the component still works at tablet and desktop widths
- there is no unintended horizontal scrolling
- focus states remain visible
- keyboard interaction still works
- contrast remains readable
- motion remains acceptable for reduced-motion users
- content pages still feel readable after the change
- homepage, blog/archive, and post/page layouts still feel like the same theme

## Related Docs

- [Customization Guide](./customization.md)
- [Components and Layouts](./components.md)
- [Content Elements](./content-elements.md)
