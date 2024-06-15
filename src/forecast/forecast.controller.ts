import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ForecastService } from './forecast.service';
import { CreateForecastDto } from './dto/create-forecast.dto';
import { UpdateForecastDto } from './dto/update-forecast.dto';

@Controller('forecast')
export class ForecastController {
  constructor(private readonly forecastService: ForecastService) {}

  @Post()
  create(@Body() createForecastDto: CreateForecastDto) {
    return this.forecastService.create(createForecastDto);
  }

  @Get()
  findAll() {
    return this.forecastService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.forecastService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateForecastDto: UpdateForecastDto) {
    return this.forecastService.update(+id, updateForecastDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.forecastService.remove(+id);
  }
}
