import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { SignUpDto, SignInDto } from '../shared/dto/auth-credential.dto';
import { FindConditions } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
  ) {
  }
  async findOne(findConditions: FindConditions<User>): Promise<User> {
    return this.userRepository.findOne(findConditions);
  }
  async signUp(credentials: SignUpDto): Promise<void> {
    return this.userRepository.signUp(credentials);
  }
  async validateUserPassword(credentials: SignInDto): Promise<User> {
    return this.userRepository.validateUserPassword(credentials);
  }
}
