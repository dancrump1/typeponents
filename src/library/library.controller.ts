import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { ComponentQuery, LibraryService } from './library.service';

@Controller('components')
export class LibraryController {
  constructor(private readonly library: LibraryService) {}

  @Get('categories')
  categories() {
    return this.library.categories();
  }

  @Get()
  findAll(
    @Query('q') q?: string,
    @Query('category') category?: string,
    @Query('status') status?: string,
    @Query('source') source?: string,
    @Query('gated') gated?: string,
    @Query('hidden') hidden?: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    const query: ComponentQuery = {
      q: q?.trim() || undefined,
      category: category?.trim() || undefined,
      status: status?.trim() || undefined,
      source: source?.trim() || undefined,
      gated: parseOptionalBoolean(gated),
      hidden: hidden === 'all' ? 'all' : parseOptionalBoolean(hidden),
      limit: clampInt(limit, 50, 1, 1000),
      offset: clampInt(offset, 0, 0, 100_000),
    };
    return this.library.findPage(query);
  }

  @Get(':slug')
  findOne(
    @Param('slug') slug: string,
    @Query('sources') sources?: string,
  ) {
    return this.library.findOne(slug, { sources: sources === 'true' });
  }

  @Patch(':slug')
  update(@Param('slug') slug: string, @Body() body: unknown) {
    return this.library.update(slug, body);
  }
}

function parseOptionalBoolean(value: string | undefined): boolean | undefined {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return undefined;
}

function clampInt(
  value: string | undefined,
  fallback: number,
  min: number,
  max: number,
): number {
  if (value === undefined || value === '') return fallback;
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
}
