import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComponentFileEntity } from './component-file.entity';
import { ComponentEntity } from './component.entity';
import { LibraryController } from './library.controller';
import { LibrarySeedService } from './library-seed.service';
import { LibraryService } from './library.service';

@Module({
  imports: [TypeOrmModule.forFeature([ComponentEntity, ComponentFileEntity])],
  controllers: [LibraryController],
  providers: [LibraryService, LibrarySeedService],
  exports: [LibrarySeedService],
})
export class LibraryModule {}
