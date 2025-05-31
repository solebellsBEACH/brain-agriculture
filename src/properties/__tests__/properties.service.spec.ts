import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Property } from '../entities/property.entity';
import { PropertiesService } from '../properties.service';

describe('PropertiesService', () => {
  let service: PropertiesService;
  let repository: jest.Mocked<Repository<Property>>;

  const mockProperty: Property = {
    id: 'uuid-123',
    name: 'Fazenda Teste',
    document: '999999999',
    city: 'Bauru',
    state: 'SP',
    createdAt: new Date(),
  };

  const createDto = {
    name: 'Fazenda Teste',
    document: '999999999',
    city: 'Bauru',
    state: 'SP',
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
            create: jest.fn().mockImplementation(dto => ({ ...dto })),
            save: jest.fn().mockImplementation(dto => ({ id: 'uuid-123', ...dto })),
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

  it('should return all properties', async () => {
    const result = await service.findAll();
    expect(repository.find).toHaveBeenCalled();
    expect(result).toEqual([mockProperty]);
  });

  it('should return one property by id', async () => {
    const result = await service.findOne('uuid-123');
    expect(repository.findOneBy).toHaveBeenCalledWith({ id: 'uuid-123' });
    expect(result).toEqual(mockProperty);
  });

  it('should throw NotFoundException if property does not exist', async () => {
    repository.findOneBy.mockResolvedValueOnce(null);
    await expect(service.findOne('invalid-id')).rejects.toThrow(NotFoundException);
  });

  it('should update a property', async () => {
    const result = await service.update('uuid-123', updateDto);
    expect(repository.update).toHaveBeenCalledWith('uuid-123', updateDto);
    expect(result).toEqual(mockProperty);
  });

  it('should delete a property', async () => {
    const result = await service.remove('uuid-123');
    expect(repository.delete).toHaveBeenCalledWith('uuid-123');
    expect(result).toEqual({ message: 'Deleted successfully' });
  });
});
