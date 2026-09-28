import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databasePath } from './config';
import { ComponentFileEntity } from './library/component-file.entity';
import { ComponentEntity } from './library/component.entity';
import { LibraryModule } from './library/library.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'better-sqlite3' as const,
        database: databasePath(),
        entities: [ComponentEntity, ComponentFileEntity],
        synchronize: process.env.TYPEORM_SYNC !== 'false',
      }),
    }),
    LibraryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
