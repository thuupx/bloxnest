import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Get('/')
    async profile(username: string): Promise<User> {
        return this.userService.findOne({ username })
    }
}
