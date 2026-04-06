import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductController } from './product.controller';
import { CreateProductHandler } from '../../application/product/commands/create-product.handler';
import { GetAllProductsHandler } from '../../application/product/queries/get-all-products.handler';
import { ProductRepositoryImpl } from '../../infrastructure/prisma/repositories/product.repository.impl';
import { PRODUCT_REPOSITORY } from '../../domain/product/product.repository';
import { PrismaModule } from '../../infrastructure/prisma/prisma.module';
import { CategoryModule } from '../category/category.module';

@Module({
    imports: [CqrsModule, PrismaModule, CategoryModule],
    controllers: [ProductController],
    providers: [
        CreateProductHandler,
        GetAllProductsHandler,
        {
            provide: PRODUCT_REPOSITORY,
            useClass: ProductRepositoryImpl,
        },
    ],
})
export class ProductModule { }
