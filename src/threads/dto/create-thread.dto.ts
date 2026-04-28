import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateThreadDto {
  @ApiProperty({ description: 'Title of the thread' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Content of the thread' })
  @IsString()
  content: string;
}
