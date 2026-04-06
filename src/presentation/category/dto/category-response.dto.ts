import { CategoryEntity } from '../../../domain/category/category.entity';

export class CategoryResponseDto {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;

    static fromEntity(entity: CategoryEntity): CategoryResponseDto {
        const dto = new CategoryResponseDto();
        dto.id = entity.id;
        dto.name = entity.name;
        dto.createdAt = entity.createdAt;
        dto.updatedAt = entity.updatedAt;
        return dto;
    }
}     