import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateForecastDto } from './dto/create-forecast.dto';
import { UpdateForecastDto } from './dto/update-forecast.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Forecast } from './entities/forecast.entity';
import { Between, Repository } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
import { SaleHistory } from 'src/sale-history/entities/sale-history.entity';

@Injectable()
export class ForecastService {
  constructor(
    @InjectRepository(Forecast)
    private readonly forecastRepository: Repository<Forecast>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(SaleHistory)
    private readonly salehistoryRepository: Repository<SaleHistory>,
  ) {}

  async create(createForecastDto: CreateForecastDto) {
    const sale = await this.salehistoryRepository.findOne({
      where: { id: +createForecastDto.sale },
    });
    if (!sale) throw new NotFoundException('Такой закупки нет!');

    const product = await this.productRepository.findOne({
      where: { id: +createForecastDto.product },
    });
    if (!product) throw new NotFoundException('Такого продукта нет!');

    // Создаем копии исходной даты перед изменением
    const saleDate = new Date(createForecastDto.date);

    const yesterday = new Date(saleDate);
    yesterday.setDate(saleDate.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    const endOfYesterday = new Date(yesterday);
    endOfYesterday.setHours(23, 59, 59, 999);

    console.log('endOfYesterday = ', endOfYesterday);
    console.log('yesterday = ', yesterday);

    // Используем диапазон дат для поиска
    const saleAmountYesterday = await this.salehistoryRepository.find({
      where: {
        date: Between(yesterday, endOfYesterday),
      },
    });

    const forecast = await this.forecastRepository.findOne({
      where: { date: Between(yesterday, endOfYesterday) },
    });
    let forecastRes = null;
    let totalAmount = null;
    totalAmount = saleAmountYesterday.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.sale_amount;
    }, 0);

    console.log('totalAmount', totalAmount); // Output: 3
    if (!forecast) {
      forecastRes = totalAmount;
    } else {
      forecastRes = forecast.forecast_amount;
    }

    console.log('forecast = ', forecast);
    console.log('saleAmounYesterday = ', saleAmountYesterday);

    console.log(saleAmountYesterday ? totalAmount : 'No data for yesterday');

    const res = 0.5 * totalAmount + (1 - 0.5) * forecastRes;
    console.log('res', res);

    const newForecast = {
      date: createForecastDto.date,
      forecast_amount: res,
      product: createForecastDto.product,
      sale: createForecastDto.sale,
    };
    // return res;
    return await this.forecastRepository.save(newForecast);
  }

  async findAll() {
    const forecast = await this.forecastRepository.find({
      relations: { product: true, sale: true },
    });
    return forecast;
  }

  findOne(id: number) {
    return `This action returns a #${id} forecast`;
  }

  update(id: number, updateForecastDto: UpdateForecastDto) {
    return `This action updates a #${id} forecast`;
  }

  async remove(id: number) {
    const forecast = await this.forecastRepository.findOne({
      where: { id: id },
    });
    if (!forecast) throw new NotFoundException('Такой прогноз не существует!');
    return await this.forecastRepository.delete(id);
  }
}
