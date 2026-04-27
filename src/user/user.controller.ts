import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.auth.gurad';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('my-profile')
  getMyProfile(@Req() req) {
    return this.userService.getMyProfile(req.user.sub);
  }

  @Get(':id')
  findUser(@Param('id') id: number) {
    return this.userService.findUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update')
  updateUser(@Req() req, @Body() dto: UpdateUserDto) {
    return this.userService.updateUser(req.user.sub, dto);
  }
}
