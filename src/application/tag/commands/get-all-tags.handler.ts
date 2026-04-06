import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAllTagsQuery } from "./get-all-tag.query";
import { Inject } from "@nestjs/common";
import type { ITagRepository } from '../../../domain/tag/tag.repository'; // เพิ่มคำว่า type ตรงนี้
import { TAG_REPOSITORY } from '../../../domain/tag/tag.repository';
import { TagEntity } from "src/domain/tag/tag.entity";

@QueryHandler(GetAllTagsQuery)
export class GetAllTagsHandler implements IQueryHandler<GetAllTagsQuery> {
    constructor(@Inject(TAG_REPOSITORY)
    private readonly tagRepository: ITagRepository) { }

    async execute(): Promise<TagEntity[]> {
        return this.tagRepository.findAll()
    }
}

