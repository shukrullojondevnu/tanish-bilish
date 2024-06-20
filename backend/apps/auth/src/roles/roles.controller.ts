import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { RolesService } from './roles.service';
import {
  CreateRoleDto,
  UpdateRoleDto,
  PaginationSearchI,
  Role,
} from '@app/share';

@Controller()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @MessagePattern('createRole')
  async create(@Payload() createRoleDto: CreateRoleDto) {
    const result = await this.rolesService.create(createRoleDto);
    if (!result) throw new RpcException('Bad request');
    return result;
  }

  @MessagePattern('findAllRoles')
  async findAll(@Payload() query: PaginationSearchI<Role>) {
    return this.rolesService.findAll(query);
  }

  @MessagePattern('findOneRole')
  async findOne(@Payload() id: number) {
    const result = await this.rolesService.findOne(id);
    return result;
  }

  @MessagePattern('updateRole')
  async update(
    @Payload()
    { id, updateRoleDto }: { id: number; updateRoleDto: UpdateRoleDto },
  ) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @MessagePattern('removeRole')
  async remove(@Payload() id: number) {
    return this.rolesService.remove(id);
  }
}
