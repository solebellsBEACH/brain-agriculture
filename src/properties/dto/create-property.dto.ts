import { IsString, IsNumber } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  name: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsNumber()
  total_area: number;

  @IsNumber()
  arable_area: number;

  @IsNumber()
  vegetation_area: number;
}
