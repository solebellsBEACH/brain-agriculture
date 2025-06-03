import { Test, TestingModule } from '@nestjs/testing';
import { ProducersController } from '../producers.controller';
import { ProducersService } from '../producers.service';
import { CreateProducerDto } from '../dto/create-producer.dto';
import { UpdateProducerDto } from '../dto/update-producer.dto';
import { Producer } from '../entities/producer.entity';

describe('ProducersController', () => {
  let controller: ProducersController;
  let service: jest.Mocked<ProducersService>;

  const mockProducer: Producer = {
    id: 'uuid-abc',
    name: 'José da Silva',
    document: '12345678900',
    properties: [],
  };

  const createDto: CreateProducerDto = {
    name: 'José da Silva',
    document: '12345678900',
  };

  const updateDto: UpdateProducerDto = {
    name: 'João Atualizado',
    document: '99999999999',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProducersController],
      providers: [
        {
          provide: ProducersService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockProducer),
            findAll: jest.fn().mockResolvedValue([mockProducer]),
            findOne: jest.fn().mockResolvedValue(mockProducer),
            update: jest
              .fn()
              .mockResolvedValue({ ...mockProducer, ...updateDto }),
            remove: jest
              .fn()
              .mockResolvedValue({ message: 'Deleted successfully' }),
          },
        },
      ],
    }).compile();

    controller = module.get(ProducersController);
    service = module.get(ProducersService);
  });

  it('should create a producer', async () => {
    const result = await controller.create(createDto);
    expect(service.create).toHaveBeenCalledWith(createDto);
    expect(result).toEqual(mockProducer);
  });

  it('should return all producers', async () => {
    const result = await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual([mockProducer]);
  });

  it('should return a producer by ID', async () => {
    const result = await controller.findOne('uuid-abc');
    expect(service.findOne).toHaveBeenCalledWith('uuid-abc');
    expect(result).toEqual(mockProducer);
  });

  it('should update a producer', async () => {
    const result = await controller.update('uuid-abc', updateDto);
    expect(service.update).toHaveBeenCalledWith('uuid-abc', updateDto);
    expect(result).toEqual({ ...mockProducer, ...updateDto });
  });

  it('should delete a producer', async () => {
    const result = await controller.remove('uuid-abc');
    expect(service.remove).toHaveBeenCalledWith('uuid-abc');
    expect(result).toEqual({ message: 'Deleted successfully' });
  });
});
