import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// DTO (Data Transfer Object) คือ "แบบฟอร์ม" ที่กำหนดว่า
// client ต้องส่งข้อมูลอะไรมาบ้างตอน POST /users
// class-validator จะ validate ข้อมูลให้อัตโนมัติก่อนเข้า controller

export class CreateUserDto {
  @ApiProperty({ example: 'john_doe' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @IsNotEmpty()
  password: string;

}
