import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateRoleCommand } from './create-role.command';
import type { IRoleRepository } from '../../../domain/role/role.repository';
import { ROLE_REPOSITORY } from '../../../domain/role/role.repository';
import { RoleEntity } from '../../../domain/role/role.entity';

@CommandHandler(CreateRoleCommand)
export class CreateRoleHandler implements ICommandHandler<CreateRoleCommand> {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: IRoleRepository,
  ) {}

  async execute(command: CreateRoleCommand): Promise<RoleEntity> {
    return this.roleRepository.create(command.name);
  }
}
