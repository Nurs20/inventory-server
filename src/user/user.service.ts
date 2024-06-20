import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  NotFoundException,
  BadRequestException,
} from '@nestjs/common/exceptions';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOne({
      where: { login: createUserDto.login },
    });
    if (user)
      throw new BadRequestException('Такой пользователь уже существует!');
    const newUser = {
      login: createUserDto.login,
      password: createUserDto.password,
    };
    return await this.userRepository.save(newUser);
  }

  async findAll() {
    const user = await this.userRepository.find({});
    if (!user) throw new NotFoundException('Такого пользователя нет!');
    return user;
  }

  async login(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOne({
      where: { login: createUserDto.login, password: createUserDto.password },
    });
    if (!user) throw new BadRequestException('Такого пользователь не зареган!');
    return user;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
