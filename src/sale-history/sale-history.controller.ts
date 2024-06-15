import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SaleHistoryService } from './sale-history.service';
import { CreateSaleHistoryDto } from './dto/create-sale-history.dto';
import { UpdateSaleHistoryDto } from './dto/update-sale-history.dto';

@Controller('sale-history')
export class SaleHistoryController {
  constructor(private readonly saleHistoryService: SaleHistoryService) {}

  @Post()
  create(@Body() createSaleHistoryDto: CreateSaleHistoryDto) {
    return this.saleHistoryService.create(createSaleHistoryDto);
  }

  @Get()
  findAll() {
    return this.saleHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saleHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaleHistoryDto: UpdateSaleHistoryDto) {
    return this.saleHistoryService.update(+id, updateSaleHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saleHistoryService.remove(+id);
  }
}
