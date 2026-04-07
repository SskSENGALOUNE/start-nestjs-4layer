import { Injectable } from "@nestjs/common";
import { IArticleRepository } from "src/domain/article/article.repository";
import { PrismaService } from "../prisma.service";
import { Article } from "src/domain/article/article.entity";

@Injectable()
export class ArticleRepositoryImpl implements IArticleRepository {
    constructor(private readonly prisma: PrismaService) { }
    async create(article: Article): Promise<void> {
        await this.prisma.article.create({
            data: {
                id: article.id,
                title: article.title,
                content: article.content,
                isDraft: article.isDraft,
                category: {
                    connect: { id: article.categoryId }
                }
            }
        })
    }
}