import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ForecastService } from './forecast.service';
import { ForecastController } from './forecast.controller';
import { Forecast } from './entities/forecast.entity';
import { Product } from 'src/product/entities/product.entity';
import { SaleHistory } from 'src/sale-history/entities/sale-history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Forecast, Product, SaleHistory])
  ],
  controllers: [ForecastController],
  providers: [ForecastService],
})
export class ForecastModule { }
