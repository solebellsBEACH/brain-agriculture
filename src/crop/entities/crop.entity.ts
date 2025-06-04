import { Property } from '../../properties/entities/property.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Crop {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'uuid-crop' })
  id: string;

  @Column()
  @ApiProperty({ example: 'Soja' })
  name: string;

  @Column()
  @ApiProperty({ example: 2024 })
  harvest_year: number;

  @ManyToOne(() => Property, (property) => property.crops, {
    onDelete: 'CASCADE',
  })
  property: Property;
}
