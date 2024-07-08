import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Interest,
  CreateInterestDto,
  PaginationSearchI,
  UpdateInterestDto,
  findAllItems,
} from '@app/share';

@Injectable()
export class InterestsService {
  constructor(
    @InjectRepository(Interest) private repository: Repository<Interest>,
  ) {}

  async create(createItemDto: CreateInterestDto): Promise<Interest> {
    return this.repository.save(createItemDto);
  }

  async findAll(
    query: PaginationSearchI<Interest>,
  ): Promise<[Interest[], number]> {
    const { where, take, page } = query;

    return findAllItems(this.repository, where, take, page, true);
  }

  async findOne(id: number): Promise<Interest | null> {
    return this.repository.findOneBy({ id });
  }

  async update(
    id: number,
    updateItemDto: UpdateInterestDto,
  ): Promise<Interest> {
    const role = await this.findOne(id);
    const updatedItem = { ...role, updateItemDto };
    return await this.repository.save(updatedItem);
  }

  async remove(id: number) {
    return this.repository.delete(id);
  }
}
