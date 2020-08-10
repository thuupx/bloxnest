import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto, SignInDto, SignedInData } from '../shared/dto/auth-credential.dto';
import { JwtPayload } from './jwt-payload.interface';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }
  async signUp(credentialsSignUp: SignUpDto): Promise<void> {
    return this.userService.signUp(credentialsSignUp);
  }
  async signIn(credentials: SignInDto): Promise<SignedInData> {
    const user = await this.userService.validateUserPassword(credentials);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const { username, role } = user;
    const payload: JwtPayload = { username, role };
    const access_token = await this.jwtService.signAsync(payload);
    const signed: SignedInData = { user, access_token };
    return signed;
  }
}
