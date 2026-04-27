import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthRepository } from './auth.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly repo: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: CreateAuthDto) {
    const user = await this.repo.findUserByEmail(dto.email);

    if (user) {
      throw new BadRequestException('User already exists');
    }

    const hashed = await bcrypt.hash(dto.password, 10);

    return this.repo.create({
      name: dto.name,
      email: dto.email,
      password: hashed,
    });
  }

  async login(data: { email: string; password: string }) {
    const user = await this.repo.findUserByEmail(data.email);

    if (!user) {
      throw new BadRequestException('Invalid email');
    }

    const isMatch = await bcrypt.compare(data.password, user.password);

    if (!isMatch) return new BadRequestException('Invalid password');

    const payload = {
      sub: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
