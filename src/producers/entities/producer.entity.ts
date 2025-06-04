import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Property } from '../../properties/entities/property.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('producers')
export class Producer {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'uuid-produtor' })
  id: string;

  @Column()
  @ApiProperty({ example: 'João da Silva' })
  name: string;

  @Column({ unique: true })
  @ApiProperty({ example: '12345678900' })
  document: string;

  @OneToMany(() => Property, (property) => property.producer, { cascade: true })
  properties: Property[];
}
