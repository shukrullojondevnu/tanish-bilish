import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { UsersService } from './users.service';
import {
  CreateUserDto,
  PaginationSearchI,
  UpdateUserDto,
  User,
} from '@app/share';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('createUser')
  async create(@Payload() createUserDto: CreateUserDto) {
    const result = await this.usersService.create(createUserDto);
    if (!result) throw new RpcException('Bad request');
    return result;
  }

  @MessagePattern('findAllUsers')
  async findAll(@Payload() query: PaginationSearchI<User>) {
    return this.usersService.findAll(query);
  }

  @MessagePattern('findOneUser')
  async findOne(@Payload() id: number) {
    const result = await this.usersService.findOne(id);
    return result;
  }

  @MessagePattern('updateUser')
  async update(
    @Payload()
    { id, updateUserDto }: { id: number; updateUserDto: UpdateUserDto },
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @MessagePattern('removeUser')
  async remove(@Payload() id: number) {
    return this.usersService.remove(id);
  }
}
