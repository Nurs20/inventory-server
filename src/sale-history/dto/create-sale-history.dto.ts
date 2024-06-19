import { IsDateString, IsNumber, IsOptional } from 'class-validator';
import { Forecast } from 'src/forecast/entities/forecast.entity';
import { Product } from 'src/product/entities/product.entity';

export class CreateSaleHistoryDto {
    @IsDateString()
    date: string;

    @IsNumber()
    sale_amount: number;

    @IsOptional()
    product: Product

    @IsOptional()
    forecast: Forecast
}
