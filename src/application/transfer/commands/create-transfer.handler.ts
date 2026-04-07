import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, Inject, NotFoundException } from '@nestjs/common';
import { CreateTransferCommand } from './create-transfer.command';
import { TransferTransaction } from '../../../domain/transfer/transfer.entity';
import {
    TRANSFER_REPOSITORY
} from '../../../domain/transfer/transfer.repository';
import type { ITransferRepository } from '../../../domain/transfer/transfer.repository';
@CommandHandler(CreateTransferCommand)
export class CreateTransferHandler implements ICommandHandler<CreateTransferCommand> {
    constructor(
        @Inject(TRANSFER_REPOSITORY)
        private readonly repository: ITransferRepository,
    ) { }

    async execute(command: CreateTransferCommand): Promise<void> {
        const { fromAccountId, toAccountId, amount } = command;

        // 1. ตรวจสอบบัญชีต้นทาง (มีจริงไหม? เงินพอไหม?)
        const fromAccount = await this.repository.findAccountById(fromAccountId);
        if (!fromAccount) {
            throw new NotFoundException('ไม่พบบัญชีต้นทาง');
        }

        // 2. เรียก Domain Logic เพื่อสร้าง Object (เช็คกฎ: ห้ามโอนหาตัวเอง, ยอด > 0, คำนวณ Fee)
        const transfer = TransferTransaction.create(fromAccountId, toAccountId, amount);

        // 3. ตรวจสอบยอดเงิน (ต้องพอกับ ยอดโอน + ค่าธรรมเนียม)
        const totalAmount = transfer.amount + transfer.fee;
        if (fromAccount.balance < totalAmount) {
            throw new BadRequestException('ยอดเงินคงเหลือไม่เพียงพอสำหรับยอดโอนและค่าธรรมเนียม');
        }

        // 4. ตรวจสอบบัญชีปลายทาง
        const toAccount = await this.repository.findAccountById(toAccountId);
        if (!toAccount) {
            throw new NotFoundException('ไม่พบบัญชีปลายทาง');
        }

        // 5. บันทึกทุกอย่างในครั้งเดียว (Atomic Operation)
        // แนะนำให้รวม save log และ update balances ไว้ใน method เดียวที่ใช้ Database Transaction
        await this.repository.executeTransfer(transfer);
    }
}