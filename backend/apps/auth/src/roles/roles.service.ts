import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import {
  Role,
  CreateRoleDto,
  PaginationSearchI,
  PaginationI,
  UpdateRoleDto,
} from '@app/share';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) private repository: Repository<Role>) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    return this.repository.save(createRoleDto);
  }

  async findAll(query: PaginationSearchI<Role>): Promise<PaginationI<Role[]>> {
    const { where, skip, take, page } = query;
    const data = await this.repository.find({
      where,
      take,
      skip,
    });
    return {
      page,
      take,
      skip,
      data,
    };
  }

  async findOne(id: number): Promise<Role | null> {
    return this.repository.findOneBy({ id });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.findOne(id);
    const updatedRole = { ...role, updateRoleDto };
    return this.repository.save(updatedRole);
  }

  async remove(id: number) {
    return this.repository.delete(id);
  }
}
