import { Test, TestingModule } from '@nestjs/testing';
import { InsightsController } from '../insights.controller';
import { InsightsService } from '../insights.service';

describe('InsightsController', () => {
  let controller: InsightsController;
  let service: InsightsService;

  const mockInsights = {
    totalFarms: 3,
    totalHectares: 450,
    byState: [
      { name: 'SP', value: 1 },
      { name: 'MG', value: 2 },
    ],
    byCrop: [
      { name: 'Soja', value: 2 },
      { name: 'Milho', value: 1 },
    ],
    landUse: [
      { name: 'Agricultável', value: 300 },
      { name: 'Vegetação', value: 150 },
    ],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InsightsController],
      providers: [
        {
          provide: InsightsService,
          useValue: {
            getDashboard: jest.fn().mockResolvedValue(mockInsights),
          },
        },
      ],
    }).compile();

    controller = module.get<InsightsController>(InsightsController);
    service = module.get<InsightsService>(InsightsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return dashboard data', async () => {
    const result = await controller.getDashboard();
    expect(result).toEqual(mockInsights);
    expect(service.getDashboard).toHaveBeenCalled();
  });
});
