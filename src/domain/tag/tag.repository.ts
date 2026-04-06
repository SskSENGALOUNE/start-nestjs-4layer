import { TagEntity } from './tag.entity';

export interface CreateTagData {
    name: string;
}

export interface ITagRepository {
    create(data: CreateTagData): Promise<TagEntity>;
    findAll(): Promise<TagEntity[]>;
    findByName(name: string): Promise<TagEntity | null>;
}

export const TAG_REPOSITORY = Symbol('TagRepository');