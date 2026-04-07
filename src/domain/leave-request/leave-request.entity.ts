// ประกาศ Type สำหรับสถานะในโลกของ Domain
export type LeaveRequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export class LeaveRequest {
    constructor(
        public readonly reason: string,
        public readonly startDate: Date,
        public readonly endDate: Date,
        public readonly status: LeaveRequestStatus, // <--- 1. เปลี่ยนจาก string เป็น LeaveRequestStatus
        public readonly employeeId: string,
        public readonly id?: string,
    ) { }

    static create(reason: string, startDate: Date, endDate: Date, employeeId: string): LeaveRequest {
        if (reason.length < 10) {
            throw new Error('เหตุผลการลาต้องมีความยาวอย่างน้อย 10 ตัวอักษร');
        }

        if (startDate > endDate) {
            throw new Error('วันเริ่มต้นการลา ต้องไม่เกิดหลังวันสิ้นสุดการลา');
        }

        return new LeaveRequest(
            reason,
            startDate,
            endDate,
            'PENDING', // <--- 2. ค่า PENDING ตรงนี้จะถูกมองว่าเป็น type LeaveRequestStatus โดยอัตโนมัติ
            employeeId
        );
    }
}