import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCropDto } from './dto/create-crop.dto';
import { Crop } from './entities/crop.entity';
import { UpdateCropDto } from './dto/update-crop.dto';
import { Property } from '../properties/entities/property.entity';

@Injectable()
export class CropsService {
  constructor(
    @InjectRepository(Crop)
    private repository: Repository<Crop>,
    @InjectRepository(Property)
    private readonly propertyRepository: Repository<Property>,
  ) { }

  async create(dto: CreateCropDto) {
    const crop = this.repository.create(dto);
    const property = await this.propertyRepository.findOneBy({ id: dto.propertyId || '' })
    if (property && crop) return this.repository.save(crop);
    throw new NotFoundException('Property not found');
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [data, total] = await this.repository.findAndCount({
      skip,
      take: limit,
    });

    return {
      data,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const property = await this.repository.findOneBy({ id });
    if (!property) throw new NotFoundException('Crop not found');
    return property;
  }

  async update(id: string, dto: UpdateCropDto) {
    if (Object.keys(dto).length === 0) {
      throw new BadRequestException('Nenhum dado fornecido para atualização.');
    }
    const property = await this.repository.findOneBy({ id });
    if (!property) {
      throw new NotFoundException('Crop not found');
    }

    await this.repository.update(id, dto);
    return this.repository.findOneBy({ id });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.repository.delete(id);
    return { message: 'Deleted successfully' };
  }
}
