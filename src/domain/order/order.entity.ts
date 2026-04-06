export class OrderItemEntity {
    constructor(
        public readonly id: string,
        public readonly orderId: string,
        public readonly name: string,
        public readonly quantity: number,
        public readonly price: number,
        public readonly total: number,

    ) { }
}
export class OrderEntity {
    constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly status: string,
        public readonly total: number,
        public readonly name: string,
        public readonly phone: string,
        public readonly address: string | null,
        public readonly createdByName: string,
        public readonly deliveryStatus: string,
        public readonly deliveryProvider: string,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
        public readonly items: OrderItemEntity[] = [],
    ) { }
}