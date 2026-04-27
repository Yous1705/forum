import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly repo: UserRepository) {}
  async updateUser(userId: number, dto: UpdateUserDto) {
    if (dto.password) {
      const hashed = await bcrypt.hash(dto.password, 10);
      dto.password = hashed;
    }

    return this.repo.update(userId, {
      name: dto.name,
      password: dto.password,
    });
  }

  async findUser(userId: number) {
    const user = await this.repo.findUser(userId);

    if (!user) throw new BadRequestException('User not found');

    return {
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };
  }

  async getMyProfile(userId: number) {
    const user = await this.repo.findUser(userId);

    if (!user) throw new BadRequestException('User not found');

    return {
      name: user.name,
      email: user.email,
      password: user.password,
    };
  }
}
