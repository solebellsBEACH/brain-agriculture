import { IsNotEmpty, IsString, IsInt, Min, Max } from 'class-validator';

export class CreateCropDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear() + 5)
  harvest_year: number;

  @IsNotEmpty()
  @IsString()
  propertyId: string;
}
