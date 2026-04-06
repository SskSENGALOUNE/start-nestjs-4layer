import { IsNotEmpty, IsString, Matches } from "class-validator";

export class CreateColorDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @Matches(/^#[0-9A-Fa-f]{6}$/)
    hexCode: string;
}