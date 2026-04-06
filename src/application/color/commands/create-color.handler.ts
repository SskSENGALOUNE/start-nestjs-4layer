import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateColorCommand } from "./create-color.command";
import { COLOR_REPOSITORY } from "src/domain/color/color.repository";
import { Inject } from "@nestjs/common";
import type { IColorRepository } from "src/domain/color/color.repository";
import { ColorEntity } from "src/domain/color/color.entity";

@CommandHandler(CreateColorCommand)
export class CreateColorHandler implements ICommandHandler<CreateColorCommand> {
    constructor(
        @Inject(COLOR_REPOSITORY)
        public readonly colorRepository: IColorRepository,
    ) { }
    async execute(command: CreateColorCommand): Promise<ColorEntity> {
        return this.colorRepository.create({
            name: command.name,
            hexCode: command.hexCode,
        });
    }
}
