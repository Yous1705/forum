import { IsEmail, IsString, Min } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Min(6)
  password: string;
}
