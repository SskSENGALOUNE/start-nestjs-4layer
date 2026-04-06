
import { Body, Controller, Get, Post, UseGuards, NotFoundException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { ProductEntity } from '../../domain/product/product.entity';
import { CreateProductCommand } from '../../application/product/commands/create-product.command';
import { GetAllProductsQuery } from '../../application/product/queries/get-all-products.query';
import { CategoryNotFoundException } from '../../domain/category/category.exceptions';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('products')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('products')
export class ProductController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    @Post()
    @Roles('ADMIN', 'SUPERADMIN')
    async create(@Body() dto: CreateProductDto): Promise<ProductResponseDto> {
        const command = new CreateProductCommand(
            dto.name,
            dto.costPrice,
            dto.salePrice,
            dto.unit,
            dto.minQuantity,
            dto.categoryId,
            dto.imageUrl,
        );

        try {
            const product = await this.commandBus.execute<CreateProductCommand, ProductEntity>(command);
            return ProductResponseDto.fromEntity(product);
        } catch (err) {
            if (err instanceof CategoryNotFoundException) {
                throw new NotFoundException(err.message);
            }
            throw err;
        }
    }

    @Get()
    @Roles('ADMIN', 'SUPERADMIN', 'USER')
    async findAll(): Promise<ProductResponseDto[]> {
        const products = await this.queryBus.execute<GetAllProductsQuery, ProductEntity[]>(new
            GetAllProductsQuery());
        return products.map(ProductResponseDto.fromEntity);
    }
}     