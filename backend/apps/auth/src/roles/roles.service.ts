import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  MoreThan,
  LessThan,
  MoreThanOrEqual,
  LessThanOrEqual,
  Equal,
  Not,
  In,
  Like,
  ILike,
  Between,
  IsNull,
  And,
} from 'typeorm';
import {
  Role,
  CreateRoleDto,
  PaginationSearchI,
  UpdateRoleDto,
} from '@app/share';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(Role) private repository: Repository<Role>) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    return this.repository.save(createRoleDto);
  }

  async findAll(query: PaginationSearchI<Role>): Promise<[Role[], number]> {
    const { where, take, page } = query;

    //Pagination values
    const t = take || 10;
    const p = page || 1;
    const s = (p - 1) * t;

    const findConditions = {};

    // * Filter for get by find operators
    if (where) {
      for (const [k1, v1] of Object.entries(JSON.parse(String(where)))) {
        for (const [k2, v2] of Object.entries(v1)) {
          findConditions[String(k1)] = convertOperator(k2, v2);
        }
      }
    }
    console.log(findConditions);

    const result = await this.repository.findAndCount({
      where: findConditions,
      take: t,
      skip: s,
    });
    return result;
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

function convertOperator(oper: string, value: any) {
  switch (oper) {
    case 'eq':
      return Equal(value);
    case 'neq':
      return Not(Equal(value));
    case 'lt':
      return LessThan(value);
    case 'lte':
      return LessThanOrEqual(value);
    case 'gt':
      return MoreThan(value);
    case 'gte':
      return MoreThanOrEqual(value);
    case 'in':
      return In(value);
    case 'nin':
      return Not(In(value));
    case 'null':
      return IsNull();
    case 'nnull':
      return Not(IsNull());
    case 'contains':
      return Like(`%${value}%`);
    case 'icontains':
      return ILike(`%${value}%`);
    case 'ncontains':
      return Not(Like(`%${value}%`));
    case 'starts_with':
      return Like(`${value}%`);
    case 'istarts_with':
      return ILike(`${value}%`);
    case 'nstarts_with':
      return Not(Like(`${value}%`));
    case 'nistarts_with':
      return Not(ILike(`${value}%`));
    case 'ends_with':
      return Like(`%${value}`);
    case 'iends_with':
      return ILike(`%${value}`);
    case 'nends_with':
      return Not(Like(`%${value}`));
    case 'niends_with':
      return Not(ILike(`%${value}`));
    case 'between':
      return Between(value[0], value[1]);
    case 'nbetween':
      return Not(Between(value[0], value[1]));
    case 'empty':
      return Equal('');
    case 'nempty':
      return Not(Equal(''));
    default:
      break;
  }
}
