import { Producer } from '../../producers/entities/producer.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('properties')
export class Property {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    document: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @ManyToOne(() => Producer, producer => producer.properties,)
    producer: Producer;

    @Column({ name: 'total_area', type: 'float', nullable: false, default: 0 })
    total_area: number;

    @Column({ name: 'arable_area', type: 'float', nullable: false, default: 0 })
    arable_area: number;

    @Column({ name: 'vegetation_area', type: 'float', nullable: false, default: 0 })
    vegetation_area: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}


export interface IProperty {
    id?: string;
    name: string;
    document: string;
    city: string;
    state: string;
    total_area: number;
    arable_area: number;
    vegetation_area: number;
}
