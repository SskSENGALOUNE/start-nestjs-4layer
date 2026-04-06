import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import type { IOrderRepository, CreateOrderData } from "../../../domain/order/order.repository";
import { OrderEntity, OrderItemEntity } from "../../../domain/order/order.entity";

@Injectable()
export class OrderRepositoryImpl implements IOrderRepository {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    async create(data: CreateOrderData): Promise<OrderEntity> {
        const total = data.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const user = await this.prisma.user.findUnique({ where: { id: data.userId } });
        const result = await this.prisma.order.create({
            data: {
                userId: data.userId,
                total,
                name: data.name,
                phone: data.phone,
                address: data.address,
                deliveryProvider: data.deliveryProvider as any,
                createdByName: user?.username ?? '',
                items: {
                    create: data.items.map((item) => ({
                        name: item.name,
                        quantity: item.quantity,
                        price: item.price,
                        total: item.price * item.quantity,
                    })),
                },
            },
            include: { items: true },
        });

        return new OrderEntity(
            result.id,
            result.userId,
            result.status,
            result.total,
            result.name,
            result.phone,
            result.address,
            result.createdByName,
            result.deliveryStatus,
            result.deliveryProvider,
            result.createdAt,
            result.updatedAt,
            result.items.map((item) => new OrderItemEntity(
                item.id, item.orderId, item.name, item.quantity, item.price, item.total,
            )),
        );
    }
}