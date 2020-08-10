import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleConfig } from './config/typeorm.config'
import { UserModule } from './user/user.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmModuleConfig),
    AuthModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
