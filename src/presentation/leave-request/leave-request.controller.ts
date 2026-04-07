import { Controller, Post, Body } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'; // <-- Import เพิ่มตรงนี้
import { CreateLeaveRequestDto } from './dto/create-leave-request.dto';
import { CreateLeaveRequestCommand } from '../../application/leave-request/commands/create-leave-request.command';

@ApiTags('Leave Requests') // <-- 1. จัดหมวดหมู่ในหน้า Swagger UI
@Controller('leave-requests')
export class LeaveRequestController {
    constructor(private readonly commandBus: CommandBus) { }

    @Post()
    @ApiOperation({
        summary: 'สร้างใบลาใหม่',
        description: 'API สำหรับส่งคำขอลาหยุดของพนักงาน'
    }) // <-- 2. คำอธิบายว่า API นี้ทำอะไร
    @ApiResponse({
        status: 201,
        description: 'สร้างใบลาสำเร็จ'
    }) // <-- 3. อธิบาย Response กรณีสำเร็จ
    @ApiResponse({
        status: 400,
        description: 'ข้อมูลไม่ถูกต้อง (Bad Request) เช่น วันที่ไม่ถูกต้อง หรือ ข้อมูลไม่ครบ'
    }) // <-- 4. อธิบาย Response กรณี Error
    async create(@Body() dto: CreateLeaveRequestDto) {
        // แปลง string date จาก DTO ให้เป็น Date object ก่อนส่งเข้า Command
        const command = new CreateLeaveRequestCommand(
            dto.employeeId,
            dto.reason,
            new Date(dto.startDate),
            new Date(dto.endDate)
        );

        await this.commandBus.execute(command);

        return {
            statusCode: 201,
            message: 'Leave request created successfully'
        };
    }
}