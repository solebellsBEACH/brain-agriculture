import { Controller, Get } from '@nestjs/common';
import { InsightsService } from './insights.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Insights')
@Controller('insights')
export class InsightsController {
  constructor(private readonly insightsService: InsightsService) {}

  @Get()
  @ApiOperation({ summary: 'Retorna dados agregados para o dashboard' })
  @ApiResponse({
    status: 200,
    description: 'Dados de insights retornados com sucesso',
    schema: {
      example: {
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
      },
    },
  })
  async getDashboard() {
    return this.insightsService.getDashboard();
  }
}