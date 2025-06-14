import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import AccountController from './account/account.controller';
import AccountService from './account/account.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController, AccountController],
  providers: [AppService, AccountService],
})
export class AppModule {}
