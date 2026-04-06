import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger"; // เพิ่มตรงนี้
import { CreateColorCommand } from "src/application/color/commands/create-color.command";
import { CreateColorDto } from "./dto/create-color.dto";

@ApiTags('Colors') // จัดหมวดหมู่ในหน้า Swagger
@Controller('colors')
export class ColorController {
    constructor(
        private readonly commandBus: CommandBus,
    ) { }

    @Post()
    @ApiOperation({ summary: 'สร้างสีใหม่' }) // หัวข้อของ API
    @ApiBody({ type: CreateColorDto }) // บอก Swagger ว่า Body หน้าตาเป็นยังไง
    @ApiResponse({ status: 201, description: 'สร้างสำเร็จ' })
    @ApiResponse({ status: 400, description: 'ข้อมูลไม่ถูกต้อง' })
    @ApiResponse({ status: 409, description: 'มีสีนี้อยู่ในระบบแล้ว' })
    async createColor(@Body() body: CreateColorDto) {
        // แนะนำให้ดึงค่าจาก body ออกมาเพื่อสร้าง instance ใหม่
        return this.commandBus.execute(
            new CreateColorCommand(body.name, body.hexCode)
        );
    }
}