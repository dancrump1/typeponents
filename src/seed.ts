import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LibrarySeedService } from './library/library-seed.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  try {
    const summary = await app.get(LibrarySeedService).run();
    console.log(summary);
  } finally {
    await app.close();
  }
}

bootstrap().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
