import { ProductEntity } from './product.entity';

export interface CreateProductData {
    name: string;
    costPrice: number;
    salePrice: number;
    unit: string;
    minQuantity: number;
    imageUrl?: string;
    categoryId: string;
}

export interface IProductRepository {
    create(data: CreateProductData): Promise<ProductEntity>;
    findAll(): Promise<ProductEntity[]>;
}

export const PRODUCT_REPOSITORY = Symbol('ProductRepository');