import { CategoryEntity } from './category.entity';

export interface ICategoryRepository {
    create(name: string): Promise<CategoryEntity>;
    findAll(): Promise<CategoryEntity[]>;
    findById(id: string): Promise<CategoryEntity | null>
}

export const CATEGORY_REPOSITORY = Symbol('CategoryRepository');
