import { Injectable } from '@nestjs/common';
import { ArticleRepository } from './article.repository';
import { CreateArticleDto } from './dto/create-article.dto';
import { Article } from './article.entity';
import { User } from '../user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: ArticleRepository,
  ) {}

  createArticle(user: User, body: CreateArticleDto): Promise<Article> {
    return this.articleRepository.createArticle(user, body);
  }

  findAllArticles(): Promise<Article[]> {
    return this.articleRepository.find({ relations: ['user'] });
  }
}
