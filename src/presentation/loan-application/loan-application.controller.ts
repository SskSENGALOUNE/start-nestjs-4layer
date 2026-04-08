import { Controller, Post, Body, HttpCode, HttpStatus, Query, Get } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateLoanApplicationDto } from './dto/create-loan-application.dto';
import { CreateLoanApplicationCommand } from '../../application/loan-application/commands/create-loan-application.command';
import { GetAllLoanApplicationsQuery } from 'src/application/loan-application/queries/get-all-loan-applications.query';

@Controller('loan-applications')
export class LoanApplicationController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) { }

    @Post()
    @HttpCode(HttpStatus.CREATED) // ปกติ POST จะคืน 201
    async create(@Body() dto: CreateLoanApplicationDto) {
        const command = new CreateLoanApplicationCommand(
            dto.customerId,
            dto.monthlyIncome,
            dto.requestedAmount,
            dto.purpose
        );

        // execute จะรอรับค่า referenceNo ที่ return มาจาก Handler
        const referenceNo = await this.commandBus.execute(command);

        return {
            status: 'success',
            message: 'ยื่นคำขอสินเชื่อสำเร็จ',
            data: { referenceNo }
        };
    }

    @Get()
    async findAll(@Query('status') status?: string) {
        // 1. สร้าง Query Object
        const query = new GetAllLoanApplicationsQuery(status);

        // 2. โยนเข้า QueryBus (มันจะไปหา Handler ให้อัตโนมัติ)
        const data = await this.queryBus.execute(query);

        // 3. จัด Format คืนค่ากลับไป
        return {
            status: 'success',
            total: data.length,
            data: data
        };
    }
}