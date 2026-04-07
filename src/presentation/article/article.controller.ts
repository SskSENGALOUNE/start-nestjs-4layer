import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateArticleDto } from './dto/create-article.dto';
import { CreateArticleCommand } from '../../application/article/commands/create-article.command';

@Controller('articles')
export class ArticleController {
    constructor(
        private readonly commandBus: CommandBus
    ) { }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true }))
    async create(@Body() dto: CreateArticleDto) {
        const command = new CreateArticleCommand(
            dto.title,
            dto.content,
            dto.categoryId
        );
        await this.commandBus.execute(command);
        return {
            message: 'Article creation initiated successfully',
            status: 'success'
        };
    }
}