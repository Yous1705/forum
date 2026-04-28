import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import {
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { loginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Make a new account' })
  @ApiResponse({ status: 201, description: 'Account created' })
  @ApiResponse({ status: 400, description: 'User already exists' })
  @ApiResponse({
    status: 400,
    description: 'Password must be longer than or equal to 6 character',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  register(@Body() dto: CreateAuthDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 201, description: 'login success' })
  @ApiResponse({ status: 400, description: 'Invalid email or password' })
  @ApiProperty({
    example: 'email@gmail.com',
    description: 'email user',
  })
  @ApiProperty({
    example: 'password123',
    description: 'email user',
  })
  login(@Body() data: loginDto) {
    return this.authService.login(data);
  }
}
