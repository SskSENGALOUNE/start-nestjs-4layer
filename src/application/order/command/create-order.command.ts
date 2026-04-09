import { DeliveryProvider } from "@prisma/client";

export class CreateOrderCommand {
    constructor(
        public readonly userId: string,
        public readonly name: string,
        public readonly phone: string,
        public readonly address: string | undefined,
        public readonly deliveryProvider: DeliveryProvider,
        public readonly items: {
            name: string;
            quantity: number;
            price: number;
        }[],
    ) { }
}
