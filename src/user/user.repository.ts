import { Repository, EntityRepository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { genSalt, hash } from 'bcrypt';
import { User } from './user.entity';
import { SignUpDto, SignInDto } from '../shared/dto/auth-credential.dto';
import { ErrorCode } from '../shared/error-code';
import { UserRoles } from '../app.roles';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(credentialsSignUp: SignUpDto): Promise<void> {
    const { password } = credentialsSignUp;
    const user = new User();
    const salt = await genSalt();
    const hashed = await hash(password, salt);
    Object.keys(credentialsSignUp).forEach(key => user[key] = credentialsSignUp[key]);
    user.password = hashed;
    user.salt = salt;
    try {
      await user.save();
    } catch (error) {
      console.log(error);
      if (error.code === ErrorCode.DUPLICATE_KEY) {
        throw new ConflictException('User already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  async validateUserPassword(credentialsSignUp: SignInDto): Promise<User> {
    const { username, password } = credentialsSignUp;
    const user = await this.findOne({ username });
    if (user && (await user.validatePassword(password))) {
      return user;
    } else {
      return null;
    }
  }
}
