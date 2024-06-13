import { Inject, Injectable } from '@nestjs/common';
import {
  CreateRoleDto,
  PaginationSearchI,
  Role,
  UpdateRoleDto,
} from '@app/share';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RolesService {
  constructor(@Inject('AUTH_SERVICE') private client: ClientProxy) {}

  create(createItemDto: CreateRoleDto) {
    return this.client.send('createRole', createItemDto);
  }

  findAll(query: PaginationSearchI<Role>) {
    return this.client.send('findAllRoles', query);
  }

  findOne(id: number) {
    return this.client.send('findOneRole', id);
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.client.send('updateRole', { id, updateRoleDto });
  }

  remove(id: number) {
    return this.client.send('removeRole', id);
  }
}
