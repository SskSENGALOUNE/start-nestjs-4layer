export class CreateProductCommand {
    constructor(
        public readonly name: string,
        public readonly costPrice: number,
        public readonly salePrice: number,
        public readonly unit: string,
        public readonly minQuantity: number,
        public readonly categoryId: string,
        public readonly imageUrl?: string,
    ) { }
}