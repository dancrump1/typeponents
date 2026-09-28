# typeponents

The component library and the API that stores it, in one repo.

- `web/` is the Next.js registry. `/browse` redirects to `/library`, which is the catalog UI.
- The NestJS app in this folder uses TypeORM and a local SQLite database (`data/typeponents.sqlite`).

## Run both

```bash
npm install
npm install --prefix web
npm run dev
```

That starts the API on port 3000 and the library on port 3008. Open http://localhost:3008/library.

`npm run seed` reloads SQLite from `web/registry`. Override the library location with `LIBRARY_PATH` and the database file with `DATABASE_PATH`.

## API

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/components` | Page of components. Query: `q`, `category`, `status`, `source`, `gated`, `hidden`, `limit`, `offset` |
| GET | `/components/categories` | Category names and counts |
| GET | `/components/:slug` | One component, including source files |

Hidden components are omitted unless you pass `hidden=all` or `hidden=true`. Gated components are included unless you pass `gated=false`.
