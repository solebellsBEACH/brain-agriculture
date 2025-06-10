import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  Length,
  IsBoolean,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  @ApiProperty({ example: 'Fazenda Modelo' })
  name: string;

  @IsString()
  @ApiProperty({ example: 'Ribeirão Preto' })
  city: string;

  @IsString()
  @Length(2, 2)
  @ApiProperty({ example: 'SP' })
  state: string;

  @IsNumber()
  @ApiProperty({ example: 100 })
  total_area: number;

  @IsNumber()
  @ApiProperty({ example: 60 })
  arable_area: number;

  @IsNumber()
  @ApiProperty({ example: 30 })
  vegetation_area: number;

  @IsBoolean()
  @ApiProperty({ example: true })
  has_irrigation: boolean;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 200, required: false })
  machinery_count?: number;

  @IsUUID()
  @ApiProperty({ example: 'uuid-produtor' })
  producerId: string;
}
