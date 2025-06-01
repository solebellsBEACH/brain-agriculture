import { Property } from '../../properties/entities/property.entity';
import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne,
} from 'typeorm';

@Entity()
export class Crop {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  harvest_year: number;

  @ManyToOne(() => Property, (property) => property.crops, { onDelete: 'CASCADE' })
  property: Property;
}
