# typeponents

NestJS API that mirrors the component registry in `~/Testing/shadcn-style-lib` into a local SQLite database with TypeORM.

The React library stays the place you edit components. This app reads the generated catalog and each component folder, then stores metadata and source so you can query them over HTTP.

## Setup

```bash
npm install
npm run seed
npm run start:dev
```

`npm run seed` replaces the local database with the current library. Point it somewhere else with `LIBRARY_PATH`. The database file defaults to `data/typeponents.sqlite` (`DATABASE_PATH`).

## API

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/components` | Page of components. Query: `q`, `category`, `status`, `source`, `gated`, `hidden`, `limit`, `offset` |
| GET | `/components/categories` | Category names and counts |
| GET | `/components/:slug` | One component, including source files |

Hidden components are omitted unless you pass `hidden=all` or `hidden=true`. Gated components are included unless you pass `gated=false`.
