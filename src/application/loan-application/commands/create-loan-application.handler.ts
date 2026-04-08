import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateLoanApplicationCommand } from './create-loan-application.command';
import { LoanApplication } from '../../../domain/loan-application/loan-application.entity';
import type { ILoanApplicationRepository, } from '../../../domain/loan-application/loan-application.repository';
import { LOAN_APPLICATION_REPOSITORY } from '../../../domain/loan-application/loan-application.repository';
@CommandHandler(CreateLoanApplicationCommand)
export class CreateLoanApplicationHandler implements ICommandHandler<CreateLoanApplicationCommand> {
    constructor(
        @Inject(LOAN_APPLICATION_REPOSITORY)
        private readonly repository: ILoanApplicationRepository,
    ) { }

    async execute(command: CreateLoanApplicationCommand): Promise<string> {
        // 1. ตรวจสอบว่า Customer มีอยู่จริงในระบบหรือไม่
        const isCustomerExists = await this.repository.checkCustomerExists(command.customerId);
        if (!isCustomerExists) {
            throw new NotFoundException('ไม่พบข้อมูลลูกค้าในระบบ');
        }

        try {
            // 2. สั่งให้ Domain สร้าง Entity (เช็คกฎ 5 เท่าที่นี่)
            const application = LoanApplication.create(
                command.customerId,
                command.monthlyIncome,
                command.requestedAmount,
                command.purpose
            );

            // 3. บันทึกลงฐานข้อมูล
            await this.repository.save(application);

            // คืนค่า Reference Number กลับไปให้ผู้ใช้
            return application.referenceNo;

        } catch (error) {
            // จับ Error ที่ Throw มาจาก Domain Layer แล้วแปลงเป็น HTTP Error
            throw new BadRequestException(error.message);
        }
    }
}