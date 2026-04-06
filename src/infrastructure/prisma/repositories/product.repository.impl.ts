import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import type { IProductRepository, CreateProductData } from '../../../domain/product/product.repository';
import { ProductEntity } from '../../../domain/product/product.entity';

@Injectable()
export class ProductRepositoryImpl implements IProductRepository {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateProductData): Promise<ProductEntity> {
        const result = await this.prisma.product.create({
            data: {
                name: data.name,
                costPrice: data.costPrice,
                salePrice: data.salePrice,
                unit: data.unit,
                minQuantity: data.minQuantity,
                imageUrl: data.imageUrl,
                categoryId: data.categoryId,
                inventory: {
                    create: { quantity: 0, productName: data.name },
                },
            },
            include: { inventory: true },
        });

        return new ProductEntity(
            result.id,
            result.name,
            result.costPrice,
            result.salePrice,
            result.unit,
            result.minQuantity,
            result.imageUrl,
            result.categoryId,
            result.createdAt,
            result.updatedAt,
            result.inventory?.quantity ?? 0,
        );
    }

    async findAll(): Promise<ProductEntity[]> {
        const results = await this.prisma.product.findMany({
            include: { inventory: true },
        });

        return results.map((r) => new ProductEntity(
            r.id, r.name, r.costPrice, r.salePrice,
            r.unit, r.minQuantity, r.imageUrl, r.categoryId,
            r.createdAt, r.updatedAt,
            r.inventory?.quantity ?? 0,
        ));
    }
}     