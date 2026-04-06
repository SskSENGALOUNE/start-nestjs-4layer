import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetAllProductsQuery } from './get-all-products.query';
import type { IProductRepository } from '../../../domain/product/product.repository';
import { PRODUCT_REPOSITORY } from '../../../domain/product/product.repository';
import { ProductEntity } from '../../../domain/product/product.entity';

@QueryHandler(GetAllProductsQuery)
export class GetAllProductsHandler implements IQueryHandler<GetAllProductsQuery> {
    constructor(
        @Inject(PRODUCT_REPOSITORY)
        private readonly productRepository: IProductRepository,
    ) { }

    async execute(): Promise<ProductEntity[]> {
        return this.productRepository.findAll();
    }
}