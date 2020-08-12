import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleConfig } from './config/typeorm.config'
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmModuleConfig),
    AuthModule,
    UserModule,
    ArticleModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
