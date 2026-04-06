import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RoleController } from './role.controller';
import { CreateRoleHandler } from '../../application/role/commands/create-role.handler';
import { GetAllRolesHandler } from '../../application/role/queries/get-all-roles.handler';
import { RoleRepositoryImpl } from '../../infrastructure/prisma/repositories/role.repository.impl';
import { ROLE_REPOSITORY } from '../../domain/role/role.repository';
import { PrismaModule } from '../../infrastructure/prisma/prisma.module';

@Module({
  imports: [CqrsModule, PrismaModule],
  controllers: [RoleController],
  providers: [
    CreateRoleHandler,
    GetAllRolesHandler,
    {
      provide: ROLE_REPOSITORY,
      useClass: RoleRepositoryImpl,
    },
  ],
})
export class RoleModule {}
