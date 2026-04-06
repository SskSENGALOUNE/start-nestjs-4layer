import { RoleEntity } from './role.entity';

export interface IRoleRepository {
  create(name: string): Promise<RoleEntity>;
  findAll(): Promise<RoleEntity[]>;
}

export const ROLE_REPOSITORY = Symbol('RoleRepository');
