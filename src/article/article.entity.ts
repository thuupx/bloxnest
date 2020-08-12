import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { User } from 'src/user/user.entity';

@Entity()
export class Article extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(type => User, user => user.articles, { onDelete: "CASCADE" })
  author: User;

  @Column({
    array: true,
  })
  tags: string;

  @Column({
    array: true,
  })
  categories: string;
}