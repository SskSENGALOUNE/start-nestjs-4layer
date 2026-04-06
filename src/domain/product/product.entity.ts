export class ProductEntity {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly costPrice: number,
        public readonly salePrice: number,
        public readonly unit: string,
        public readonly minQuantity: number,
        public readonly imageUrl: string | null,
        public readonly categoryId: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
        public readonly stock: number = 0,
    ) { }
}