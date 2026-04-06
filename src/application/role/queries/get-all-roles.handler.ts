import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetAllRolesQuery } from './get-all-roles.query';
import type { IRoleRepository } from '../../../domain/role/role.repository';
import { ROLE_REPOSITORY } from '../../../domain/role/role.repository';
import { RoleEntity } from '../../../domain/role/role.entity';

@QueryHandler(GetAllRolesQuery)
export class GetAllRolesHandler implements IQueryHandler<GetAllRolesQuery> {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: IRoleRepository,
  ) {}

  async execute(): Promise<RoleEntity[]> {
    return this.roleRepository.findAll();
  }
}
