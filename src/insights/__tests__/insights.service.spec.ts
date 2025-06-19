import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Producer } from '../../producers/entities/producer.entity';
import { Repository } from 'typeorm';
import { InsightsService } from '../insights.service';
import { Property } from '../../properties/entities/property.entity';
import { Crop } from '../../crop/entities/crop.entity';

describe('InsightsService', () => {
  let service: InsightsService;
  let producerRepo: jest.Mocked<Repository<Producer>>;
  let propertyRepo: jest.Mocked<Repository<Property>>;
  let cropRepo: jest.Mocked<Repository<Crop>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InsightsService,
        {
          provide: getRepositoryToken(Producer),
          useValue: {
            count: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Property),
          useValue: {
            find: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Crop),
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<InsightsService>(InsightsService);
    producerRepo = module.get(getRepositoryToken(Producer));
    propertyRepo = module.get(getRepositoryToken(Property));
    cropRepo = module.get(getRepositoryToken(Crop));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getDashboard', () => {
    it('should return dashboard insights correctly', async () => {
      producerRepo.count.mockResolvedValue(2);

      propertyRepo.find.mockResolvedValue([
        {
          total_area: 100,
          arable_area: 60,
          vegetation_area: 30,
          state: 'SP',
        },
        {
          total_area: 200,
          arable_area: 150,
          vegetation_area: 40,
          state: 'MG',
        },
      ] as Property[]);

      cropRepo.find.mockResolvedValue([
        { name: 'Soja' },
        { name: 'Milho' },
        { name: 'Soja' },
      ] as Crop[]);

      const result = await service.getDashboard();

      expect(result.totalFarms).toBe(2);
      expect(result.totalHectares).toBe(300);
      expect(result.byState).toEqual([
        { name: 'SP', value: 1 },
        { name: 'MG', value: 1 },
      ]);
      expect(result.byCrop).toEqual([
        { name: 'Soja', value: 2 },
        { name: 'Milho', value: 1 },
      ]);
      expect(result.landUse).toEqual([
        { name: 'Agricultável', value: 210 },
        { name: 'Vegetação', value: 70 },
      ]);
    });
  });
});
