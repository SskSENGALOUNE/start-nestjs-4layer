import { Body, Controller, Get, Post } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateTagCommand } from "src/application/tag/commands/create-tag.command";
import { GetAllTagsQuery } from "src/application/tag/commands/get-all-tag.query";
import { TagEntity } from "src/domain/tag/tag.entity";
import { CreateTagDto } from "./dto/create-tag.dto";

@ApiTags('Tags')
@Controller('tags')
export class TagController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) { }

    @Post()
    @ApiOperation({ summary: 'Create a new tag' })
    @ApiResponse({ status: 201, description: 'Tag created successfully' })
    async create(@Body() dto: CreateTagDto): Promise<TagEntity> {
        return this.commandBus.execute(new CreateTagCommand(dto.name))
    }

    @Get()
    @ApiOperation({ summary: 'Get all tags' })
    @ApiResponse({ status: 200, description: 'List of all tags' })
    async findAll(): Promise<TagEntity[]> {
        return this.queryBus.execute(new GetAllTagsQuery())
    }
}
