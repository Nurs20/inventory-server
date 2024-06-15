import { PartialType } from '@nestjs/mapped-types';
import { CreateSaleHistoryDto } from './create-sale-history.dto';

export class UpdateSaleHistoryDto extends PartialType(CreateSaleHistoryDto) {}
