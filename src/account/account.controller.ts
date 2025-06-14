import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import AccountService from './account.service';
import { Account } from './entity/account.entity';
import { Profile } from './entity/profile.entity';

@Controller('account')
export default class AccountController {
  constructor(private readonly accountService: AccountService) {}
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const userName = loginDto.username;
    return await this.accountService.login(loginDto);
  }
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const accountData: Account = {
      username: registerDto.username,
      password: registerDto.password,
      created_at: new Date(),
      is_active: true,
    };
    const profileData: Profile = {
      username: registerDto.username,
      nickname: registerDto.nickname,
      email: registerDto.email,
    };
    return await this.accountService.register(accountData, profileData);
  }
}
