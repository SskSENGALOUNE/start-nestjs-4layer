import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { CreateSizeDto } from "./dto/create-size.dto";
import { SizeEntity } from "src/domain/size/size.entity";
import { CreateSizeCommand } from "src/application/size/commands/create-size.command";

@Controller('sizes')
export class SizeController {
    constructor(private readonly commandBus: CommandBus) { }
    @Post()
    async create(@Body() dto: CreateSizeDto): Promise<SizeEntity> {
        const command = new CreateSizeCommand(dto.name, dto.sortOrder)
        return this.commandBus.execute(command);
    }
}
