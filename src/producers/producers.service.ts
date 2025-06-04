import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producer } from './entities/producer.entity';
import { CreateProducerDto } from './dto/create-producer.dto';
import { UpdateProducerDto } from './dto/update-producer.dto';

@Injectable()
export class ProducersService {
  constructor(
    @InjectRepository(Producer)
    private repository: Repository<Producer>,
  ) {}

  create(dto: CreateProducerDto) {
    const producer = this.repository.create(dto);
    return this.repository.save(producer);
  }

  findAll() {
    return this.repository.find({ relations: ['properties'] });
  }

  async findOne(id: string) {
    const producer = await this.repository.findOne({
      where: { id },
      relations: ['properties'],
    });
    if (!producer) throw new NotFoundException('Producer not found');
    return producer;
  }

  async update(id: string, dto: UpdateProducerDto) {
    await this.findOne(id);
    await this.repository.update(id, dto);
    return this.repository.findOne({
      where: { id },
      relations: ['properties'],
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.repository.delete(id);
    return { message: 'Deleted successfully' };
  }
}
