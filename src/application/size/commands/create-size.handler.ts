import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateSizeCommand } from "./create-size.command";
import { SIZE_REPOSITORY } from "src/domain/size/size.repository";
import type { ISizeRepository } from "src/domain/size/size.repository";
import { Inject } from "@nestjs/common";
import { SizeEntity } from "src/domain/size/size.entity";

@CommandHandler(CreateSizeCommand)
export class CreateSizeHandler implements ICommandHandler<CreateSizeCommand> {
    constructor(
        @Inject(SIZE_REPOSITORY)
        private readonly sizeRepository: ISizeRepository,
    ) { }

    async execute(command: CreateSizeCommand): Promise<SizeEntity> {
        return this.sizeRepository.create({
            name: command.name,
            sortOrder: command.sortOrder,
        })

    }
}