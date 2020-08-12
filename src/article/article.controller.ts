import { Controller, Body, Post, ValidationPipe, Get } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { ApiTags } from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { Article } from './article.entity';
import { GetUser } from '../common/get-user.decorator';
import { User } from '../user/user.entity';

@ApiTags('Article')
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Post('/')
  async createArticle(
    @GetUser() user: User,
    @Body(ValidationPipe) body: CreateArticleDto,
  ): Promise<Article> {
    console.log('ArticleService -> postArticle -> body', body);
    return this.articleService.createArticle(user, body);
  }
  @Get('/')
  getAllArticles(): Promise<Article[]> {
    return this.articleService.findAllArticles();
  }
}
