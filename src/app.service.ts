import { Injectable } from '@nestjs/common';
import { databasePath, libraryPath } from './config';

@Injectable()
export class AppService {
  getStatus() {
    return {
      name: 'typeponents',
      database: databasePath(),
      library: libraryPath(),
      endpoints: [
        'GET /components',
        'GET /components/categories',
        'GET /components/:slug',
        'PATCH /components/:slug',
      ],
    };
  }
}
