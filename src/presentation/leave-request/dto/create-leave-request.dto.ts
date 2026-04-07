import { IsString, MinLength, IsUUID, IsDateString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // <-- Import เพิ่มตรงนี้

export class CreateLeaveRequestDto {
    @ApiProperty({
        description: 'รหัสพนักงาน (UUID)',
        example: '123e4567-e89b-12d3-a456-426614174000'
    })
    @IsUUID()
    @IsNotEmpty()
    employeeId: string;

    @ApiProperty({
        description: 'เหตุผลการลา (ต้องมีความยาวอย่างน้อย 10 ตัวอักษร)',
        example: 'ป่วยเป็นไข้หวัดใหญ่ ต้องพักผ่อนตามแพทย์สั่ง'
    })
    @IsString()
    @MinLength(10, { message: 'เหตุผลควรมีอย่างน้อย 10 ตัวอักษร' })
    reason: string;

    @ApiProperty({
        description: 'วันที่เริ่มต้นการลา (ISO 8601 format)',
        example: '2024-06-10T00:00:00.000Z'
    })
    @IsDateString()
    startDate: string;

    @ApiProperty({
        description: 'วันที่สิ้นสุดการลา (ISO 8601 format)',
        example: '2024-06-12T00:00:00.000Z'
    })
    @IsDateString()
    endDate: string;
}