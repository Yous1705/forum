import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  update(userId: number, data: Prisma.UserUpdateInput) {
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data,
    });
  }

  findUser(userId: number) {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }
}
