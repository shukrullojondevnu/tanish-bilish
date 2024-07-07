import { Injectable } from '@nestjs/common';
import {
  CreateUserDto,
  findAllItems,
  PaginationSearchI,
  UpdateUserDto,
  User,
} from '@app/share';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  async create(createItemDto: CreateUserDto): Promise<User> {
    return this.repository.save(createItemDto);
  }

  async findAll(query: PaginationSearchI<User>): Promise<[User[], number]> {
    const { where, take, page } = query;

    return findAllItems(this.repository, where, take, page, true);
  }

  async findOne(id: number): Promise<User | null> {
    return this.repository.findOneBy({ id });
  }

  async update(id: number, updateItemDto: UpdateUserDto): Promise<User> {
    const role = await this.findOne(id);
    const updatedItem = { ...role, ...updateItemDto };
    return this.repository.save(updatedItem);
  }

  async remove(id: number) {
    return this.repository.delete(id);
  }
}
