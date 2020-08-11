import { UserRoles } from '../app.roles';

export interface JwtPayload {
  username: string;
  roles: UserRoles;
}
