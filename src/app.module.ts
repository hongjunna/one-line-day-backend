import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import AccountController from './account/account.controller';
import AccountService from './account/account.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account/entity/account.entity';
import { Profile } from './account/entity/profile.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false, // 프로덕션 서버 배포 전 false 변경 필요
    }),
    TypeOrmModule.forFeature([Account, Profile]),
  ],
  controllers: [AppController, AccountController],
  providers: [AppService, AccountService],
})
export class AppModule {}
