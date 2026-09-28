export type InspirationRecord = {
  source?: string;
  url?: string;
  author?: string;
  authorUrl?: string;
  relationship?: string;
  note?: string;
  license?: string;
};

export type PropRecord = {
  name: string;
  type: string;
  default?: string;
  description: string;
  required: boolean;
};

export type RiskRecord = {
  heavy: boolean;
  fullscreen: boolean;
  clientOnly: boolean;
};

/** One row of `registry/__generated__/catalog.ts` from the component library. */
export type CatalogRecord = {
  slug: string;
  title: string;
  description: string;
  interaction: string;
  categories: string[];
  tags: string[];
  inspiration: InspirationRecord | null;
  dependencies: string[];
  registryDependencies: string[];
  props: PropRecord[];
  risk: RiskRecord;
  rating: number;
  status: 'stable' | 'needs-review' | 'draft';
  hidden: boolean;
  gated: boolean;
  importPath: string;
  registryUrl: string;
  files: string[];
};

/**
 * Pulls the generated catalog array out of its TypeScript wrapper.
 * The array is JSON; the surrounding `export` lines are not.
 */
export function parseCatalogSource(source: string): CatalogRecord[] {
  const marker = source.indexOf('export const catalog');
  if (marker < 0) {
    throw new Error('catalog export not found');
  }

  const assigned = source.indexOf('=', marker);
  const start = source.indexOf('[', assigned);
  if (assigned < 0 || start < 0) {
    throw new Error('catalog array not found');
  }

  const end = findMatchingBracket(source, start);
  const parsed: unknown = JSON.parse(source.slice(start, end + 1));
  if (!Array.isArray(parsed)) {
    throw new Error('catalog export is not an array');
  }

  return parsed.map((entry) => {
    if (!isCatalogRecord(entry)) {
      throw new Error('catalog entry is missing a slug');
    }
    return entry;
  });
}

function findMatchingBracket(source: string, start: number): number {
  let depth = 0;
  let inString = false;
  let escaped = false;

  for (let index = start; index < source.length; index++) {
    const char = source[index];
    if (inString) {
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === '"') inString = false;
      continue;
    }
    if (char === '"') {
      inString = true;
      continue;
    }
    if (char === '[') depth++;
    else if (char === ']') {
      depth--;
      if (depth === 0) return index;
    }
  }

  throw new Error('unterminated catalog array');
}

function isCatalogRecord(value: unknown): value is CatalogRecord {
  return (
    typeof value === 'object' &&
    value !== null &&
    'slug' in value &&
    typeof value.slug === 'string'
  );
}
