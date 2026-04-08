export type LoanStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export class LoanApplication {
    constructor(
        public readonly id: string,
        public readonly referenceNo: string,
        public readonly customerId: string,
        public readonly monthlyIncome: number,
        public readonly requestedAmount: number,
        public readonly purpose: string,
        public status: LoanStatus,
    ) { }

    // Factory Method สำหรับตรวจสอบ Business Logic เบื้องต้น
    static create(
        customerId: string,
        monthlyIncome: number,
        requestedAmount: number,
        purpose: string,
    ): LoanApplication {
        // Business Rule 1: รายได้และยอดขอสินเชื่อต้องมากกว่า 0
        if (monthlyIncome <= 0 || requestedAmount <= 0) {
            throw new Error('รายได้และยอดขอสินเชื่อต้องมากกว่า 0');
        }

        // Business Rule 2: ยอดขอสินเชื่อห้ามเกิน 5 เท่าของรายได้ต่อเดือน (DSR Rule เบื้องต้น)
        const maxAllowedAmount = monthlyIncome * 5;
        if (requestedAmount > maxAllowedAmount) {
            throw new Error(`ยอดขอสินเชื่อเกินกำหนด (สูงสุดไม่เกิน ${maxAllowedAmount} บาท)`);
        }

        // Business Rule 3: สร้าง Reference Number อัตโนมัติ (เช่น LOAN-1610000000)
        const referenceNo = `LOAN-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        return new LoanApplication(
            crypto.randomUUID(), // หรือใช้ Library UUID
            referenceNo,
            customerId,
            monthlyIncome,
            requestedAmount,
            purpose,
            'PENDING', // คำขอใหม่ สถานะเป็น PENDING เสมอ
        );
    }
}