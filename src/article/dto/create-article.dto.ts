import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateArticleDto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsString()
  @ApiProperty()
  content: string;

  @ApiProperty()
  tags: string[];

  @ApiProperty()
  categories: string[];
}