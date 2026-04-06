import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { PrismaModule } from "src/infrastructure/prisma/prisma.module";
import { SizeController } from "./size.controller";
import { CreateSizeHandler } from "src/application/size/commands/create-size.handler";
import { SIZE_REPOSITORY } from "src/domain/size/size.repository";
import { SizeRepository } from "src/infrastructure/prisma/repositories/size.repository.impl";

@Module({
    imports: [CqrsModule, PrismaModule],
    controllers: [SizeController],
    providers: [
        CreateSizeHandler, {
            provide: SIZE_REPOSITORY,
            useClass: SizeRepository
        }
    ]
})

export class SizeModule { }