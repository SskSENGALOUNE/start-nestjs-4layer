
import { OrderEntity, OrderItemEntity } from '../../../domain/order/order.entity';

export class OrderItemResponseDto {
    id: string;
    name: string;
    quantity: number;
    price: number;

    static fromEntity(entity: OrderItemEntity): OrderItemResponseDto {
        const dto = new OrderItemResponseDto();
        dto.id = entity.id;
        dto.name = entity.name;
        dto.quantity = entity.quantity;
        dto.price = entity.price;
        return dto;
    }
}

export class OrderResponseDto {
    id: string;
    userId: string;
    status: string;
    total: number;
    createdAt: Date;
    updatedAt: Date;
    items: OrderItemResponseDto[];

    static fromEntity(entity: OrderEntity): OrderResponseDto {
        const dto = new OrderResponseDto();
        dto.id = entity.id;
        dto.userId = entity.userId;
        dto.status = entity.status;
        dto.total = entity.total;
        dto.createdAt = entity.createdAt;
        dto.updatedAt = entity.updatedAt;
        dto.items = entity.items.map(OrderItemResponseDto.fromEntity);
        return dto;
    }
}

