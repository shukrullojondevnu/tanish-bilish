import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Role,
  CreateRoleDto,
  PaginationSearchI,
  UpdateRoleDto,
  findAll,
} from '@app/share';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) private repository: Repository<Role>) {}

  async create(createItemDto: CreateRoleDto): Promise<Role> {
    return this.repository.save(createItemDto);
  }

  async findAll(query: PaginationSearchI<Role>): Promise<[Role[], number]> {
    const { where, take, page } = query;

    return findAll(this.repository, where, take, page);
  }

  async findOne(id: number): Promise<Role | null> {
    return this.repository.findOneBy({ id });
  }

  async update(id: number, updateItemDto: UpdateRoleDto): Promise<Role> {
    const role = await this.findOne(id);
    const updatedItem = { ...role, ...updateItemDto };
    return this.repository.save(updatedItem);
  }

  async remove(id: number) {
    return this.repository.delete(id);
  }
}
