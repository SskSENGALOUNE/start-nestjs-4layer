import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { PrismaModule } from "src/infrastructure/prisma/prisma.module";
import { ColorController } from "./color.controller";
import { COLOR_REPOSITORY } from "src/domain/color/color.repository";
import { ColorRepositoryImpl } from "src/infrastructure/prisma/repositories/color.repository.impl";
import { CreateColorHandler } from "src/application/color/commands/create-color.handler";

@Module({
    imports: [CqrsModule, PrismaModule],
    controllers: [ColorController],
    providers: [
        CreateColorHandler, {
            provide: COLOR_REPOSITORY,
            useClass: ColorRepositoryImpl
        }],
    exports: [COLOR_REPOSITORY],
})

export class ColorModule { }