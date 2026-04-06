import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ConflictException, Inject } from '@nestjs/common';
import { CreateTagCommand } from './create-tag.command';
import { TAG_REPOSITORY } from '../../../domain/tag/tag.repository';
import type { ITagRepository } from '../../../domain/tag/tag.repository'; // เพิ่มคำว่า type ตรงนี้
import { TagEntity } from '../../../domain/tag/tag.entity';

@CommandHandler(CreateTagCommand)
export class CreateTagHandler implements ICommandHandler<CreateTagCommand> {
    constructor(
        @Inject(TAG_REPOSITORY)
        private readonly tagRepository: ITagRepository,
    ) { }

    async execute(command: CreateTagCommand): Promise<TagEntity> {
        const existing = await this.tagRepository.findByName(command.name);
        if (existing) {
            throw new ConflictException('Tag name already exists');
        }
        return this.tagRepository.create({ name: command.name });
    }
}