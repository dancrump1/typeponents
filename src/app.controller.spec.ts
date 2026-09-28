import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('names the service and lists the component routes', () => {
      const status = appController.getStatus();
      expect(status.name).toBe('typeponents');
      expect(status.endpoints).toContain('GET /components');
    });
  });
});
