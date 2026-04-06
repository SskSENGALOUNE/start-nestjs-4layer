import { ApiProperty } from '@nestjs/swagger';
import type { ProductEntity } from '../../../domain/product/product.entity';

export class ProductResponseDto {
    @ApiProperty() id: string;
    @ApiProperty() name: string;
    @ApiProperty() costPrice: number;
    @ApiProperty() salePrice: number;
    @ApiProperty() unit: string;
    @ApiProperty() minQuantity: number;
    @ApiProperty({ nullable: true }) imageUrl: string | null;
    @ApiProperty() categoryId: string;
    @ApiProperty() stock: number;
    @ApiProperty() createdAt: Date;
    @ApiProperty() updatedAt: Date;

    static fromEntity(entity: ProductEntity): ProductResponseDto {
        const dto = new ProductResponseDto();
        dto.id = entity.id;
        dto.name = entity.name;
        dto.costPrice = entity.costPrice;
        dto.salePrice = entity.salePrice;
        dto.unit = entity.unit;
        dto.minQuantity = entity.minQuantity;
        dto.imageUrl = entity.imageUrl;
        dto.categoryId = entity.categoryId;
        dto.stock = entity.stock;
        dto.createdAt = entity.createdAt;
        dto.updatedAt = entity.updatedAt;
        return dto;
    }
}
