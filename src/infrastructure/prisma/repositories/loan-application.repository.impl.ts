import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service'; // อ้างอิงให้ถูก path
import { ILoanApplicationRepository } from '../../../domain/loan-application/loan-application.repository';
import { LoanApplication } from '../../../domain/loan-application/loan-application.entity';
import { LoanStatus } from '@prisma/client';
@Injectable()
export class LoanApplicationRepositoryImpl implements ILoanApplicationRepository {
    constructor(private readonly prisma: PrismaService) { }

    async checkCustomerExists(customerId: string): Promise<boolean> {
        const count = await this.prisma.customer.count({
            where: { id: customerId },
        });
        return count > 0;
    }

    async save(application: LoanApplication): Promise<void> {
        await this.prisma.loanApplication.create({
            data: {
                id: application.id,
                referenceNo: application.referenceNo,
                customerId: application.customerId,
                monthlyIncome: application.monthlyIncome,
                requestedAmount: application.requestedAmount,
                purpose: application.purpose,
                status: application.status as LoanStatus,
            },
        });
    }
    async findAll(status?: string): Promise<any[]> {
        return await this.prisma.loanApplication.findMany({
            where: status ? { status: status as LoanStatus } : undefined, // ถ้ามี status ให้กรอง ถ้าไม่มีให้ดึงทั้งหมด
            orderBy: { createdAt: 'desc' }, // เรียงจากใหม่ไปเก่า
            include: {
                customer: {
                    select: { fullName: true, citizenId: true } // จอยข้อมูลลูกค้ามาให้ดูด้วยนิดหน่อย
                }
            }
        });
    }
}