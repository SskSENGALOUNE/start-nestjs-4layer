import { ColorEntity } from "./color.entity";

export interface CreateColorData {
    name: string;
    hexCode: string;
}


export interface IColorRepository {
    create(data: CreateColorData): Promise<ColorEntity>
}

export const COLOR_REPOSITORY = 'COLOR_REPOSITORY';
