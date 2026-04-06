import { Injectable, ConflictException, InternalServerErrorException } from "@nestjs/common"; // 1. เพิ่ม Exception
import { ITagRepository, CreateTagData } from "src/domain/tag/tag.repository";
import { PrismaService } from "../prisma.service";
import { TagEntity } from "src/domain/tag/tag.entity";

@Injectable()
export class TagRepositoryImpl implements ITagRepository {
    constructor(private readonly prisma: PrismaService) { }
    async create(data: CreateTagData): Promise<TagEntity> {
        try {
            return await this.prisma.tag.create({
                data: { name: data.name }
            });
        } catch (e) {
            // 2. เช็ค error code ของ Prisma (Unique constraint failed)
            if (e?.code === 'P2002') {
                throw new ConflictException('Tag name already exists');
            }
            // 3. ควร throw error อื่นๆ ออกไปด้วย ไม่ควรปล่อยให้เงียบ
            throw new InternalServerErrorException('Something went wrong');
        }
    } // ← ใส่ปีกกาปิด Method create ตรงนี้

    async findByName(name: string): Promise<TagEntity | null> {
        return this.prisma.tag.findUnique({ where: { name } });
    }

    async findAll(): Promise<TagEntity[]> {
        return this.prisma.tag.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }
}