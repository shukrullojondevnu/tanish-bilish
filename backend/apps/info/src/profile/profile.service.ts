import { Injectable } from '@nestjs/common';
import {
  CreateProfileDto,
  PaginationSearchI,
  Profile,
  UpdateProfileDto,
  findAllItems,
} from '@app/share';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile) private repository: Repository<Profile>,
  ) {}

  async create(createItemDto: CreateProfileDto): Promise<Profile> {
    return this.repository.save(createItemDto);
  }

  async findAll(
    query: PaginationSearchI<Profile>,
  ): Promise<[Profile[], number]> {
    const { where, take, page } = query;

    return findAllItems(this.repository, where, take, page, true);
  }

  async findOne(id: number): Promise<Profile | null> {
    return this.repository.findOneBy({ id });
  }

  async update(id: number, updateItemDto: UpdateProfileDto): Promise<Profile> {
    const role = await this.findOne(id);
    const updatedItem = { ...role, ...updateItemDto };
    return this.repository.save(updatedItem);
  }

  async remove(id: number) {
    return this.repository.delete(id);
  }
}
