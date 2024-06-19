import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SaleHistoryService } from './sale-history.service';
import { SaleHistoryController } from './sale-history.controller';
import { SaleHistory } from './entities/sale-history.entity';
import { Product } from 'src/product/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SaleHistory, Product])
  ],
  controllers: [SaleHistoryController],
  providers: [SaleHistoryService],
})
export class SaleHistoryModule {}
