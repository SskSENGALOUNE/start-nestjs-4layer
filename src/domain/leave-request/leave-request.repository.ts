import { LeaveRequest } from './leave-request.entity';

// สร้าง Symbol เพื่อใช้ทำ Dependency Injection ใน NestJS
export const LEAVE_REQUEST_REPOSITORY = Symbol('LEAVE_REQUEST_REPOSITORY');

export interface ILeaveRequestRepository {
    create(leaveRequest: LeaveRequest): Promise<void>;
    findByEmployeeAndDateRange(employeeId: string, startDate: Date, endDate: Date): Promise<LeaveRequest | null>;
}