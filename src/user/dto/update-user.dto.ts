import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({ description: 'Updated name of the user' })
  @IsOptional()
  name: string;

  @ApiPropertyOptional({ description: 'Updated password for the user account' })
  @IsOptional()
  password: string;
}
