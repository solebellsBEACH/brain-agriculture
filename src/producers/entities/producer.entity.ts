import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Property } from '../../properties/entities/property.entity';

@Entity('producers')
export class Producer {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    document: string;

    @OneToMany(() => Property, property => property.producer, { cascade: true })
    properties: Property[];
}
