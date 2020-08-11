import { RolesBuilder } from 'nest-access-control';
export enum UserRoles {
  ROOT = 'root',
  ADMIN = 'admin',
  ADVANCED = 'advanced',
  USER = 'user'

}
export const roles: RolesBuilder = new RolesBuilder();
roles
  .grant(UserRoles.USER)
  .createOwn('video')
  .deleteOwn('video')
  .readAny('video')
  .grant(UserRoles.ADVANCED)
  .extend(UserRoles.USER)
  .updateAny('video', ['title'])
  .deleteAny('video')
  .grant(UserRoles.ADMIN)
  .extend(UserRoles.ADVANCED)
  .grant(UserRoles.ROOT)
  .extend(UserRoles.ADMIN);