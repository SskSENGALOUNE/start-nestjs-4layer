import { IsUUID, IsNumber, IsString, Min, IsNotEmpty } from 'class-validator';

export class CreateLoanApplicationDto {
    @IsUUID(4, { message: 'Customer ID ไม่ถูกต้อง' })
    @IsNotEmpty()
    readonly customerId: string;

    @IsNumber()
    @Min(10000, { message: 'รายได้ขั้นต่ำต้อง 10,000 บาทขึ้นไป' })
    readonly monthlyIncome: number;

    @IsNumber()
    @Min(5000, { message: 'ยอดขอสินเชื่อขั้นต่ำ 5,000 บาท' })
    readonly requestedAmount: number;

    @IsString()
    @IsNotEmpty()
    readonly purpose: string;
}