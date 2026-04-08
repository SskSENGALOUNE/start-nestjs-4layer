import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetAllLoanApplicationsQuery } from './get-all-loan-applications.query';
import { type ILoanApplicationRepository, LOAN_APPLICATION_REPOSITORY } from '../../../domain/loan-application/loan-application.repository';

@QueryHandler(GetAllLoanApplicationsQuery)
export class GetAllLoanApplicationsHandler implements IQueryHandler<GetAllLoanApplicationsQuery> {
    constructor(
        @Inject(LOAN_APPLICATION_REPOSITORY)
        private readonly repository: ILoanApplicationRepository,
    ) { }

    async execute(query: GetAllLoanApplicationsQuery): Promise<any[]> {
        // โยน status ไปให้ Repository จัดการ
        return await this.repository.findAll(query.status);
    }
}