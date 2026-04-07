export class CreateLeaveRequestCommand {
    constructor(
        public readonly employeeId: string,
        public readonly reason: string,
        public readonly startDate: Date,
        public readonly endDate: Date,
    ) { }
}