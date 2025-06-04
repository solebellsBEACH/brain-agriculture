import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { Crop } from '../entities/crop.entity';
import { CropsService } from '../crops.service';
import { Property } from '../../properties/entities/property.entity';
import { mocks } from '../../database/mocks';
import { CreateCropDto } from '../dto/create-crop.dto';
import { UpdateCropDto } from '../dto/update-crop.dto';



describe('CropsService', () => {
  let service: CropsService;
  let repo: jest.Mocked<Repository<Crop>>;
  const mockProperty: Property = mocks.propertyMocks[0];

  const mockCrop = mocks.cropsMock[0]

  const createDto: CreateCropDto = {
    name: 'Milho',
    harvest_year: 2023,
    propertyId: mockProperty.id,
  }
  const updateDto: UpdateCropDto = { name: 'Corn' };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(Property),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOneBy: jest.fn().mockResolvedValue(mockProperty),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
        CropsService,
        {
          provide: getRepositoryToken(Crop),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOneBy: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },

      ],
    }).compile();

    service = module.get<CropsService>(CropsService);
    repo = module.get(getRepositoryToken(Crop));
  });

  it('should create a crop', async () => {
    repo.create.mockReturnValue(mockCrop);
    repo.save.mockResolvedValue(mockCrop);

    const result = await service.create(createDto);
    expect(repo.create).toHaveBeenCalledWith(createDto);
    expect(repo.save).toHaveBeenCalledWith(mockCrop);
    expect(result).toEqual(mockCrop);
  });

  it('should return all crops', async () => {
    repo.find.mockResolvedValue([mockCrop]);

    const result = await service.findAll();
    expect(repo.find).toHaveBeenCalled();
    expect(result).toEqual([mockCrop]);
  });

  it('should return one crop by ID', async () => {
    repo.findOneBy.mockResolvedValue(mockCrop);

    const result = await service.findOne('uuid-1');
    expect(repo.findOneBy).toHaveBeenCalledWith({ id: 'uuid-1' });
    expect(result).toEqual(mockCrop);
  });

  it('should throw if crop not found', async () => {
    repo.findOneBy.mockResolvedValue(null);

    await expect(service.findOne('bad-id')).rejects.toThrow(NotFoundException);
  });

  it('should update a crop', async () => {
    repo.findOneBy.mockResolvedValue(mockCrop);
    repo.update.mockResolvedValue({} as any);
    const updated = { ...mockCrop, ...updateDto };
    repo.findOneBy.mockResolvedValue(updated);

    const result = await service.update('uuid-1', updateDto);
    expect(repo.update).toHaveBeenCalledWith('uuid-1', updateDto);
    expect(result).toEqual(updated);
  });

  it('should delete a crop', async () => {
    repo.findOneBy.mockResolvedValue(mockCrop);
    repo.delete.mockResolvedValue({} as any);

    const result = await service.remove('uuid-1');
    expect(repo.delete).toHaveBeenCalledWith('uuid-1');
    expect(result).toEqual({ message: 'Deleted successfully' });
  });
});
