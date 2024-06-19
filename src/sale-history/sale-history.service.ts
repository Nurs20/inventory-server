import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateSaleHistoryDto } from './dto/create-sale-history.dto';
import { UpdateSaleHistoryDto } from './dto/update-sale-history.dto';
import { SaleHistory } from './entities/sale-history.entity';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class SaleHistoryService {
  constructor(
    @InjectRepository(SaleHistory)
    private readonly saleHistoryRepository: Repository<SaleHistory>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createSaleHistoryDto: CreateSaleHistoryDto) {
    const sale = await this.saleHistoryRepository.find({});
    if (!sale) throw new NotFoundException('Somithin went wrong...');
    const product = await this.productRepository.findOne({
      where: { id: +createSaleHistoryDto.product },
    });
    if (!product) throw new NotFoundException('Такого продукта нет!');

    if(product.amount < createSaleHistoryDto.sale_amount) {
      return new BadRequestException('Не хвататет кол-ва продуктов для покупки!');
    }
    product.amount -= createSaleHistoryDto.sale_amount
    await this.productRepository.save(product);

    const newSale = {
      date: createSaleHistoryDto.date,
      sale_amount: createSaleHistoryDto.sale_amount,
      product: createSaleHistoryDto.product,
    };
    return await this.saleHistoryRepository.save(newSale);
  }

  async findAll() {
    const sale = await this.saleHistoryRepository.find({
      relations: { product: true },
    });
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

  async remove(id: number) {
    const sale = await this.saleHistoryRepository.findOne({
      where: { id: id },
    });
    if (!sale) throw new NotFoundException('Такой истории закупки нет!');
    return await this.saleHistoryRepository.delete(id);
  }
}
