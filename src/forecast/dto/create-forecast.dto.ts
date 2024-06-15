import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';
import { Product } from 'src/product/entities/product.entity';
import { SaleHistory } from 'src/sale-history/entities/sale-history.entity';

export class CreateForecastDto {
  @IsDateString()
  date: Date;

  @IsNumber()
  forecast_amount: number;

  @IsNotEmpty()
  product: Product

  @IsNotEmpty()
  sale: SaleHistory
}
