import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleResponseDto } from './dto/role-response.dto';
import { CreateRoleCommand } from '../../application/role/commands/create-role.command';
import { GetAllRolesQuery } from '../../application/role/queries/get-all-roles.query';
import { RoleEntity } from '../../domain/role/role.entity';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('roles')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('roles')
export class RoleController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @UseGuards(RolesGuard)
  @Roles('ADMIN', 'SUPERADMIN')
  @Post()
  async create(@Body() dto: CreateRoleDto): Promise<RoleResponseDto> {
    const role = await this.commandBus.execute<CreateRoleCommand, RoleEntity>(
      new CreateRoleCommand(dto.name),
    );
    return RoleResponseDto.fromEntity(role);
  }

  @Get()
  async findAll(): Promise<RoleResponseDto[]> {
    const roles = await this.queryBus.execute<GetAllRolesQuery, RoleEntity[]>(
      new GetAllRolesQuery(),
    );
    return roles.map(RoleResponseDto.fromEntity);
  }
}
