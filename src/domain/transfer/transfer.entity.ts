export type TransferStatus = 'PENDING' | 'SUCCESS' | 'FAILED';

export class TransferTransaction {
    constructor(
        public readonly referenceNo: string,
        public readonly amount: number,
        public readonly fee: number,
        public readonly status: TransferStatus,
        public readonly fromAccountId: string,
        public readonly toAccountId: string,
        public readonly id?: string,
    ) { }

    // รับค่ามาแค่ 3 อย่างจาก User
    static create(fromAccountId: string, toAccountId: string, amount: number): TransferTransaction {
        // 1. เช็คกฎ: ห้ามโอนหาตัวเอง
        if (fromAccountId === toAccountId) {
            throw new Error('ไม่สามารถโอนเงินเข้าบัญชีตัวเองได้');
        }

        // 2. เช็คกฎ: ยอดโอนต้องมากกว่า 0
        if (amount <= 0) {
            throw new Error('ยอดเงินโอนต้องมากกว่า 0 บาท');
        }

        // 3. คำนวณค่าธรรมเนียม (Business Logic)
        const fee = amount > 10000 ? 0 : 15;

        // 4. สร้างเลขอ้างอิงอัตโนมัติ (เช่น TRX-1715301234-9812)
        const timestamp = Date.now();
        const random4Digits = Math.floor(1000 + Math.random() * 9000);
        const referenceNo = `TRX-${timestamp}-${random4Digits}`;

        // ส่งคืน Object ที่ประกอบร่างสมบูรณ์แล้ว
        return new TransferTransaction(
            referenceNo,
            amount,
            fee,
            'PENDING', // เริ่มต้นให้สถานะเป็น PENDING เสมอ
            fromAccountId,
            toAccountId
        );
    }
}
