import { Controller, Post, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) { }

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.service.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.service.login(dto);
  }

  @Get('users')
  findAll() {
    return this.service.findAll();
  }

  @Post('make-admin/:id')
  makeAdmin(@Body('id') id: number) {
    return this.service.makeAdmin(id);
  }
}
