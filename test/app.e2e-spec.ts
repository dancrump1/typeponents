import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

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

  afterEach(async () => {
    await app.close();
  });
});
