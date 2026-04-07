import { Injectable } from '@nestjs/common';
import { ITransferRepository } from '../../../domain/transfer/transfer.repository';
import { TransferTransaction } from '../../../domain/transfer/transfer.entity';
import { PrismaService } from '../../prisma/prisma.service';
import { TransferTransactionStatus } from '@prisma/client';

@Injectable()
export class TransferRepositoryImpl implements ITransferRepository {
    constructor(private readonly prisma: PrismaService) { }

    async save(transfer: TransferTransaction): Promise<void> {
        // Prisma จะบันทึกข้อมูลลง Table ตามที่เราสั่ง
        await this.prisma.transferTransaction.create({
            data: {
                referenceNo: transfer.referenceNo, // Entity สร้างมาให้แล้ว
                amount: transfer.amount,
                fee: transfer.fee,                 // Entity คำนวณมาให้แล้ว
                status: transfer.status as TransferTransactionStatus,

                // นี่ไงครับ! เราส่งไปแค่ "ID" ของบัญชีเท่านั้น 
                fromAccountId: transfer.fromAccountId,
                toAccountId: transfer.toAccountId,
            },
        });
    }
    async findAccountById(accountId: string) {
        return this.prisma.account.findUnique({
            where: {
                id: accountId
            }
        })
    }

    async updateBalances(fromAccountId: string, toAccountId: string, amount: number) {
        await this.prisma.$transaction([
            this.prisma.account.update({
                where: { id: fromAccountId },
                data: { balance: { decrement: amount } }
            }),
            this.prisma.account.update({
                where: {
                    id:
                        toAccountId
                },
                data: {
                    balance:
                        { increment: amount }
                }
            }),
        ]);
    }
    // ใน ArticleRepositoryImpl (หรือ TransferRepositoryImpl)
    async executeTransfer(transfer: TransferTransaction): Promise<void> {
        await this.prisma.$transaction(async (tx) => {
            // 1. ตัดเงินต้นทาง
            await tx.account.update({
                where: { id: transfer.fromAccountId },
                data: { balance: { decrement: transfer.amount + transfer.fee } }
            });

            // 2. เพิ่มเงินปลายทาง
            await tx.account.update({
                where: { id: transfer.toAccountId },
                data: { balance: { increment: transfer.amount } }
            });

            // 3. บันทึก Log การโอน
            await tx.transferTransaction.create({
                data: {
                    referenceNo: transfer.referenceNo,
                    fromAccountId: transfer.fromAccountId,
                    toAccountId: transfer.toAccountId,
                    amount: transfer.amount,
                    fee: transfer.fee,
                    status: 'SUCCESS'
                }
            });
        });
    }
}