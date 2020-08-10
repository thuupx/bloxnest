import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
} from 'typeorm';
import { hash } from 'bcrypt';
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  ROOT = 'root',
}
@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  async validatePassword(password: string): Promise<boolean> {
    const hashed = await hash(password, this.salt);
    return hashed === this.password;
  }
}
