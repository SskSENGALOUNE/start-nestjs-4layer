import { ConflictException, Injectable } from "@nestjs/common";
import { CreateColorData, IColorRepository } from "src/domain/color/color.repository";
import { PrismaService } from "../prisma.service";
import { ColorEntity } from "src/domain/color/color.entity";
import { Prisma } from "@prisma/client";

@Injectable()
export class ColorRepositoryImpl implements IColorRepository {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: CreateColorData): Promise<ColorEntity> {
        try {
            const color = await this.prisma.color.create({
                data: {
                    name: data.name,
                    hexCode: data.hexCode,
                },
            });
            return await this.prisma.color.create({
                data: {
                    name: data.name,
                    hexCode: data.hexCode,
                },
            });

        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictException(`สีนี้หรือรหัส Hex ${data.hexCode} มีอยู่ในระบบแล้ว`);
                }
            }
            throw error;
        }
    }
}