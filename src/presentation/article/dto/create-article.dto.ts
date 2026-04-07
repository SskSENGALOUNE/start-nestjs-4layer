import { IsString, IsNotEmpty, MinLength, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // สำหรับคนที่ใช้ Swagger

export class CreateArticleDto {
    @ApiProperty({ example: 'My First Article', description: 'หัวข้อบทความ (ขั้นต่ำ 5 ตัวอักษร)' })
    @IsString()
    @IsNotEmpty()
    @MinLength(5, { message: 'Title is too short. Minimal length is 5 characters.' })
    readonly title: string;

    @ApiProperty({ example: 'This is the content...', description: 'เนื้อหาของบทความ' })
    @IsString()
    @IsNotEmpty()
    readonly content: string;

    @ApiProperty({ example: 'uuid-v4-category-id', description: 'ID ของหมวดหมู่' })
    @IsString()
    @IsNotEmpty()
    // หาก categoryId ใน DB ของคุณเป็น UUID สามารถใช้ @IsUUID() ได้
    // @IsUUID() 
    readonly categoryId: string;
}