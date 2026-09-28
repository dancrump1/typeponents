import type { InspirationRecord, PropRecord, RiskRecord } from './catalog';

const STATUSES = ['stable', 'needs-review', 'draft'] as const;
const RELATIONSHIPS = ['port', 'adaptation', 'inspired-by', 'original'] as const;

const COMPONENT_FIELDS = [
  'title',
  'description',
  'interaction',
  'categories',
  'tags',
  'inspiration',
  'dependencies',
  'registryDependencies',
  'props',
  'risk',
  'rating',
  'status',
  'hidden',
  'gated',
  'importPath',
  'registryUrl',
  'files',
] as const;

const INSPIRATION_FIELDS = [
  'source',
  'url',
  'author',
  'authorUrl',
  'relationship',
  'note',
  'license',
] as const;

export type ComponentStatus = (typeof STATUSES)[number];

/** Columns a client may change. Slug and source files stay put. */
export type ComponentUpdate = {
  title?: string;
  description?: string;
  interaction?: string;
  categories?: string[];
  tags?: string[];
  inspiration?: InspirationRecord | null;
  dependencies?: string[];
  registryDependencies?: string[];
  props?: PropRecord[];
  risk?: RiskRecord;
  rating?: number;
  status?: ComponentStatus;
  hidden?: boolean;
  gated?: boolean;
  importPath?: string;
  registryUrl?: string;
  files?: string[];
};

export function parseComponentUpdate(
  body: unknown,
): { ok: true; value: ComponentUpdate } | { ok: false; message: string } {
  if (body === null || typeof body !== 'object' || Array.isArray(body)) {
    return { ok: false, message: 'Request body must be an object' };
  }

  const record = body as Record<string, unknown>;
  const unknown = Object.keys(record).filter(
    (key) => !COMPONENT_FIELDS.includes(key as (typeof COMPONENT_FIELDS)[number]),
  );
  if (unknown.length > 0) {
    return { ok: false, message: `Unknown fields: ${unknown.join(', ')}` };
  }
  if (Object.keys(record).length === 0) {
    return { ok: false, message: 'No fields to update' };
  }

  try {
    const value: ComponentUpdate = {};
    if ('title' in record) {
      value.title = requiredText(record.title, 'title');
    }
    if ('description' in record) {
      value.description = optionalText(record.description, 'description');
    }
    if ('interaction' in record) {
      value.interaction = optionalText(record.interaction, 'interaction');
    }
    if ('categories' in record) {
      value.categories = stringList(record.categories, 'categories', {
        min: 1,
      });
    }
    if ('tags' in record) value.tags = stringList(record.tags, 'tags');
    if ('inspiration' in record) {
      value.inspiration = parseInspiration(record.inspiration);
    }
    if ('dependencies' in record) {
      value.dependencies = stringList(record.dependencies, 'dependencies');
    }
    if ('registryDependencies' in record) {
      value.registryDependencies = stringList(
        record.registryDependencies,
        'registryDependencies',
      );
    }
    if ('props' in record) value.props = parseProps(record.props);
    if ('risk' in record) value.risk = parseRisk(record.risk);
    if ('rating' in record) value.rating = parseRating(record.rating);
    if ('status' in record) value.status = parseStatus(record.status);
    if ('hidden' in record) value.hidden = parseBoolean(record.hidden, 'hidden');
    if ('gated' in record) value.gated = parseBoolean(record.gated, 'gated');
    if ('importPath' in record) {
      value.importPath = requiredText(record.importPath, 'importPath');
    }
    if ('registryUrl' in record) {
      value.registryUrl = requiredText(record.registryUrl, 'registryUrl');
    }
    if ('files' in record) value.files = stringList(record.files, 'files');
    return { ok: true, value };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid update';
    return { ok: false, message };
  }
}

function parseInspiration(value: unknown): InspirationRecord | null {
  if (value === null) return null;
  if (typeof value !== 'object' || Array.isArray(value)) {
    throw new Error('inspiration must be an object or null');
  }

  const record = value as Record<string, unknown>;
  const unknown = Object.keys(record).filter(
    (key) =>
      !INSPIRATION_FIELDS.includes(key as (typeof INSPIRATION_FIELDS)[number]),
  );
  if (unknown.length > 0) {
    throw new Error(`Unknown inspiration fields: ${unknown.join(', ')}`);
  }

  const inspiration: InspirationRecord = {};
  if ('source' in record) {
    inspiration.source = requiredText(record.source, 'inspiration.source');
  }
  if ('url' in record) {
    inspiration.url = parseUrl(record.url, 'inspiration.url');
  }
  if ('author' in record) {
    inspiration.author = requiredText(record.author, 'inspiration.author');
  }
  if ('authorUrl' in record) {
    inspiration.authorUrl = parseUrl(record.authorUrl, 'inspiration.authorUrl');
  }
  if ('relationship' in record) {
    if (
      typeof record.relationship !== 'string' ||
      !RELATIONSHIPS.includes(
        record.relationship as (typeof RELATIONSHIPS)[number],
      )
    ) {
      throw new Error(
        `inspiration.relationship must be one of ${RELATIONSHIPS.join(', ')}`,
      );
    }
    inspiration.relationship = record.relationship;
  }
  if ('note' in record) {
    inspiration.note = optionalText(record.note, 'inspiration.note');
  }
  if ('license' in record) {
    inspiration.license = optionalText(record.license, 'inspiration.license');
  }
  return inspiration;
}

function parseProps(value: unknown): PropRecord[] {
  if (!Array.isArray(value)) throw new Error('props must be an array');
  return value.map((item, index) => {
    if (item === null || typeof item !== 'object' || Array.isArray(item)) {
      throw new Error(`props.${index} must be an object`);
    }
    const record = item as Record<string, unknown>;
    const allowed = ['name', 'type', 'default', 'description', 'required'];
    const unknown = Object.keys(record).filter((key) => !allowed.includes(key));
    if (unknown.length > 0) {
      throw new Error(
        `Unknown fields on props.${index}: ${unknown.join(', ')}`,
      );
    }
    const prop: PropRecord = {
      name: requiredText(record.name, `props.${index}.name`),
      type: requiredText(record.type, `props.${index}.type`),
      description:
        record.description === undefined
          ? ''
          : optionalText(record.description, `props.${index}.description`),
      required: parseBoolean(record.required, `props.${index}.required`),
    };
    if ('default' in record && record.default !== undefined) {
      prop.default = optionalText(record.default, `props.${index}.default`);
    }
    return prop;
  });
}

function parseRisk(value: unknown): RiskRecord {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error('risk must be an object');
  }
  const record = value as Record<string, unknown>;
  const allowed = ['heavy', 'fullscreen', 'clientOnly'];
  const unknown = Object.keys(record).filter((key) => !allowed.includes(key));
  if (unknown.length > 0) {
    throw new Error(`Unknown risk fields: ${unknown.join(', ')}`);
  }
  return {
    heavy: parseBoolean(record.heavy, 'risk.heavy'),
    fullscreen: parseBoolean(record.fullscreen, 'risk.fullscreen'),
    clientOnly: parseBoolean(record.clientOnly, 'risk.clientOnly'),
  };
}

function parseRating(value: unknown): number {
  if (typeof value !== 'number' || !Number.isInteger(value) || value < 1 || value > 10) {
    throw new Error('rating must be an integer from 1 to 10');
  }
  return value;
}

function parseStatus(value: unknown): ComponentStatus {
  if (typeof value !== 'string' || !STATUSES.includes(value as ComponentStatus)) {
    throw new Error(`status must be one of ${STATUSES.join(', ')}`);
  }
  return value as ComponentStatus;
}

function parseBoolean(value: unknown, field: string): boolean {
  if (typeof value !== 'boolean') throw new Error(`${field} must be a boolean`);
  return value;
}

function requiredText(value: unknown, field: string): string {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`${field} must be a non-empty string`);
  }
  return value.trim();
}

function optionalText(value: unknown, field: string): string {
  if (typeof value !== 'string') throw new Error(`${field} must be a string`);
  return value;
}

function parseUrl(value: unknown, field: string): string {
  const text = requiredText(value, field);
  if (!/^https?:\/\//.test(text)) {
    throw new Error(`${field} must be an http(s) URL`);
  }
  return text;
}

function stringList(
  value: unknown,
  field: string,
  options?: { min?: number },
): string[] {
  if (!Array.isArray(value) || value.some((item) => typeof item !== 'string')) {
    throw new Error(`${field} must be an array of strings`);
  }
  const items = value.map((item) => item.trim()).filter((item) => item !== '');
  if (options?.min !== undefined && items.length < options.min) {
    throw new Error(`${field} needs at least ${options.min} item`);
  }
  return items;
}
