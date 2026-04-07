import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateArticleCommand } from "./create-article.command";
import { Inject } from "@nestjs/common";
import { ARTICLE_REPOSITORY } from "src/domain/article/article.repository";
import type { IArticleRepository } from "src/domain/article/article.repository";
import { Article } from "src/domain/article/article.entity";
@CommandHandler(CreateArticleCommand)
export class CreateArticleHandler implements ICommandHandler<CreateArticleCommand> {
    constructor(
        // Inject Interface โดยใช้ Symbol Token ที่เราสร้างไว้
        @Inject(ARTICLE_REPOSITORY)
        private readonly articleRepository: IArticleRepository
    ) { }
    async execute(command: CreateArticleCommand): Promise<void> {

        const { title, content, categoryId } = command
        const article = Article.create(title, content, categoryId)
        await this.articleRepository.create(article);
    }


}