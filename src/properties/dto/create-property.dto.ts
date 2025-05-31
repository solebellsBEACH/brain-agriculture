import { IsString } from "class-validator";

export class CreatePropertyDto {
    @IsString()
    name: string;

    @IsString()
    document: string;

    @IsString()
    city: string;

    @IsString()
    state: string;
}
