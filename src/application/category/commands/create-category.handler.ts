
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateCategoryCommand } from './create-category.command';
import type { ICategoryRepository } from '../../../domain/category/category.repository';
import { CATEGORY_REPOSITORY } from '../../../domain/category/category.repository';
import { CategoryEntity } from '../../../domain/category/category.entity';

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryHandler implements ICommandHandler<CreateCategoryCommand> {
    constructor(
        @Inject(CATEGORY_REPOSITORY)
        private readonly categoryRepository: ICategoryRepository,
    ) { }

    async execute(command: CreateCategoryCommand): Promise<CategoryEntity> {
        return this.categoryRepository.create(command.name);
    }
}   