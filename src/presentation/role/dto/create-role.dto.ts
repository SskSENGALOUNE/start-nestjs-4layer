import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum RoleType {
  ADMIN = 'ADMIN',
  USER = 'USER',
  SUPERADMIN = 'SUPERADMIN',
}

export class CreateRoleDto {
  @ApiProperty({ enum: RoleType, example: RoleType.ADMIN })
  @IsEnum(RoleType)
  name: RoleType;
}
