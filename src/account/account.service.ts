import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './entity/account.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Profile } from './entity/profile.entity';

@Injectable()
export default class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async register(
    accountData: Account,
    profileData: Profile,
  ): Promise<{ account: Account; profile: Profile }> {
    const { username, password } = accountData;
    const existingUser = await this.accountRepository.findOne({
      where: { username },
    });
    if (existingUser) {
      throw new BadRequestException('이미 존재하는 사용자입니다.');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.accountRepository.create({
      ...accountData,
      created_at: new Date(),
      is_active: true,
      password: hashedPassword,
    });
    const newProfile = this.profileRepository.create({
      username,
      nickname: profileData.nickname,
      email: profileData.email,
    });
    try {
      const account: Account = await this.accountRepository.save(newUser);
      const profile: Profile = await this.profileRepository.save(newProfile);
      return {
        account,
        profile,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async login(loginData: LoginDto) {
    const { username, password } = loginData;
    const user = await this.accountRepository.findOne({
      where: { username },
    });
    if (!user) {
      return { success: false, message: '사용자를 찾을 수 없습니다' };
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return {
        success: false,
        message: 'username이나 password가 잘못되었습니다.',
      };
    }
    return {
      success: true,
      message: '로그인에 성공했습니다!',
      user,
    };
  }
}
