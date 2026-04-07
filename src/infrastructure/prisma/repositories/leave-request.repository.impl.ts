import { Injectable } from '@nestjs/common';
import { ILeaveRequestRepository } from '../../../domain/leave-request/leave-request.repository';
import { LeaveRequest } from '../../../domain/leave-request/leave-request.entity';
// หมายเหตุ: อย่าลืมเปลี่ยน path ของ PrismaService ตามโปรเจกต์ของคุณ
import { PrismaService } from '../../prisma/prisma.service';
import { LeaveStatus } from '@prisma/client';


@Injectable()
export class LeaveRequestRepositoryImpl implements ILeaveRequestRepository {
    constructor(private readonly prisma: PrismaService) { }

    async create(leaveRequest: LeaveRequest): Promise<void> {
        await this.prisma.leaveRequest.create({
            data: {
                reason: leaveRequest.reason,
                startDate: leaveRequest.startDate,
                endDate: leaveRequest.endDate,
                status: leaveRequest.status as LeaveStatus,
                employeeId: leaveRequest.employeeId,
            },
        });
    }

    async findByEmployeeAndDateRange(employeeId: string, startDate: Date, endDate: Date): Promise<LeaveRequest | null> {
        const record = await this.prisma.leaveRequest.findFirst({
            where: {
                employeeId,
                AND: [
                    { startDate: { lte: endDate } },
                    { endDate: { gte: startDate } },
                ],
            },
        });

        if (!record) return null;

        return new LeaveRequest(record.reason, record.startDate, record.endDate, record.status as any, record.employeeId, record.id);
    }
}