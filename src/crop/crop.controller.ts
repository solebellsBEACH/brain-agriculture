import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { CreateCropDto } from './dto/create-crop.dto';
import { CropsService } from './crops.service';
import { UpdateCropDto } from './dto/update-crop.dto';
import { ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

@Controller('crops')
export class CropsController {
  constructor(private readonly service: CropsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new crop' })
  @ApiResponse({ status: 201, description: 'Crop created successfully' })
  @ApiResponse({ status: 404, description: 'Property not found' })
  create(@Body() dto: CreateCropDto) {
    return this.service.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a crop by ID' })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateCropDto,
  ) {
    return this.service.update(id, dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all crops with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.service.findAll(Number(page), Number(limit));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get crop by ID' })
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a crop by ID' })
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.remove(id);
  }
}
