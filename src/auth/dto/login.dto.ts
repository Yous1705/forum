import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './create-auth.dto';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class loginDto {
  @ApiProperty({
    example: 'email@gmail.com',
    description: 'email user',
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'email user',
  })
  @IsString()
  password: string;
}
