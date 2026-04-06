import { OrderEntity, OrderItemEntity } from "./order.entity";

export interface CreateOrderData {
    userId: string;
    name: string;
    phone: string;
    address?: string;
    deliveryProvider: string;
    items: Omit<OrderItemEntity, 'id' | 'orderId'>[];
}

export interface IOrderRepository {
    create(data: CreateOrderData): Promise<OrderEntity>;
}
export const ORDER_REPOSITORY = Symbol('OrderRepository')