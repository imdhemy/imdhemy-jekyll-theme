## Generate instructions
- Follow instructions in ~/.codex/AGENTS.md as a general instructions if they exist.

## UI/UX changes
- Follow [the AI Design Guide](./docs/ai-design-guide.md).
- Keep the AI Design Guide updated when necessary.
- Challenge prompts that deviates from the AI Design Guide.
- Accessibility is a required acceptance criterion for every UI/UX change, not optional polish.
- Review mobile accessibility before desktop refinements.
- Preserve semantic HTML, landmark structure, the global skip link, heading order, and existing ARIA contracts.
- Keep all interactive elements keyboard reachable with visible focus states and touch-friendly target sizes.
- Do not rely on color alone for active, current, expanded, selected, or disabled states.
- Respect `prefers-reduced-motion` for new or updated motion effects.
- Validate accessibility-sensitive interactions such as navigation menus, search, disclosures, pagination, and card links after changes.
- Update this file and [the AI Design Guide](./docs/ai-design-guide.md) when introducing new accessibility patterns or requirements.
- For SEO-related changes, preserve canonical URLs, metadata coverage, structured data validity, and crawl/indexation behavior across all layouts.
- Treat SEO output as server-rendered theme behavior; do not move critical metadata generation into client-side JavaScript.
