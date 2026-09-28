import { readFileSync } from 'node:fs';
import path from 'node:path';
import { DEFAULT_LIBRARY_PATH } from '../config';
import { parseCatalogSource } from './catalog';

describe('parseCatalogSource', () => {
  it('reads a catalog array out of the generated TypeScript file', () => {
    const source = `
      export const catalog: CatalogEntry[] = [
        {
          "slug": "css-box",
          "title": "CSS Box",
          "description": "A box",
          "interaction": "",
          "categories": ["Cards"],
          "tags": ["spring"],
          "inspiration": null,
          "dependencies": [],
          "registryDependencies": [],
          "props": [],
          "risk": { "heavy": false, "fullscreen": false, "clientOnly": false },
          "rating": 5,
          "status": "needs-review",
          "hidden": false,
          "gated": false,
          "importPath": "@/components/ui/css-box",
          "registryUrl": "https://example.com/r/css-box.json",
          "files": ["components/ui/css-box.tsx"]
        }
      ];
      export const catalogBySlug = new Map();
    `;

    const catalog = parseCatalogSource(source);
    expect(catalog).toHaveLength(1);
    expect(catalog[0].slug).toBe('css-box');
    expect(catalog[0].categories).toEqual(['Cards']);
  });

  it('parses the shadcn-style library catalog when it is present', () => {
    const catalogFile = path.join(
      process.env.LIBRARY_PATH ?? DEFAULT_LIBRARY_PATH,
      'registry',
      '__generated__',
      'catalog.ts',
    );
    const catalog = parseCatalogSource(readFileSync(catalogFile, 'utf8'));
    expect(catalog.length).toBeGreaterThan(400);
    expect(catalog.some((entry) => entry.slug === '3d-card')).toBe(true);
  });
});
