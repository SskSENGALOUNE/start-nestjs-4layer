import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderResponseDto } from './dto/order-response.dto';
import { OrderEntity } from '../../domain/order/order.entity';
import { CreateOrderCommand } from '../../application/order/command/create-order.command';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@ApiTags('orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrderController {
    constructor(private readonly commandBus: CommandBus) { }

    @Post()
    async create(@Body() dto: CreateOrderDto, @Request() req: any): Promise<OrderResponseDto> {
        const userId = req.user.id;
        const command = new CreateOrderCommand(
            userId,
            dto.name,
            dto.phone,
            dto.address,
            dto.deliveryProvider,
            dto.items,
        );
        const order = await this.commandBus.execute<CreateOrderCommand, OrderEntity>(command);
        return OrderResponseDto.fromEntity(order);
    }
}                                                                                                             