import { RoleEntity } from '../../../domain/role/role.entity';

export class RoleResponseDto {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  static fromEntity(entity: RoleEntity): RoleResponseDto {
    const dto = new RoleResponseDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    return dto;
  }
}
