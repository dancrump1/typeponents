import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { DataSource } from 'typeorm';
import { AppModule } from './../src/app.module';
import { ComponentEntity } from './../src/library/component.entity';

process.env.DATABASE_PATH = ':memory:';

describe('Library API (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET / describes the API', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect((response) => {
        expect(response.body.name).toBe('typeponents');
      });
  });

  it('GET /components returns an empty page before seeding', () => {
    return request(app.getHttpServer())
      .get('/components')
      .expect(200)
      .expect((response) => {
        expect(response.body.total).toBe(0);
        expect(response.body.items).toEqual([]);
      });
  });

  it('GET /components/:slug returns 404 for an unknown slug', () => {
    return request(app.getHttpServer())
      .get('/components/missing-card')
      .expect(404);
  });

  it('PATCH /components/:slug updates stored metadata', async () => {
    await app.get(DataSource).getRepository(ComponentEntity).save(sample());

    await request(app.getHttpServer())
      .patch('/components/css-box')
      .send({
        title: 'Updated Box',
        description: 'Edited from the library',
        categories: ['Buttons', 'Cards'],
        rating: 8,
        status: 'stable',
        hidden: true,
        inspiration: {
          source: 'Aceternity UI',
          url: 'https://ui.aceternity.com/components/css-box',
          relationship: 'adaptation',
        },
      })
      .expect(200)
      .expect((response) => {
        expect(response.body.title).toBe('Updated Box');
        expect(response.body.description).toBe('Edited from the library');
        expect(response.body.primaryCategory).toBe('Buttons');
        expect(response.body.categories).toEqual(['Buttons', 'Cards']);
        expect(response.body.rating).toBe(8);
        expect(response.body.status).toBe('stable');
        expect(response.body.hidden).toBe(true);
        expect(response.body.inspirationSource).toBe('Aceternity UI');
        expect(response.body.slug).toBe('css-box');
      });
  });

  it('PATCH /components/:slug rejects unknown fields and missing rows', async () => {
    await request(app.getHttpServer())
      .patch('/components/missing-card')
      .send({ title: 'Nope' })
      .expect(404);

    await app.get(DataSource).getRepository(ComponentEntity).save(sample());

    await request(app.getHttpServer())
      .patch('/components/css-box')
      .send({ slug: 'renamed', rating: 99 })
      .expect(400);
  });

  afterEach(async () => {
    await app.close();
  });
});

function sample(): ComponentEntity {
  const component = new ComponentEntity();
  component.slug = 'css-box';
  component.title = 'CSS Box';
  component.description = 'A box';
  component.interaction = '';
  component.primaryCategory = 'Cards';
  component.categories = ['Cards'];
  component.tags = [];
  component.inspiration = null;
  component.inspirationSource = null;
  component.dependencies = [];
  component.registryDependencies = [];
  component.props = [];
  component.risk = { heavy: false, fullscreen: false, clientOnly: false };
  component.rating = 5;
  component.status = 'needs-review';
  component.hidden = false;
  component.gated = false;
  component.importPath = '@/components/ui/css-box';
  component.registryUrl = 'https://example.com/r/css-box.json';
  component.files = [];
  component.sources = [];
  return component;
}
