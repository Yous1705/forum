import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Put,
} from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.auth.gurad';

@Controller('threads')
export class ThreadsController {
  constructor(private readonly threadsService: ThreadsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  postThreads(@Req() req, @Body() dto: CreateThreadDto) {
    return this.threadsService.creatThread(req.user.sub, dto);
  }

  @Get()
  getAllThreads() {
    return this.threadsService.findAllThreads();
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-threads')
  getAllMyThreads(@Req() req) {
    return this.threadsService.findMyThreads(req.user.sub);
  }

  @Get(':id')
  getThreadDetail(@Param('id') id: number) {
    return this.threadsService.findThreadsDetail(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateMyThreads(
    @Req() req,
    @Param('id') id: number,
    @Body() dto: UpdateThreadDto,
  ) {
    return this.threadsService.updateThread(req.user.sub, id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteMyThreads(@Req() req, @Param('id') id: number) {
    return this.threadsService.deleteThread(req.user.sub, id);
  }
}
