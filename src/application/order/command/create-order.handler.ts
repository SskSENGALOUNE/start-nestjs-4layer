import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateOrderCommand } from "./create-order.command";
import { Inject } from "@nestjs/common";
import type { IOrderRepository } from '../../../domain/order/order.repository';
import { ORDER_REPOSITORY } from '../../../domain/order/order.repository';
import { OrderEntity } from "src/domain/order/order.entity";

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
    constructor(
        @Inject(ORDER_REPOSITORY)
        private readonly orderRepository: IOrderRepository,
    ) { }
    async execute(command: CreateOrderCommand): Promise<OrderEntity> {
        const itemsWithTotal = command.items.map((item) => ({
            ...item,
            total: item.price * item.quantity,
        }));
        return this.orderRepository.create({
            userId: command.userId,
            name: command.name,
            phone: command.phone,
            address: command.address,
            deliveryProvider: command.deliveryProvider,
            items: itemsWithTotal,
        });
    }

}
