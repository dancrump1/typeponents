import { mkdirSync } from 'node:fs';
import path from 'node:path';

export const DEFAULT_LIBRARY_PATH = '/home/dan/Testing/shadcn-style-lib';

export function libraryPath(): string {
  return process.env.LIBRARY_PATH ?? DEFAULT_LIBRARY_PATH;
}

/** File path for the local SQLite database, or `:memory:` for tests. */
export function databasePath(): string {
  const configured = process.env.DATABASE_PATH ?? 'data/typeponents.sqlite';
  if (configured === ':memory:') return configured;

  const resolved = path.resolve(configured);
  mkdirSync(path.dirname(resolved), { recursive: true });
  return resolved;
}
