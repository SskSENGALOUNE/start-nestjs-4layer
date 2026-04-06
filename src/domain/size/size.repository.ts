import { SizeEntity } from "./size.entity";

export interface CreateSizeData {
    name: string,
    sortOrder: number,
}
export interface ISizeRepository {
    create(data: CreateSizeData): Promise<SizeEntity>;
}

export const SIZE_REPOSITORY = Symbol('SizeRepository');