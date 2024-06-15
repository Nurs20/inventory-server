import { Injectable } from '@nestjs/common';
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
    @InjectRepository(Forecast) private readonly forecastRepository: Repository<Forecast>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    @InjectRepository(SaleHistory) private readonly salehistoryRepository: Repository<SaleHistory>,
  ) { }

  async create(createForecastDto: CreateForecastDto) {

    const sale = await this.salehistoryRepository.findOne({
      where: { id: +createForecastDto.sale }
    });

    // Создаем копии исходной даты перед изменением
    const saleDate = new Date(createForecastDto.date);

    const yesterday = new Date(saleDate);
    yesterday.setDate(saleDate.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    const endOfYesterday = new Date(yesterday);
    endOfYesterday.setHours(23, 59, 59, 999);

    console.log(endOfYesterday);

    // Используем диапазон дат для поиска
    const saleAmountYesterday = await this.salehistoryRepository.findOne({
      where: {
        date: Between(yesterday, endOfYesterday)
      }
    });

    const forecast = await this.forecastRepository.findOne({
      where: { date: Between(yesterday, endOfYesterday) }
    })
    let forecastRes = null;
    if (!forecast) {
      forecastRes = saleAmountYesterday.sale_amount
    } else {
      forecastRes = forecast.forecast_amount
    }

    console.log(forecast);

    console.log(saleAmountYesterday ? saleAmountYesterday.sale_amount : 'No data for yesterday');

    const res = 0.5 * saleAmountYesterday.sale_amount + (1 - 0.5) * forecastRes;
    const newForecast = {
      date: createForecastDto.date,
      forecast_amount: res,
      product: createForecastDto.product,
      sale: createForecastDto.sale
    }
    // return res;
    return await this.forecastRepository.save(newForecast);
  }

  async findAll() {
    const forecast = await this.forecastRepository.find();
    return forecast;
  }

  findOne(id: number) {
    return `This action returns a #${id} forecast`;
  }

  update(id: number, updateForecastDto: UpdateForecastDto) {
    return `This action updates a #${id} forecast`;
  }

  remove(id: number) {
    return `This action removes a #${id} forecast`;
  }
}
