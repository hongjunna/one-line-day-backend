import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('account')
export default class AccountController {
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    // Logic for handling login
    return { message: 'Login successful', user: loginDto.username };
  }
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    // Logic for handling registration
    return { message: 'Registration successful', user: registerDto.username };
  }
}
