import { IsUUID, IsNumber, IsPositive, IsNotEmpty } from 'class-validator';

export class CreateTransferDto {
    @IsUUID()
    @IsNotEmpty()
    fromAccountId: string;

    @IsUUID()
    @IsNotEmpty()
    toAccountId: string;

    @IsNumber({ maxDecimalPlaces: 2 }) // บังคับทศนิยมไม่เกิน 2 ตำแหน่ง
    @IsPositive() // ต้องมากกว่า 0
    amount: number;
}