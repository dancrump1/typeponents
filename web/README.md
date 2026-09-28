# Component registry

A shadcn-style registry of ~420 React components. Each one is a self-contained
folder that installs with the shadcn CLI — the CLI rewrites `cn` and other
aliases to match the consuming project's `components.json`, so you don't have
to.

This is the **v2** layout. Source of truth is `registry/components/<slug>/`.

## Browse

| Path | Purpose |
|------|---------|
| `/library` | Catalog: category sidebar, source/behaviour filters, hover previews |
| `/library/{slug}` | Detail: live demo, install command, props, source, attribution, **Copy for agent** |
| `/docs/{slug}.md` | The same page as markdown (what "Copy page" copies) |
| `/r/{slug}.json` | Installable registry item |
| `/llms.txt` | Agent index of every component |

Old routes (`/browse`, `/catalog`, `/all`, `/find`, `/categories`, `/new`)
redirect to `/library`.

## Install in a client project

```bash
npx shadcn@latest add https://components.drivedev.net/r/3d-card.json
```

Or in the consumer's `components.json`:

```json
{
  "registries": {
    "@dbs": "https://components.drivedev.net/r/{name}.json"
  }
}
```

Then `npx shadcn@latest add @dbs/3d-card`.

## Internal (password-gated) collection

Great UI components are in this repo for designers, but they are **not**
published as a public kit — their license forbids that. They are omitted from
`/library` (until unlocked), `/r`, `/docs` and `/llms.txt`.

Set `GATED_LIBRARY_PASSWORD` in `.env.local` (see `.env.example`). Designers
unlock the collection at `/library/unlock`.

## Add a component

Prefer the intake script over copying files by hand — it normalises `cn` to
`@/lib/utils` and pre-fills attribution:

```bash
npm run registry:intake -- https://www.great-ui.com/r/vinyl-album-card.json --category Cards
```

A finished component looks like:

```
registry/components/vinyl-album-card/
  component.tsx   required
  demo.tsx        required, default-exported, imports from ./component
  meta.ts         required — the only place metadata lives
```

See `AGENTS.md` for the full contract. After editing, rebuild:

```bash
npm run registry:build
```

## For agents

- `/llms.txt` — every component, grouped by category
- `/docs/{name}.md` — description, install command, props, full source, attribution
- The detail page **Copy for agent** button copies a short prompt whose first
  step is the shadcn CLI, so the agent does not guess where `cn` lives

```bash
npm run mcp:build
```

Then point a consumer Cursor project at `mcp-server/dist/index.js` (see
`.cursor/mcp.example.json`).
