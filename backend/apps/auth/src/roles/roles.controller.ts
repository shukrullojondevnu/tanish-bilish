import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
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
  create(@Payload() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @MessagePattern('findAllRoles')
  findAll(@Payload() query: PaginationSearchI<Role>) {
    return this.rolesService.findAll(query);
  }

  @MessagePattern('findOneRole')
  findOne(@Payload() id: number) {
    return this.rolesService.findOne(id);
  }

  @MessagePattern('updateRole')
  update(
    @Payload()
    { id, updateRoleDto }: { id: number; updateRoleDto: UpdateRoleDto },
  ) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @MessagePattern('removeRole')
  remove(@Payload() id: number) {
    return this.rolesService.remove(id);
  }
}
