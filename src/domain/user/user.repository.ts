import { UserEntity } from './user.entity';

// Interface คือ "สัญญา" ที่บอกว่า repository ต้องทำอะไรได้บ้าง
// Domain layer ไม่รู้ว่าข้างล่างใช้ Prisma, TypeORM หรือ MongoDB
// รู้แค่ว่า "ต้องมี method เหล่านี้" เท่านั้น

export interface IUserRepository {
  create(data: Omit<UserEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<UserEntity>;
  findById(id: string): Promise<UserEntity | null>;
  findAll(): Promise<UserEntity[]>;
  assignRole(userId: string, roleId: string): Promise<void>
  findByUsername(username: string): Promise<UserEntity | null>;
}


// Symbol ใช้เป็น token สำหรับ NestJS Dependency Injection
// เพื่อให้ application layer สามารถ inject repository ได้
// โดยไม่ต้องรู้ว่า implementation จริงๆ คืออะไร
export const USER_REPOSITORY = Symbol('UserRepository');
