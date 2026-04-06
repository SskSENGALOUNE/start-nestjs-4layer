
import { Body, ConflictException, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryResponseDto } from './dto/category-response.dto';
import { CreateCategoryCommand } from '../../application/category/commands/create-category.command';
import { GetAllCategoriesQuery } from '../../application/category/queries/get-all-categories.query';
import { CategoryEntity } from '../../domain/category/category.entity';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CategoryAlreadyExistsException } from 'src/domain/category/category.exceptions';

@ApiTags('categories')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoryController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    @UseGuards(RolesGuard)
    @Roles('ADMIN', 'SUPERADMIN')
    @Post()
    async create(@Body() dto: CreateCategoryDto): Promise<CategoryResponseDto> {
        try {
            const category = await this.commandBus.execute<CreateCategoryCommand, CategoryEntity>(
                new CreateCategoryCommand(dto.name),
            );
            return CategoryResponseDto.fromEntity(category);
        } catch (err) {
            if (err instanceof CategoryAlreadyExistsException) {
                throw new ConflictException(err.message);
            }
            throw err;
        }
    }

    @Get()
    async findAll(): Promise<CategoryResponseDto[]> {
        const categories = await this.queryBus.execute<GetAllCategoriesQuery, CategoryEntity[]>(
            new GetAllCategoriesQuery(),
        );
        return categories.map(CategoryResponseDto.fromEntity);
    }
}                