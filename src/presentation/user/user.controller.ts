import { Body, ConflictException, Controller, Get, NotFoundException, Param, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserListResponseDto, UserResponseDto } from './dto/user-response.dto';
import { CreateUserCommand } from '../../application/user/commands/create-user.command';
import { UserEntity } from '../../domain/user/user.entity';
import { UserAlreadyExistsException, UserNotFoundException } from '../../domain/user/user.exceptions';
import { GetUserByIdQuery } from '../../application/user/queries/get-user-by-id-query';
import { GetAllUsersQuery } from '../../application/user/queries/get-all-users.query';
import { AssignRoleDto } from './dto/assign-role.dto';
import { AssignRoleCommand } from '../../application/user/commands/assign-role.command';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(
    // Controller inject แค่ CommandBus เท่านั้น
    // ไม่ได้ inject repository หรือ service โดยตรง
    // นี่คือหัวใจของ CQRS — controller ไม่รู้ว่าใครทำงานจริง
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,

  ) { }

  @Post()
  async create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    // สร้าง Command จากข้อมูลที่รับมา
    const command = new CreateUserCommand(
      dto.username,
      dto.email,
      dto.password,
      'admin',
    );

    // ส่ง Command เข้า CommandBus
    // Bus จะหา Handler ที่รับผิดชอบ Command นี้โดยอัตโนมัติ
    try {
      const user = await this.commandBus.execute<CreateUserCommand, UserEntity>(command);
      // แปลง Entity → Response DTO ก่อน return (ซ่อน password)
      return UserResponseDto.fromEntity(user);
    } catch (err) {
      if (err instanceof UserAlreadyExistsException) {
        throw new ConflictException(err.message);
      }
      throw err;
    }
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get(':id')
  async findById(@Param('id') id: string): Promise<UserResponseDto> {
    const query = new GetUserByIdQuery(id);
    try {
      const user = await this.queryBus.execute<GetUserByIdQuery, UserEntity>(query);
      return UserResponseDto.fromEntity(user);
    } catch (err) {
      if (err instanceof UserNotFoundException) {
        throw new NotFoundException(err.message);
      }
      throw err;
    }
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<UserListResponseDto> {
    const result = await
      this.queryBus.execute<GetAllUsersQuery, {
        data:
        UserEntity[]; total: number
      }>(
        new GetAllUsersQuery(),
      );
    return UserListResponseDto.fromEntity(result.data);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @Post(':id/roles')
  async assignRole(
    @Param('id') id: string,
    @Body() dto: AssignRoleDto,
  ): Promise<void> {
    const command = new AssignRoleCommand(id, dto.roleId);
    try {
      await this.commandBus.execute(command);
    } catch (err) {
      if (err instanceof UserNotFoundException) {
        throw new NotFoundException(err.message);
      }
      throw err;
    }
  }
}