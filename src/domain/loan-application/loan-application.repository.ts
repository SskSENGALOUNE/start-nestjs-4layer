import { LoanApplication } from './loan-application.entity';

export interface ILoanApplicationRepository {
    // ควรมี Method ตรวจสอบ Customer ก่อนว่ามีจริงไหม
    checkCustomerExists(customerId: string): Promise<boolean>;

    // บันทึก Entity ลงฐานข้อมูล
    save(application: LoanApplication): Promise<void>;

    findAll(status?: string): Promise<any[]>;
}

export const LOAN_APPLICATION_REPOSITORY = Symbol('LOAN_APPLICATION_REPOSITORY');