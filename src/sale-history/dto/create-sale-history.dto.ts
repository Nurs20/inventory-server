import { IsDateString, IsNumber } from 'class-validator';

export class CreateSaleHistoryDto {
    @IsDateString()
    date: string;

    @IsNumber()
    sale_amount: number;
}
