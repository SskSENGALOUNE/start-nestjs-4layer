import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class AssignRoleDto {
    @ApiProperty({ example: 'role-uuid-here' })
    @IsUUID()
    roleId: string;
} 