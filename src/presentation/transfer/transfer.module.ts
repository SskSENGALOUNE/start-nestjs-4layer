import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TransferController } from './transfer.controller';
import { CreateTransferHandler } from '../../application/transfer/commands/create-transfer.handler';
import { TRANSFER_REPOSITORY } from '../../domain/transfer/transfer.repository';
import { TransferRepositoryImpl } from '../../infrastructure/prisma/repositories/transfer.repository.impl';

// หมายเหตุ: อย่าลืม Import PrismaModule ของคุณเข้ามาด้วยนะครับ
import { PrismaModule } from '../../infrastructure/prisma/prisma.module';

@Module({
    imports: [
        CqrsModule,    // <--- จำเป็นต้องมี เพื่อให้ CommandBus ทำงานได้
        PrismaModule   // <--- นำเข้า Prisma มาให้ RepositoryImpl ใช้งาน
    ],
    controllers: [TransferController], // <--- เปิดประตูรับ Request
    providers: [
        CreateTransferHandler, // <--- ลงทะเบียน Handler (เชฟ)

        // ไฮไลท์สำคัญของ Clean Architecture (Dependency Inversion)
        {
            provide: TRANSFER_REPOSITORY,      // ถ้ามีใครเรียกหา "ป้ายชื่อ" นี้ (Interface)
            useClass: TransferRepositoryImpl,  // ให้เอา "คนทำงานจริง" (Prisma Impl) คนนี้ไปให้
        },
    ],
})
export class TransferModule { }