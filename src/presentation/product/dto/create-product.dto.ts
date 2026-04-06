import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty({ example: 'iPhone 15' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 25000 })
    @IsNumber()
    @Min(0)
    costPrice: number;

    @ApiProperty({ example: 35000 })
    @IsNumber()
    @Min(0)
    salePrice: number;

    @ApiProperty({ example: 'ອັນ' })
    @IsString()
    @IsNotEmpty()
    unit: string;

    @ApiProperty({ example: 5 })
    @IsNumber()
    @Min(0)
    minQuantity: number;

    @ApiProperty({ example: 'uuid-of-category' })
    @IsUUID()
    @IsNotEmpty()
    categoryId: string;

    @ApiProperty({ example: 'https://example.com/image.jpg', required: false })
    @IsString()
    @IsOptional()
    imageUrl?: string;
}
