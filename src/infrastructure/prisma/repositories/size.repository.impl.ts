import { Injectable, ConflictException } from "@nestjs/common";
import { CreateSizeData, ISizeRepository } from "src/domain/size/size.repository";
import { PrismaService } from "../prisma.service";
import { SizeEntity } from "src/domain/size/size.entity";
import { Prisma } from "@prisma/client"; // ✅ 1. อย่าลืม Import Prisma สำหรับเช็ค Error

@Injectable()
export class SizeRepository implements ISizeRepository {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    async create(data: CreateSizeData): Promise<SizeEntity> {
        try {
            return await this.prisma.size.create({
                data,
            });
        } catch (error) {
            // ✅ 3. ดักจับ Error ข้อมูลซ้ำ (กรณีมีไซส์นี้อยู่แล้ว)
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictException(`A size with the name '${data.name}' already exists. Please use a different name.`);
                }
            }
            // ถ้าเป็น Error อื่นๆ ก็ปล่อยผ่านไป
            throw error;
        }
    }
}