import { Crop } from '../../crop/entities/crop.entity';
import { Producer } from '../../producers/entities/producer.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Property {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'uuid-property' })
  id: string;

  @Column()
  @ApiProperty({ example: 'Fazenda Modelo' })
  name: string;

  @Column()
  @ApiProperty({ example: 'Ribeirão Preto' })
  city: string;

  @Column({ length: 2 })
  @ApiProperty({ example: 'SP' })
  state: string;

  @Column('float')
  @ApiProperty({ example: 100 })
  total_area: number;

  @Column('float')
  @ApiProperty({ example: 60 })
  arable_area: number;

  @Column('float')
  @ApiProperty({ example: 30 })
  vegetation_area: number;

  @ManyToOne(() => Producer, (producer) => producer.properties, {
    onDelete: 'CASCADE',
  })
  producer: Producer;

  @OneToMany(() => Crop, (crop) => crop.property, { cascade: true })
  crops: Crop[];
}
