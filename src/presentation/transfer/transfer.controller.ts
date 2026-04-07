import { Controller, Post, Body } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { CreateTransferCommand } from '../../application/transfer/commands/create-transfer.command';

@Controller('transfers')
export class TransferController {
    constructor(private readonly commandBus: CommandBus) { }

    @Post()
    async create(@Body() dto: CreateTransferDto) {
        const command = new CreateTransferCommand(
            dto.fromAccountId,
            dto.toAccountId,
            dto.amount
        );

        await this.commandBus.execute(command);

        return {
            statusCode: 201,
            message: 'โอนเงินสำเร็จ (สถานะรอดำเนินการ)'
        };
    }
}