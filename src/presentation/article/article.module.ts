import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { ArticleController } from './article.controller';
import { CreateArticleHandler } from '../../application/article/commands/create-article.handler';
import { ARTICLE_REPOSITORY } from '../../domain/article/article.repository';
import { ArticleRepositoryImpl } from '../../infrastructure/prisma/repositories/article.repository.impl';

// รวม Command Handlers ทั้งหมดไว้ใน array เพื่อความสะอาด
const CommandHandlers = [CreateArticleHandler];

@Module({
    imports: [
        CqrsModule, // ต้อง Import เพื่อให้ใช้ CommandBus และ @CommandHandler ได้
    ],
    controllers: [
        ArticleController,
    ],
    providers: [
        PrismaService,
        ...CommandHandlers,
        // การผูก (Bind) Interface เข้ากับ Implementation
        {
            provide: ARTICLE_REPOSITORY,
            useClass: ArticleRepositoryImpl,
        },
    ],
})
export class ArticleModule { }