
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import type { ICategoryRepository } from '../../../domain/category/category.repository';
import { CategoryEntity } from '../../../domain/category/category.entity';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CategoryAlreadyExistsException } from 'src/domain/category/category.exceptions';

@Injectable()
export class CategoryRepositoryImpl implements ICategoryRepository {
    constructor(private readonly prisma: PrismaService) { }
    findById(id: string): Promise<CategoryEntity | null> {
        throw new Error('Method not implemented.');
    }

    async create(name: string): Promise<CategoryEntity> {
        try {
            const result = await this.prisma.productCategory.create({
                data: { name },
            });
            return new CategoryEntity(result.id, result.name, result.createdAt, result.updatedAt);
        } catch (err) {
            if (err instanceof PrismaClientKnownRequestError && err.code === 'P2002') {
                throw new CategoryAlreadyExistsException(name);
            }
            throw err;
        }
    }

    async findAll(): Promise<CategoryEntity[]> {
        const results = await this.prisma.productCategory.findMany();
        return results.map(
            (r) => new CategoryEntity(r.id, r.name, r.createdAt, r.updatedAt),
        );
    }
}        