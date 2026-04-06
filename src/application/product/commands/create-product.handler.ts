import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateProductCommand } from './create-product.command';
import type { IProductRepository } from '../../../domain/product/product.repository';
import { PRODUCT_REPOSITORY } from '../../../domain/product/product.repository';
import type { ICategoryRepository } from '../../../domain/category/category.repository';
import { CATEGORY_REPOSITORY } from '../../../domain/category/category.repository';
import { CategoryNotFoundException } from '../../../domain/category/category.exceptions';
import { ProductEntity } from '../../../domain/product/product.entity';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler implements ICommandHandler<CreateProductCommand> {
    constructor(
        @Inject(PRODUCT_REPOSITORY)
        private readonly productRepository: IProductRepository,
        @Inject(CATEGORY_REPOSITORY)
        private readonly categoryRepository: ICategoryRepository,
    ) { }

    async execute(command: CreateProductCommand): Promise<ProductEntity> {
        // ✅ Step 1: Check if category exists
        const category = await this.categoryRepository.findById(command.categoryId);
        if (!category) {
            throw new CategoryNotFoundException(command.categoryId);
        }

        // ✅ Step 2: Create product
        return this.productRepository.create({
            name: command.name,
            costPrice: command.costPrice,
            salePrice: command.salePrice,
            unit: command.unit,
            minQuantity: command.minQuantity,
            categoryId: command.categoryId,
            imageUrl: command.imageUrl,
        });
    }
}