import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { PropertiesService } from '../properties.service';
import { Property } from '../entities/property.entity';
import { Producer } from 'src/producers/entities/producer.entity';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { UpdatePropertyDto } from '../dto/update-property.dto';


describe('PropertiesService', () => {
  let service: PropertiesService;
  let repository: jest.Mocked<Repository<Property>>;

  const mockProducer: Producer = {
    id: 'producer-1',
    name: 'Produtor Exemplo',
    document: '12345678900',
    properties: [],
  };

  const mockProperty: Property = {
    id: 'uuid-123',
    name: 'Fazenda Exemplo',
    city: 'Bauru',
    state: 'SP',
    total_area: 100,
    arable_area: 50,
    vegetation_area: 30,
    has_irrigation: false,
    machinery_count: 10,
    producer: mockProducer,
    crops: [],
  };

  const createDto: CreatePropertyDto = {
    name: 'Fazenda Teste',
    city: 'Bauru',
    state: 'SP',
    total_area: 100,
    arable_area: 50,
    vegetation_area: 30,
    has_irrigation: false,
    machinery_count: 5,
    producerId: mockProducer.id,
  };

  const updateDto: UpdatePropertyDto = {
    name: 'Fazenda Atualizada',
    city: 'Campinas',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PropertiesService,
        {
          provide: getRepositoryToken(Property),
          useValue: {
            create: jest.fn().mockImplementation(dto => ({ ...dto })),
            save: jest.fn().mockImplementation(dto => ({
              id: 'uuid-123',
              ...dto,
              producer: mockProducer,
              crops: [],
            })),
            findAndCount: jest.fn().mockResolvedValue([[mockProperty], 1]),
            findOneBy: jest.fn().mockResolvedValue(mockProperty),
            update: jest.fn().mockResolvedValue(undefined),
            delete: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    service = module.get(PropertiesService);
    repository = module.get(getRepositoryToken(Property));
  });

  it('should create a property', async () => {
    const result = await service.create(createDto);
    expect(repository.create).toHaveBeenCalledWith(createDto);
    expect(repository.save).toHaveBeenCalled();
    expect(result).toMatchObject({
      ...createDto,
      id: 'uuid-123',
    });
  });

  it('should return all properties with pagination', async () => {
    const result = await service.findAll(1, 10);
    expect(repository.findAndCount).toHaveBeenCalledWith({ skip: 0, take: 10 });
    expect(result).toEqual({
      data: [mockProperty],
      total: 1,
      page: 1,
      lastPage: 1,
    });
  });

  it('should return one property by id', async () => {
    repository.findOneBy.mockResolvedValue(mockProperty);
    const result = await service.findOne('uuid-123');
    expect(repository.findOneBy).toHaveBeenCalledWith({ id: 'uuid-123' });
    expect(result).toEqual(mockProperty);
  });

  it('should throw NotFoundException when property not found', async () => {
    repository.findOneBy.mockResolvedValueOnce(null);
    await expect(service.findOne('not-exist')).rejects.toThrow(NotFoundException);
  });

  it('should update a property', async () => {
    repository.findOneBy.mockResolvedValue(mockProperty);
    const result = await service.update('uuid-123', updateDto);
    expect(repository.update).toHaveBeenCalledWith('uuid-123', updateDto);
    expect(result).toEqual(mockProperty);
  });

  it('should delete a property', async () => {
    repository.findOneBy.mockResolvedValue(mockProperty);
    const result = await service.remove('uuid-123');
    expect(repository.delete).toHaveBeenCalledWith('uuid-123');
    expect(result).toEqual({ message: 'Deleted successfully' });
  });
});
