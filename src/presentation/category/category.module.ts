import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CategoryController } from './category.controller';
import { CreateCategoryHandler } from '../../application/category/commands/create-category.handler';
import { GetAllCategoriesHandler } from '../../application/category/queries/get-all-categories.handler';
import { CategoryRepositoryImpl } from '../../infrastructure/prisma/repositories/category.repository.impl';
import { CATEGORY_REPOSITORY } from '../../domain/category/category.repository';
import { PrismaModule } from '../../infrastructure/prisma/prisma.module';

@Module({
    imports: [CqrsModule, PrismaModule],
    controllers: [CategoryController],
    providers: [
        CreateCategoryHandler,
        GetAllCategoriesHandler,
        {
            provide: CATEGORY_REPOSITORY,
            useClass: CategoryRepositoryImpl,
        },
    ],
    exports: [
        // ❌ เดิม: CategoryRepositoryImpl
        CATEGORY_REPOSITORY // ✅ เปลี่ยนเป็นตัวนี้แทนครับ
    ],
})
export class CategoryModule { }