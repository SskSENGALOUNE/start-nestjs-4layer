import { UserEntity } from '../../../domain/user/user.entity';

// Response DTO คือรูปแบบข้อมูลที่ส่งกลับให้ client
// สังเกตว่า ไม่มี password field เพื่อความปลอดภัย
// เราเลือกเองว่าจะ expose field ไหนบ้าง

export class UserResponseDto {
  id: string;
  username: string;
  email: string;
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
  roles: string[];
  // password: string;


  // static fromEntity() แปลง Domain Entity → Response DTO
  // ทำให้ controller ไม่ต้องรู้โครงสร้างของ Entity โดยตรง
  static fromEntity(entity: UserEntity): UserResponseDto {
    const dto = new UserResponseDto();
    dto.id = entity.id;
    dto.username = entity.username;
    dto.email = entity.email;
    dto.createdBy = entity.createdBy;
    dto.updatedBy = entity.updatedBy;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    dto.roles = entity.roles;
    // dto.password = entity.password;
    return dto;
  }
}

export class UserListResponseDto {
  data: UserResponseDto[];
  total: number;

  static fromEntity(entities: UserEntity[]): UserListResponseDto {
    const dto = new UserListResponseDto();
    dto.data = entities.map(UserResponseDto.fromEntity)
    dto.total = entities.length;
    return dto;
  }
}
