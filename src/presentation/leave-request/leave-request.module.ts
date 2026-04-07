import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { LeaveRequestController } from './leave-request.controller';
import { CreateLeaveRequestHandler } from '../../application/leave-request/commands/create-leave-request.handler';
import { LEAVE_REQUEST_REPOSITORY } from '../../domain/leave-request/leave-request.repository';
import { LeaveRequestRepositoryImpl } from '../../infrastructure/prisma/repositories/leave-request.repository.impl';
// หมายเหตุ: อย่าลืม Import Module ของ Prisma ด้วย
import { PrismaModule } from '../../infrastructure/prisma/prisma.module';

const CommandHandlers = [CreateLeaveRequestHandler];

@Module({
    imports: [CqrsModule, PrismaModule],
    controllers: [LeaveRequestController],
    providers: [
        ...CommandHandlers,
        {
            provide: LEAVE_REQUEST_REPOSITORY,
            useClass: LeaveRequestRepositoryImpl, // ผูก Interface เข้ากับตัว Implementation
        },
    ],
})
export class LeaveRequestModule { }