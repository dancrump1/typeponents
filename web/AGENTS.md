# AGENTS.md

Instructions for AI agents working in this repo. It is a shadcn-style React
component registry: ~420 components, each one self-contained, published as
installable registry items.

## Component folder shape

Every component is a folder under `registry/components/<slug>/`, where `<slug>`
is kebab-case and identical to the `slug` in its `meta.ts`:

```
registry/components/vinyl-album-card/
	component.tsx            required — the component itself
	demo.tsx                 required — default-exported usage, rendered in the catalog
	meta.ts                  required — metadata (see below)
	use-something.ts         optional — colocated helpers, imported with "./…"
	styles.module.css        optional — colocated files of any type
	demo-<variant>.tsx       optional — extra examples
```

`component.tsx` is the entry point. The build walks its imports, so a file is
shipped because something reaches it — never because it was listed by hand.
`demo.tsx` must `export default` a component and import from `./component`.

## Import conventions

This repo follows standard shadcn conventions. Do not invent alternatives.

- `cn` lives at **`@/lib/utils`**. Never re-path it, never re-declare it, never
  create a second copy. The shadcn CLI rewrites this alias for consumers, so
  changing it breaks installs.
- Hooks shared by more than one component: `hooks/<use-name>.ts`, imported as
  `@/hooks/use-name`.
- Non-hook shared helpers: `lib/<name>.ts`, imported as `@/lib/name`.
- shadcn primitives: `@/components/ui/<name>`. These resolve against the
  consumer's own registry, so importing one is free.
- A helper used by exactly one component stays colocated in that component's
  folder.
- Components must not import app-level code (`@/components/*` outside
  `components/ui/`, `@/data/*`). Consumers don't have it and the build warns.

## Metadata

`registry/components/<slug>/meta.ts` is the **only** place metadata lives:

```ts
import { defineComponent } from "@/registry/schema";

export default defineComponent({
	slug: "vinyl-album-card",
	title: "Vinyl Album Card",
	description: "One scannable sentence.",
	interaction: "What the motion does, in plain English, for designers.",
	categories: ["Cards"],
	tags: ["hover", "spring"],
	inspiration: {
		source: "Great UI",
		url: "https://www.great-ui.com/components/vinyl-album-card",
		relationship: "port",
	},
	dependencies: ["motion"],
	registryDependencies: [],
	props: [],
	risk: { heavy: false, fullscreen: false, clientOnly: false },
	rating: 5,
	status: "needs-review",
	gated: true,
});
```

- The contract is `registry/schema.ts`. Read it before editing metadata;
  `defineComponent` validates at module load, so a bad field fails the build.
- `categories` must come from the closed `CATEGORIES` list in that file. Adding
  a category is a deliberate edit there, not an ad-hoc string.
- There are **no** separate categories/meta/credit JSON files. If you find
  yourself writing metadata anywhere other than a `meta.ts`, stop.
- `status: "needs-review"` means a human hasn't confirmed the metadata. Leave it
  until the gaps are actually filled.
- `gated: true` hides the component from the public catalog, `/r`, `/docs` and
  `llms.txt`. Great UI ports must be gated — their license forbids republishing
  them as a kit. Intake sets this automatically when the source is in
  `GATED_SOURCES`. Unlock in the UI with `GATED_LIBRARY_PASSWORD`.

## Generated files — never hand-edit

These are outputs. Edit the source (`meta.ts`, component files) and rebuild:

- `registry.json`
- `public/r/` (per-component install payloads, `index.json`)
- `public/docs/` (per-component agent markdown)
- `public/llms.txt`
- `registry/__generated__/` (`catalog.ts`, `demos.ts`, `gated.ts`)

## Commands

```bash
npm run registry:intake -- <url-or-file>   # import a component from another library
npm run registry:enrich                    # fill props + behaviour tags from source
npm run registry:attribute                 # fill inspiration from URLs in source comments
npm run registry:build                     # regenerate every artifact listed above
```

`registry:build` runs automatically as part of `npm run build`.

`registry:enrich` and `registry:attribute` only write fields that are still
empty, so both are safe to re-run and will not clobber hand-written metadata.

Behaviour tags are additive for the same reason, which means a tag can never be
corrected by re-running. To re-derive them after changing a signal pattern:

```bash
npx tsx scripts/v2/enrich.mts --retag        # add --dry to see the count first
```

That replaces the derived tags and keeps curated ones (`featured`, `internal`).

The one-time migration onto this layout has already run; its script is not in
the tree. See the `v2:` commits for what it did.

## Adding a component from another library

Most components here are ported from other libraries (great-ui.com, Aceternity
UI, React Bits, Fancy Components, Cult UI, Magic UI, Kokonut UI, …). Use the
intake script rather than copying files by hand:

```bash
# The library publishes a registry item — fully automatic:
npm run registry:intake -- https://www.great-ui.com/r/vinyl-album-card.json --category Cards

# Only raw source — pass attribution explicitly:
npm run registry:intake -- ./pasted.tsx --source-url <original page> --category Cards
```

Add `--dry` to see the plan, `--slug` to rename, `--force` to overwrite.

Intake normalises imports (`cn` → `@/lib/utils`, the library's internal aliases
→ our paths), promotes hooks/lib files without ever overwriting ours, writes
`meta.ts` with attribution pre-filled, and prints what still needs a human.

**Always fill in `inspiration`.** Designers use the source, author and
relationship to judge fit and to credit the original; a component without
attribution is a liability, not a shortcut. `relationship` is `"port"` for a
direct copy, `"adaptation"` when reworked, `"inspired-by"` when only the idea
carried over.

## Definition of done

A new component is not done until it has:

1. a working `demo.tsx` (not an intake scaffold),
2. at least one real category — `"Uncategorized"` is a triage bucket, not an
   answer,
3. a `description` a designer can scan.

Until then leave `status` as `"needs-review"` (or `"draft"` if the demo is still
a scaffold) so the gap stays visible in the UI.

## Style

Tabs for indentation, double quotes, semicolons. Block comments explain *why*
something non-obvious is the way it is; skip comments that restate the code.
