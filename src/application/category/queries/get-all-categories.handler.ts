
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetAllCategoriesQuery } from './get-all-categories.query';
import type { ICategoryRepository } from '../../../domain/category/category.repository';
import { CATEGORY_REPOSITORY } from '../../../domain/category/category.repository';
import { CategoryEntity } from '../../../domain/category/category.entity';

@QueryHandler(GetAllCategoriesQuery)
export class GetAllCategoriesHandler implements IQueryHandler<GetAllCategoriesQuery> {
    constructor(
        @Inject(CATEGORY_REPOSITORY)
        private readonly categoryRepository: ICategoryRepository,
    ) { }

    async execute(): Promise<CategoryEntity[]> {
        return this.categoryRepository.findAll();
    }
}
