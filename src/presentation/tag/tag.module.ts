import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaModule } from '../../infrastructure/prisma/prisma.module';
import { TagController } from './tag.controller';
import { CreateTagHandler } from '../../application/tag/commands/create-tag.handler';
import { TAG_REPOSITORY } from '../../domain/tag/tag.repository';
import { GetAllTagsHandler } from 'src/application/tag/commands/get-all-tags.handler';
import { TagRepositoryImpl } from 'src/infrastructure/prisma/repositories/tag.repository';

@Module({
    imports: [CqrsModule, PrismaModule],
    controllers: [TagController],
    providers: [
        CreateTagHandler,
        GetAllTagsHandler,
        {
            provide: TAG_REPOSITORY,
            useClass: TagRepositoryImpl,
        },
    ],
})
export class TagModule { }