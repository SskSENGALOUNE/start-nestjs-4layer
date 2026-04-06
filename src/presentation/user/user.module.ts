import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserController } from './user.controller';
import { CreateUserHandler } from '../../application/user/commands/create-user.handler';
import { UserRepositoryImpl } from '../../infrastructure/prisma/repositories/user.repository.impl';
import { USER_REPOSITORY } from '../../domain/user/user.repository';
import { PrismaModule } from '../../infrastructure/prisma/prisma.module';
import { GetUserByIdHandler } from 'src/application/user/queries/get-user-by-id.handler';
import { GetAllUsersHandler } from 'src/application/user/queries/get-all-users.handler';
import { AssignRoleHandler } from 'src/application/user/commands/assign-role.handler';

// Module คือตัว "ประกอบร่าง" ทุก layer เข้าด้วยกัน
// บอก NestJS ว่าใน module นี้มีอะไรบ้าง

@Module({
  imports: [
    CqrsModule,       // ต้อง import เพื่อใช้ CommandBus/QueryBus
    PrismaModule,     // ต้อง import เพื่อให้ PrismaService พร้อมใช้
  ],
  controllers: [
    UserController,   // รับ HTTP request
  ],
  providers: [
    // Register Command Handlers
    // NestJS CQRS จะ map Handler กับ Command ให้อัตโนมัติผ่าน @CommandHandler
    CreateUserHandler,
    GetUserByIdHandler,
    GetAllUsersHandler,
    AssignRoleHandler,

    // เชื่อม Interface กับ Implementation ผ่าน Dependency Injection
    // เมื่อใครขอ USER_REPOSITORY token → ได้ UserRepositoryImpl
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryImpl,
    },
  ],
})
export class UserModule { }
