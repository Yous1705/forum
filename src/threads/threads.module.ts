import { Module } from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { ThreadsController } from './threads.controller';
import { ThreadRepository } from './threads.repository';

@Module({
  controllers: [ThreadsController],
  providers: [ThreadsService, ThreadRepository],
})
export class ThreadsModule {}
