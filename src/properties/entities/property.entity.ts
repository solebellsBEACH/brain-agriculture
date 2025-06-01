import { Crop } from '../../crop/entities/crop.entity';
import { Producer } from '../../producers/entities/producer.entity';
import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany,
} from 'typeorm';


@Entity()
export class Property {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string; // Nome da fazenda

  @Column()
  city: string;

  @Column({ length: 2 })
  state: string;

  @Column('float')
  total_area: number;

  @Column('float')
  arable_area: number;

  @Column('float')
  vegetation_area: number;

  @ManyToOne(() => Producer, (producer) => producer.properties, { onDelete: 'CASCADE' })
  producer: Producer;

  @OneToMany(() => Crop, (crop) => crop.property, { cascade: true })
  crops: Crop[];
}
