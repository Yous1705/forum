import { PartialType } from '@nestjs/mapped-types';
import { CreateThreadDto } from './create-thread.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateThreadDto extends PartialType(CreateThreadDto) {
  @ApiPropertyOptional({ description: 'Updated title of the thread' })
  title?: string;

  @ApiPropertyOptional({ description: 'Updated content of the thread' })
  content?: string;
}
