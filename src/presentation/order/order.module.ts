import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { PrismaModule } from "src/infrastructure/prisma/prisma.module";
import { OrderController } from "./order.controller";
import { CreateOrderHandler } from "src/application/order/command/create-order.handler";
import { ORDER_REPOSITORY } from "src/domain/order/order.repository";
import { OrderRepositoryImpl } from "src/infrastructure/prisma/repositories/order.repository.impl";

@Module({
    imports: [CqrsModule, PrismaModule],
    controllers: [OrderController],
    providers: [
        CreateOrderHandler,
        {
            provide: ORDER_REPOSITORY,
            useClass: OrderRepositoryImpl,
        }
    ]
})
export class OrderModule { }