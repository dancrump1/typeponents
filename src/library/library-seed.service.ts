import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { libraryPath } from '../config';
import { CatalogRecord, parseCatalogSource } from './catalog';
import { ComponentFileEntity } from './component-file.entity';
import { ComponentEntity } from './component.entity';

@Injectable()
export class LibrarySeedService {
  private readonly logger = new Logger(LibrarySeedService.name);

  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async run(root = libraryPath()) {
    const catalogFile = path.join(
      root,
      'registry',
      '__generated__',
      'catalog.ts',
    );
    const componentsDir = path.join(root, 'registry', 'components');
    const catalog = parseCatalogSource(readFileSync(catalogFile, 'utf8'));

    let missingFolders = 0;
    const rows = catalog.map((entry) => {
      const folder = path.join(componentsDir, entry.slug);
      const sources = readSources(folder);
      if (sources.length === 0) missingFolders++;
      return toEntity(entry, sources);
    });

    await this.dataSource.transaction(async (manager) => {
      await manager
        .createQueryBuilder()
        .delete()
        .from(ComponentFileEntity)
        .execute();
      await manager
        .createQueryBuilder()
        .delete()
        .from(ComponentEntity)
        .execute();
      const batchSize = 40;
      for (let index = 0; index < rows.length; index += batchSize) {
        await manager.save(
          ComponentEntity,
          rows.slice(index, index + batchSize),
        );
      }
    });

    const summary = {
      library: root,
      components: rows.length,
      files: rows.reduce((sum, row) => sum + row.sources.length, 0),
      missingFolders,
    };
    this.logger.log(
      `Loaded ${summary.components} components (${summary.files} files) from ${root}`,
    );
    return summary;
  }
}

function toEntity(
  entry: CatalogRecord,
  sources: ComponentFileEntity[],
): ComponentEntity {
  const component = new ComponentEntity();
  component.slug = entry.slug;
  component.title = entry.title;
  component.description = entry.description ?? '';
  component.interaction = entry.interaction ?? '';
  component.primaryCategory = entry.categories[0] ?? 'Uncategorized';
  component.categories = entry.categories ?? [];
  component.tags = entry.tags ?? [];
  component.inspiration = entry.inspiration ?? null;
  component.inspirationSource = entry.inspiration?.source ?? null;
  component.dependencies = entry.dependencies ?? [];
  component.registryDependencies = entry.registryDependencies ?? [];
  component.props = entry.props ?? [];
  component.risk = entry.risk ?? {
    heavy: false,
    fullscreen: false,
    clientOnly: false,
  };
  component.rating = entry.rating ?? 5;
  component.status = entry.status ?? 'needs-review';
  component.hidden = entry.hidden ?? false;
  component.gated = entry.gated ?? false;
  component.importPath = entry.importPath;
  component.registryUrl = entry.registryUrl;
  component.files = entry.files ?? [];
  component.sources = sources;
  return component;
}

function readSources(folder: string): ComponentFileEntity[] {
  let stats;
  try {
    stats = statSync(folder);
  } catch {
    return [];
  }
  if (!stats.isDirectory()) return [];

  return walk(folder, folder).map((file) => {
    const entity = new ComponentFileEntity();
    entity.filename = file.filename;
    entity.content = file.content;
    return entity;
  });
}

function walk(
  directory: string,
  root: string,
): { filename: string; content: string }[] {
  const files: { filename: string; content: string }[] = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(fullPath, root));
      continue;
    }
    if (!entry.isFile()) continue;
    files.push({
      filename: path.relative(root, fullPath).split(path.sep).join('/'),
      content: readFileSync(fullPath, 'utf8'),
    });
  }
  return files;
}
