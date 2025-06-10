import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateCropDto {
  @IsString()
  @ApiProperty({ example: 'Soja' })
  name: string;

  @IsNumber()
  @ApiProperty({ example: 2024 })
  harvest_year: number;

  @IsNumber()
  @ApiProperty({ example: 100.5 })
  value_per_unit: number;

  @IsNumber()
  @ApiProperty({ example: 10.3 })
  utilization_percentage: number;

  @IsNumber()
  @ApiProperty({ example: 10.3 })
  value_growth: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 3.2, required: false })
  expected_yield?: number;

  @IsString()
  propertyId: string;
}
