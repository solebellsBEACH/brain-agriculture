import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Property } from '../entities/property.entity';
import { PropertiesService } from '../properties.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { mocks } from '../../database/mocks';

describe('PropertiesService', () => {
  let service: PropertiesService;
  let repository: jest.Mocked<Repository<Property>>;

  const mockProperty: Property = mocks.propertyMocks[0];

  const createDto: CreatePropertyDto = {
    name: 'Fazenda Teste',
    city: 'Bauru',
    state: 'SP',
    total_area: 100,
    arable_area: 2,
    vegetation_area: 80,
    has_irrigation: false,
    producerId: mocks.producersMock[0].id,
  };

  const updateDto = {
    name: 'Nova Fazenda',
    city: 'Campinas',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PropertiesService,
        {
          provide: getRepositoryToken(Property),
          useValue: {
            create: jest.fn().mockImplementation((dto) => ({ ...dto })),
            save: jest
              .fn()
              .mockImplementation((dto) => ({ id: 'uuid-123', ...dto })),
            find: jest.fn().mockResolvedValue([mockProperty]),
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
    expect(repository.save).toHaveBeenCalledWith({ ...createDto });
    expect(result).toEqual(expect.objectContaining(createDto));
  });

  it.skip('should return all properties', async () => {
    const result = await service.findAll();
    expect(repository.find).toHaveBeenCalled();
    expect(result).toEqual([mockProperty]);
  });

  it.skip('should return one property by id', async () => {
    const result = await service.findOne('uuid-123');
    expect(repository.findOneBy).toHaveBeenCalledWith({ id: 'uuid-123' });
    expect(result).toEqual(mockProperty);
  });

  it('should throw NotFoundException if property does not exist', async () => {
    repository.findOneBy.mockResolvedValueOnce(null);
    await expect(service.findOne('invalid-id')).rejects.toThrow(
      NotFoundException,
    );
  });

  it.skip('should update a property', async () => {
    const result = await service.update('uuid-123', updateDto);
    expect(repository.update).toHaveBeenCalledWith('uuid-123', updateDto);
    expect(result).toEqual(mockProperty);
  });

  it.skip('should delete a property', async () => {
    const result = await service.remove('uuid-123');
    expect(repository.delete).toHaveBeenCalledWith('uuid-123');
    expect(result).toEqual({ message: 'Deleted successfully' });
  });
});
