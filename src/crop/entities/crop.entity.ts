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

  @Column({ type: 'float', default: 0 })
  @ApiProperty({ example: 100.5 })
  value_per_unit: number;

  @Column({ type: 'float', default: 0 })
  @ApiProperty({ example: 10.3 })
  utilization_percentage: number;

  @Column({ type: 'float', nullable: true })
  @ApiProperty({ example: 3.2 })
  expected_yield: number;

  @Column({ type: 'float', default: 0 })
  @ApiProperty({ example: 10.3 })
  value_growth: number;

  @ManyToOne(() => Property, (property) => property.crops, {
    onDelete: 'CASCADE',
  })
  property: Property;
}
