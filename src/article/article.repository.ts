import { Repository, EntityRepository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Article } from './article.entity';
import { ErrorCode } from '../shared/error-code';
import { CreateArticleDto } from './dto/create-article.dto';
import { User } from 'src/user/user.entity';

@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {
  async createArticle(user: User, article: CreateArticleDto) {
    try {
      const newArticle = new Article();
      Object.keys(article).forEach(k => newArticle[k] = article[k])
      newArticle.author = user;
      await newArticle.save()
      return newArticle;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}