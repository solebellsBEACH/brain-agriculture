import { Test, TestingModule } from '@nestjs/testing';
import { PropertiesController } from '../properties.controller';
import { PropertiesService } from '../properties.service';
import { CreatePropertyDto } from '../dto/create-property.dto';
import { Property } from '../entities/property.entity';

describe('PropertiesController', () => {
  let controller: PropertiesController;
  let service: jest.Mocked<PropertiesService>;

  const mockProperty: Property = {
    id: 'uuid-123',
    name: 'Fazenda Teste',
    document: '999999999',
    city: 'Bauru',
    state: 'SP',
    createdAt: new Date(),
    total_area: 100,
    arable_area: 2,
    vegetation_area: 80,
    producer: {
      id: 'c1f4e6d2-45f9-4b6f-b4c3-f54452d8e1d73bb0a',
      name: 'João da Silva',
      document: '12345678900',
      properties: [],
    },
  };

  const createDto: CreatePropertyDto = {
    name: 'Fazenda Teste',
    document: '999999999',
    city: 'Bauru',
    state: 'SP',
    total_area: 100,
    arable_area: 2,
    vegetation_area: 80,
  };

  const updateDto = {
    name: 'Nova Fazenda',
    city: 'Campinas',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertiesController],
      providers: [
        {
          provide: PropertiesService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockProperty),
            findAll: jest.fn().mockResolvedValue([mockProperty]),
            findOne: jest.fn().mockResolvedValue(mockProperty),
            update: jest
              .fn()
              .mockResolvedValue({ ...mockProperty, ...updateDto }),
            remove: jest
              .fn()
              .mockResolvedValue({ message: 'Deleted successfully' }),
          },
        },
      ],
    }).compile();

    controller = module.get(PropertiesController);
    service = module.get(PropertiesService);
  });

  it('should create a property', async () => {
    const result = await controller.create(createDto);
    expect(service.create).toHaveBeenCalledWith(createDto);
    expect(result).toEqual(mockProperty);
  });

  it('should return all properties', async () => {
    const result = await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual([mockProperty]);
  });

  it('should return a property by ID', async () => {
    const result = await controller.findOne('uuid-123');
    expect(service.findOne).toHaveBeenCalledWith('uuid-123');
    expect(result).toEqual(mockProperty);
  });

  it('should update a property', async () => {
    const result = await controller.update('uuid-123', updateDto);
    expect(service.update).toHaveBeenCalledWith('uuid-123', updateDto);
    expect(result).toEqual({ ...mockProperty, ...updateDto });
  });

  it('should delete a property', async () => {
    const result = await controller.remove('uuid-123');
    expect(service.remove).toHaveBeenCalledWith('uuid-123');
    expect(result).toEqual({ message: 'Deleted successfully' });
  });
});
