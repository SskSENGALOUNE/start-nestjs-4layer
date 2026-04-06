import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import type { IRoleRepository } from '../../../domain/role/role.repository';
import { RoleEntity } from '../../../domain/role/role.entity';

@Injectable()
export class RoleRepositoryImpl implements IRoleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(name: string): Promise<RoleEntity> {
    const result = await this.prisma.role.create({
      data: { name: name as any },
    });
    return new RoleEntity(result.id, result.name, result.createdAt, result.updatedAt);
  }

  async findAll(): Promise<RoleEntity[]> {
    const results = await this.prisma.role.findMany();
    return results.map(
      (r) => new RoleEntity(r.id, r.name, r.createdAt, r.updatedAt),
    );
  }
}
