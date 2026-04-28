import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ThreadRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.ThreadsCreateInput) {
    return this.prisma.threads.create({
      data,
    });
  }

  update(threadsId: number, data: Prisma.ThreadsUpdateInput) {
    return this.prisma.threads.update({
      where: {
        id: threadsId,
      },
      data,
    });
  }

  delete(threadId: number) {
    return this.prisma.threads.delete({
      where: { id: threadId },
    });
  }

  findUser(userId: number) {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  findAllThreads() {
    return this.prisma.threads.findMany({
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  findMyThreads(userId: number) {
    return this.prisma.threads.findMany({
      where: { userId },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  findThreadsDetail(id: number) {
    return this.prisma.threads.findUnique({
      where: {
        id,
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
  }
}
