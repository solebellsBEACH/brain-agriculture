import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { ProducersService } from '../producers.service';
import { Producer } from '../entities/producer.entity';
import { CreateProducerDto } from '../dto/create-producer.dto';

describe('ProducersService', () => {
  let service: ProducersService;
  let repository: jest.Mocked<Repository<Producer>>;

  const mockProducer: Producer = {
    id: 'c1f4e6d2-45f9-4b6f-b4c3-f54452d8e1d73bb0a',
    name: 'João da Silva',
    document: '12345678900',
    properties: [],
  };

  const createDto: CreateProducerDto = {
    name: 'Mario da Silva',
    document: '12345678900',
  };

  const updateDto = {
    name: 'Mario da Silva Edited',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProducersService,
        {
          provide: getRepositoryToken(Producer),
          useValue: {
            create: jest.fn().mockImplementation((dto) => ({ ...dto })),
            save: jest
              .fn()
              .mockImplementation((dto) => ({ id: 'uuid-123', ...dto })),
            find: jest.fn().mockResolvedValue([mockProducer]),
            findOneBy: jest.fn().mockResolvedValue(mockProducer),
            findOne: jest.fn().mockResolvedValue(mockProducer),
            update: jest.fn().mockResolvedValue(undefined),
            delete: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    service = module.get(ProducersService);
    repository = module.get(getRepositoryToken(Producer));
  });

  it('should create a producer', async () => {
    const result = await service.create(createDto);
    expect(repository.create).toHaveBeenCalledWith(createDto);
    expect(repository.save).toHaveBeenCalledWith({ ...createDto });
    expect(result).toEqual(expect.objectContaining(createDto));
  });

  it.skip('should return all producers', async () => {
    const result = await service.findAll();
    expect(repository.find).toHaveBeenCalled();
    expect(result).toEqual([mockProducer]);
  });

  it('should return one producer by id', async () => {
    const result = await service.findOne('uuid-123');
    expect(repository.findOne).toHaveBeenCalled();
    expect(result).toEqual(mockProducer);
  });

  it('should throw NotFoundException if producer does not exist', async () => {
    repository.findOne.mockResolvedValueOnce(null);
    await expect(service.findOne('invalid-id')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should update a producer', async () => {
    const result = await service.update('uuid-123', updateDto);
    expect(repository.update).toHaveBeenCalledWith('uuid-123', updateDto);
    expect(result).toEqual(mockProducer);
  });

  it('should delete a producer', async () => {
    const result = await service.remove('uuid-123');
    expect(repository.delete).toHaveBeenCalledWith('uuid-123');
    expect(result).toEqual({ message: 'Deleted successfully' });
  });
});
