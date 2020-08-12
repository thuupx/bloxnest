import {
  Controller,
  Post,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, SignInDto } from '../shared/dto/auth-credential.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/register')
  async signUp(
    @Body(ValidationPipe) credentialsSignUp: SignUpDto,
  ): Promise<void> {
    return this.authService.signUp(credentialsSignUp);
  }

  @Post('/login')
  async signIn(
    @Body(ValidationPipe) credentials: SignInDto,
  ): Promise<{ access_token: string }> {
    return this.authService.signIn(credentials);
  }
}
