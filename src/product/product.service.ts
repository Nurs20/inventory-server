import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) { }
  async create(createProductDto: CreateProductDto) {
    const product = await this.productsRepository.findOne({
      where: {name: createProductDto.name}
    });
    const newProduct = {
      name: createProductDto.name,
      amount: createProductDto.amount,
      price: createProductDto.price
    }
    return await this.productsRepository.save(newProduct);
  }

  async findAll() {
    const product = await this.productsRepository.find({
    });
    return product;
  }

  async findOne(id: number) {
    const product = await this.productsRepository.findOne({
      where: {id: id}
    });
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productsRepository.findOne({
      where: {id: id}
    })
    return await this.productsRepository.update(id, updateProductDto);
  }

  async remove (id: number) {
    const product = await this.productsRepository.findOne({
      where: {id: id}
    });
    return await this.productsRepository.delete(id);
  }
}
