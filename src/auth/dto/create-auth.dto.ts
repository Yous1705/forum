import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Min, MinLength } from 'class-validator';

export class CreateAuthDto {
  @ApiProperty({ example: 'Naruto ', description: 'Nama User' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'example@gmail.com', description: 'Email User' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456', description: 'Password User' })
  @IsString()
  @MinLength(6)
  password: string;
}
