import {
  Controller, Get, Post, Body, Param, Put, Delete, ParseUUIDPipe,
} from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly service: PropertiesService) { }

  @Post()
  create(@Body() dto: CreatePropertyDto) {
    const { total_area, vegetation_area, arable_area } = dto
    if (!(arable_area + vegetation_area <= total_area)) {
      return {
        status: 500,
        message: "Valores de área sao incopativeis"
      }
    } else {
      return this.service.create(dto);
    }

  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdatePropertyDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.service.remove(id);
  }
}
