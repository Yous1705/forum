import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { ThreadRepository } from './threads.repository';

@Injectable()
export class ThreadsService {
  constructor(private readonly repo: ThreadRepository) {}

  async creatThread(userId: number, dto: CreateThreadDto) {
    const user = await this.repo.findUser(userId);

    if (!user) throw new UnauthorizedException('Login to make a thread');

    return this.repo.create({
      title: dto.title,
      content: dto.content,
      user: { connect: { id: userId } },
    });
  }

  async updateThread(userId: number, threadsId: number, dto: UpdateThreadDto) {
    const user = await this.repo.findUser(userId);
    if (!user) throw new UnauthorizedException('Login to update a thread');

    const thread = await this.repo.findThreadsDetail(threadsId);
    if (!thread) throw new BadRequestException('Thread not found');

    if (thread.userId !== userId)
      throw new UnauthorizedException('This is not your thread');

    return this.repo.update(threadsId, {
      title: dto.title,
      content: dto.content,
    });
  }

  async deleteThread(userId: number, threadsId: number) {
    const user = await this.repo.findUser(userId);
    if (!user) throw new UnauthorizedException('Login to delete a thread');

    const thread = await this.repo.findThreadsDetail(threadsId);
    if (!thread) throw new BadRequestException('Thread not found');

    if (thread.userId !== userId)
      throw new UnauthorizedException('This is not your thread');

    return this.repo.delete(threadsId);
  }

  async findAllThreads() {
    const threads = await this.repo.findAllThreads();

    if (!threads) return [];

    return threads;
  }

  async findMyThreads(userId: number) {
    const user = await this.repo.findUser(userId);

    if (!user) throw new UnauthorizedException('Login to see your threads');

    const threads = await this.repo.findMyThreads(userId);

    if (!threads) return [];

    return threads;
  }

  async findThreadsDetail(id: number) {
    const thread = await this.repo.findThreadsDetail(id);

    if (!thread) throw new BadRequestException('Thread not found');

    return thread;
  }
}
