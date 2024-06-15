import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from "typeorm";
import { CreateSaleHistoryDto } from './dto/create-sale-history.dto';
import { UpdateSaleHistoryDto } from './dto/update-sale-history.dto';
import { SaleHistory } from './entities/sale-history.entity';

@Injectable()
export class SaleHistoryService {

  constructor(
    @InjectRepository(SaleHistory) private readonly saleHistoryRepository: Repository<SaleHistory>
  ) { }

  create(createSaleHistoryDto: CreateSaleHistoryDto) {
    // const sale = await this.saleHistoryRepository.find({
    //   where: {id: createSaleHistoryDto.}
    // });
    return 'This action adds a new saleHistory';
  }

  async findAll() {
    const sale = await this.saleHistoryRepository.find();
    return sale;
  }

  async findOne(id: number) {
    // const sale = await this.saleHistoryRepository.find({
    //   where: {date: Date}
    // })
    return `This action returns a #${id} saleHistory`;
  }

  update(id: number, updateSaleHistoryDto: UpdateSaleHistoryDto) {
    return `This action updates a #${id} saleHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} saleHistory`;
  }
}
