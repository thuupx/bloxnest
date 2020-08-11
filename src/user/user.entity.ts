import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
} from 'typeorm';
import { hash } from 'bcrypt';
import { Exclude } from 'class-transformer';
import { UserRoles } from '../app.roles';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    enum: UserRoles,
    default: UserRoles.USER,
  })
  roles: UserRoles;

  @Column()
  username: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column()
  birth_date: Date;

  @Exclude()
  @Column()
  password: string;

  @Exclude()
  @Column()
  salt: string;

  async validatePassword(password: string): Promise<boolean> {
    const hashed = await hash(password, this.salt);
    return hashed === this.password;
  }
}
