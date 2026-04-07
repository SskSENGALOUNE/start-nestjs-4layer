import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, ConflictException } from '@nestjs/common';
import { CreateLeaveRequestCommand } from './create-leave-request.command';
import { LeaveRequest } from '../../../domain/leave-request/leave-request.entity';
import { LEAVE_REQUEST_REPOSITORY } from '../../../domain/leave-request/leave-request.repository';
import type { ILeaveRequestRepository } from '../../../domain/leave-request/leave-request.repository';

@CommandHandler(CreateLeaveRequestCommand)
export class CreateLeaveRequestHandler implements ICommandHandler<CreateLeaveRequestCommand> {
    constructor(
        @Inject(LEAVE_REQUEST_REPOSITORY)
        private readonly repository: ILeaveRequestRepository,
    ) { }

    async execute(command: CreateLeaveRequestCommand): Promise<void> {
        const { reason, startDate, endDate, employeeId } = command;

        const existing = await this.repository.findByEmployeeAndDateRange(employeeId, startDate, endDate);
        if (existing) {
            throw new ConflictException('มีใบลาที่ทับซ้อนกันอยู่แล้วในช่วงเวลานี้');
        }

        const leaveRequest = LeaveRequest.create(reason, startDate, endDate, employeeId);
        await this.repository.create(leaveRequest);
    }
}