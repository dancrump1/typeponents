import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { parseComponentUpdate } from './component-update';
import { ComponentEntity } from './component.entity';

export type ComponentQuery = {
  q?: string;
  category?: string;
  status?: string;
  source?: string;
  gated?: boolean;
  hidden?: boolean | 'all';
  limit: number;
  offset: number;
};

@Injectable()
export class LibraryService {
  constructor(
    @InjectRepository(ComponentEntity)
    private readonly components: Repository<ComponentEntity>,
  ) {}

  async findPage(query: ComponentQuery) {
    const filtered = this.applyFilters(
      this.components.createQueryBuilder('component'),
      query,
    );
    const total = await filtered.clone().getCount();
    const items = await filtered
      .orderBy('component.rating', 'DESC')
      .addOrderBy('component.title', 'ASC')
      .skip(query.offset)
      .take(query.limit)
      .getMany();

    return {
      total,
      limit: query.limit,
      offset: query.offset,
      items,
    };
  }

  async findOne(slug: string, options?: { sources?: boolean }) {
    const component = await this.components.findOne({
      where: { slug },
      relations: options?.sources ? { sources: true } : undefined,
    });
    if (!component) {
      throw new NotFoundException(`Component "${slug}" was not found`);
    }
    return component;
  }

  async update(slug: string, body: unknown) {
    const existing = await this.components.findOneBy({ slug });
    if (!existing) {
      throw new NotFoundException(`Component "${slug}" was not found`);
    }

    const parsed = parseComponentUpdate(body);
    if (!parsed.ok) {
      throw new BadRequestException(parsed.message);
    }

    const values: Partial<ComponentEntity> = { ...parsed.value };
    if (parsed.value.categories) {
      values.primaryCategory = parsed.value.categories[0];
    }
    if ('inspiration' in parsed.value) {
      values.inspirationSource = parsed.value.inspiration?.source ?? null;
    }

    this.components.merge(existing, values);
    await this.components.save(existing);
    return existing;
  }

  async categories() {
    const rows = await this.components.find({
      select: { categories: true },
      where: { hidden: false },
    });
    const counts = new Map<string, number>();
    for (const row of rows) {
      for (const category of row.categories ?? []) {
        counts.set(category, (counts.get(category) ?? 0) + 1);
      }
    }
    return [...counts.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((left, right) => left.name.localeCompare(right.name));
  }

  private applyFilters(
    qb: ReturnType<Repository<ComponentEntity>['createQueryBuilder']>,
    query: ComponentQuery,
  ) {
    if (query.hidden !== 'all') {
      qb.andWhere('component.hidden = :hidden', {
        hidden: query.hidden ?? false,
      });
    }
    if (query.gated !== undefined) {
      qb.andWhere('component.gated = :gated', { gated: query.gated });
    }
    if (query.status) {
      qb.andWhere('component.status = :status', { status: query.status });
    }
    if (query.source) {
      qb.andWhere('component.inspirationSource = :source', {
        source: query.source,
      });
    }
    if (query.category) {
      qb.andWhere(
        `(component.primaryCategory = :category OR component.categories LIKE :categoryMatch ESCAPE '\\')`,
        {
          category: query.category,
          categoryMatch: `%"${escapeLike(query.category)}"%`,
        },
      );
    }
    if (query.q) {
      const term = `%${escapeLike(query.q)}%`;
      qb.andWhere(
        `(component.slug LIKE :term ESCAPE '\\' OR component.title LIKE :term ESCAPE '\\' OR component.description LIKE :term ESCAPE '\\' OR component.tags LIKE :term ESCAPE '\\')`,
        { term },
      );
    }
    return qb;
  }
}

function escapeLike(value: string): string {
  return value.replace(/[\\%_]/g, (char) => `\\${char}`);
}
