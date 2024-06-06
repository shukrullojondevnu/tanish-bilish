import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  NatsContext,
  Payload,
} from '@nestjs/microservices';
import { RolesService } from './roles.service';
import { CreateRoleDto, UpdateRoleDto, PaginationSearchI } from '@app/share';
import { Role } from './entities/role.entity';

@Controller()
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @MessagePattern('createRole')
  create(@Payload() createRoleDto: CreateRoleDto, @Ctx() context: NatsContext) {
    console.log(context);
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
  update(@Payload() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(updateRoleDto.id, updateRoleDto);
  }

  @MessagePattern('removeRole')
  remove(@Payload() id: number) {
    return this.rolesService.remove(id);
  }
}
