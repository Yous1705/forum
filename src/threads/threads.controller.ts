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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Threads')
@Controller('threads')
export class ThreadsController {
  constructor(private readonly threadsService: ThreadsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new thread' })
  @ApiResponse({ status: 201, description: 'Thread successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  @ApiBearerAuth()
  @Post()
  postThreads(@Req() req, @Body() dto: CreateThreadDto) {
    return this.threadsService.creatThread(req.user.sub, dto);
  }

  @ApiOperation({ summary: 'Get all threads' })
  @ApiResponse({ status: 200, description: 'List of all threads.' })
  @Get()
  getAllThreads() {
    return this.threadsService.findAllThreads();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get all threads created by the authenticated user',
  })
  @ApiResponse({ status: 200, description: 'List of user threads.' })
  @ApiBearerAuth()
  @Get('my-threads')
  getAllMyThreads(@Req() req) {
    return this.threadsService.findMyThreads(req.user.sub);
  }

  @ApiOperation({ summary: 'Get thread details by ID' })
  @ApiResponse({ status: 200, description: 'Thread details.' })
  @ApiResponse({ status: 404, description: 'Thread not found.' })
  @Get(':id')
  getThreadDetail(@Param('id') id: number) {
    return this.threadsService.findThreadsDetail(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a thread by ID' })
  @ApiResponse({ status: 200, description: 'Thread successfully updated.' })
  @ApiResponse({ status: 404, description: 'Thread not found.' })
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
