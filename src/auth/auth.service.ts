import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthRepository } from './auth.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly repo: AuthRepository) {}

  async register(dto: CreateAuthDto) {
    const user = await this.repo.findUserByEmail(dto.email);

    if (user) {
      throw new BadRequestException('User already exists');
    }

    const hashed = await bcrypt.hash(dto.password, 10);

    return {
      name: dto.name,
      email: dto.email,
      password: dto.password,
    };
  }
}
