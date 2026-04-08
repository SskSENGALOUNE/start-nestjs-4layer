import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaService } from '../../infrastructure/prisma/prisma.service'; // แก้ path ให้ตรง
import { LoanApplicationController } from './loan-application.controller';
import { CreateLoanApplicationHandler } from '../../application/loan-application/commands/create-loan-application.handler';
import { LOAN_APPLICATION_REPOSITORY } from '../../domain/loan-application/loan-application.repository';
import { LoanApplicationRepositoryImpl } from '../../infrastructure/prisma/repositories/loan-application.repository.impl';
import { GetAllLoanApplicationsHandler } from 'src/application/loan-application/queries/get-all-loan-applications.handler';

@Module({
    imports: [CqrsModule],
    controllers: [LoanApplicationController],
    providers: [
        PrismaService,
        CreateLoanApplicationHandler,
        GetAllLoanApplicationsHandler,
        {
            provide: LOAN_APPLICATION_REPOSITORY,
            useClass: LoanApplicationRepositoryImpl,
        },
    ],
})
export class LoanApplicationModule { }