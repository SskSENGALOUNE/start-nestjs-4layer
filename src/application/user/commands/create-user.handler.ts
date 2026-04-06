import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserCommand } from './create-user.command';
import { UserEntity } from '../../../domain/user/user.entity';
import type { IUserRepository } from '../../../domain/user/user.repository';
import { USER_REPOSITORY } from '../../../domain/user/user.repository';

// @CommandHandler บอก NestJS ว่า Handler นี้รับผิดชอบ CreateUserCommand
@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    // @Inject(USER_REPOSITORY) ใช้ Symbol เป็น token
    // NestJS จะหา class ที่ provide ด้วย token นี้มาให้อัตโนมัติ
    // (ตอนนี้ยังไม่รู้ว่า implementation คือ class ไหน รู้แค่ interface)
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) { }

  async execute(command: CreateUserCommand): Promise<UserEntity> {
    // Step 1: สร้าง domain object ผ่าน factory method
    // ให้ Domain เป็นคนกำหนด business rules ของการสร้าง User
    const hashedPassword = await bcrypt.hash(command.password, 10);
    const userData = UserEntity.create(
      command.username,
      command.email,
      hashedPassword,
      command.createdBy,
    );

    // Step 2: บันทึกลง database ผ่าน repository
    // Handler ไม่รู้ว่าข้างล่างใช้ Prisma หรืออะไร รู้แค่ interface
    const user = await this.userRepository.create(userData);

    return user;
  }
}
