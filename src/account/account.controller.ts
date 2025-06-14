import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('account')
export default class AccountController {
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const userName = loginDto.username;
    return userName;
  }
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const userName = registerDto.username;
    return `${userName} 님 회원가입이 완료되었습니다.`;
  }
}
