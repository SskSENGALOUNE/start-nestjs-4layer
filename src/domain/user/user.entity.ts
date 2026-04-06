// Domain Entity คือ "ตัวแทน" ของ User ใน business logic
// ไม่มีการ import จาก NestJS, Prisma หรือ framework ใดๆ ทั้งนั้น
// มีหน้าที่เก็บ business rules เช่น การสร้าง / แก้ไข User

export class UserEntity {
  constructor(
    public readonly id: string,
    public readonly username: string,
    public readonly email: string,
    public readonly password: string,
    public readonly createdBy: string,
    public readonly updatedBy: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly roles: string[] = [],
  ) { }

  // static create() คือ factory method
  // ใช้สร้าง UserEntity ใหม่โดยยังไม่มี id (id จะถูกสร้างตอน save ลง DB)
  static create(
    username: string,
    email: string,
    password: string,
    createdBy: string,
  ): Omit<UserEntity, 'id' | 'createdAt' | 'updatedAt'> {
    return {
      username,
      email,
      password,
      createdBy,
      updatedBy: createdBy, // ตอนสร้างใหม่ updatedBy = createdBy
      roles: [],
    };
  }
}
