import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from '../prisma.service';
import { IUserRepository } from '../../../domain/user/user.repository';
import { UserEntity } from '../../../domain/user/user.entity';
import { UserAlreadyExistsException } from '../../../domain/user/user.exceptions';

// @Injectable() บอก NestJS ว่า class นี้สามารถ inject ได้
// UserRepositoryImpl คือ "คนทำงานจริง" ที่ implement IUserRepository
// Infrastructure layer รู้จัก Prisma แต่ Domain และ Application ไม่รู้

@Injectable()
export class UserRepositoryImpl implements IUserRepository {
  constructor(
    // PrismaService คือ connection ไป database
    private readonly prisma: PrismaService,
  ) { }

  async create(
    data: Omit<UserEntity, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<UserEntity> {
    try {
      const result = await this.prisma.user.create({
        data: {
          username: data.username,
          email: data.email,
          password: data.password,
          createdBy: data.createdBy,
          updatedBy: data.updatedBy,
        },
      });

      return new UserEntity(
        result.id,
        result.username,
        result.email,
        result.password,
        result.createdBy,
        result.updatedBy,
        result.createdAt,
        result.updatedAt,
      );
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError && err.code === 'P2002') {
        throw new UserAlreadyExistsException();
      }
      throw err;
    }
  }
  async findByUsername(username: string): Promise<UserEntity | null> {
    const result = await this.prisma.user.findUnique({
      where: { username },
      include: { roles: { include: { role: true } } },
    });
    if (!result) return null;
    return new UserEntity(
      result.id, result.username, result.email, result.password,
      result.createdBy, result.updatedBy, result.createdAt, result.updatedAt,
      result.roles.map((ur) => ur.role.name),
    );
  }
  async findById(id: string): Promise<UserEntity | null> {
    const result = await this.prisma.user.findUnique({
      where: { id },
      include: { roles: { include: { role: true } } },
    });
    if (!result) return null;
    return new UserEntity(
      result.id, result.username, result.email, result.password,
      result.createdBy, result.updatedBy, result.createdAt, result.updatedAt,
      result.roles.map((ur) => ur.role.name),
    );
  }


  async findAll(): Promise<UserEntity[]> {
    const results = await this.prisma.user.findMany({
      include: { roles: { include: { role: true } } },
    });

    return results.map((r) => new UserEntity(
      r.id, r.username, r.email, r.password,
      r.createdBy, r.updatedBy, r.createdAt, r.updatedAt,
      r.roles.map((ur) => ur.role.name),
    ));
  }

  async assignRole(userId: string, roleId: string): Promise<void> {
    await this.prisma.userRole.create({
      data: { userId, roleId },
    });
  }
}
//9775e96f-e8a6-470c-9731-0b529d64c7b7