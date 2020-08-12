import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { GetUser } from 'src/common/get-user.decorator';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('User')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @Get('/profile')
  async profile(@GetUser() user: User): Promise<User> {
    console.log("UserController -> user", user)
    return user
  }
}
