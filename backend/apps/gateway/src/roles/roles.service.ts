import { Inject, Injectable } from '@nestjs/common';
import { CreateRoleDto, UpdateRoleDto } from '@app/share';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RolesService {
  constructor(@Inject('AUTH_SERVICE') private client: ClientProxy) {}

  create(createRoleDto: CreateRoleDto) {
    return this.client.send('createRole', createRoleDto);
  }

  findAll() {
    return `This action returns all roles`;
  }

  findOne(id: number) {
    return this.client.send('findOneRole', id);
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
