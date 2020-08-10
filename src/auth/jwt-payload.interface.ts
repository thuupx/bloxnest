import { UserRole } from '../user/user.entity';

export interface JwtPayload {
  username: string;
  role: UserRole;
}
