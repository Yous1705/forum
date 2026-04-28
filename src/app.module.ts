import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { ThreadsModule } from './threads/threads.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, ThreadsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
