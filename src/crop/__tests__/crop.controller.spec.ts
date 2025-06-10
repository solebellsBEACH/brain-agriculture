import { Test, TestingModule } from '@nestjs/testing';
import { CropsController } from '../crop.controller';
import { CropsService } from '../crops.service';
import { CreateCropDto } from '../dto/create-crop.dto';
import { Crop } from '../entities/crop.entity';
import { UpdateCropDto } from '../dto/update-crop.dto';
import { mocks } from '../../database/mocks';

const mockCrop = mocks.cropsMock.findAll()

describe('CropsController', () => {
  let controller: CropsController;
  let service: jest.Mocked<CropsService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CropsController],
      providers: [
        {
          provide: CropsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
            findAndCount: jest.fn().mockImplementation(() => [[], 10])
          },
        },
      ],
    }).compile();

    controller = module.get(CropsController);
    service = module.get(CropsService);
  });

  it('should create a crop', async () => {
    const dto: CreateCropDto = {
      name: 'Soybean',
      harvest_year: 2025,
      propertyId: 'property-uuid',
      utilization_percentage: 10.4,
      value_per_unit: 40.5,
      value_growth: 10.354
    };

    service.create.mockResolvedValue(mockCrop.data[0]);

    const result = await controller.create(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual({
      id: '4f1a33f1-f4d9-40eb-8408-7c7627772f49',
      name: 'Milho',
      harvest_year: 2023,
      value_per_unit: 80.5,
      utilization_percentage: 90.2,
      expected_yield: 3.5,
      value_growth: 10.354,
      property: undefined
    });
  });

  it('should return all crops', async () => {
    service.findAll.mockResolvedValue(mockCrop);

    const result = await controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual(mockCrop);
  });

  it('should return a single crop by ID', async () => {
    service.findOne.mockResolvedValue(mockCrop.data[0]);

    const result = await controller.findOne('crop-uuid');
    expect(service.findOne).toHaveBeenCalledWith('crop-uuid');
    expect(result).toEqual(mockCrop.data[0]);
  });

  it('should update a crop', async () => {
    const updateDto: UpdateCropDto = { name: 'Corn' };
    const updatedCrop = { ...mockCrop.data[0], ...updateDto };

    service.update.mockResolvedValue(updatedCrop);

    const result = await controller.update('crop-uuid', updateDto);
    expect(service.update).toHaveBeenCalledWith('crop-uuid', updateDto);
    expect(result).toEqual(updatedCrop);
  });

  it('should delete a crop', async () => {
    const deleteResponse = { message: 'Deleted successfully' };

    service.remove.mockResolvedValue(deleteResponse);

    const result = await controller.remove('crop-uuid');
    expect(service.remove).toHaveBeenCalledWith('crop-uuid');
    expect(result).toEqual(deleteResponse);
  });
});
