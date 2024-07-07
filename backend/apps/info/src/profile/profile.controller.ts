import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { ProfileService } from './profile.service';
import {
  CreateProfileDto,
  PaginationSearchI,
  Profile,
  UpdateProfileDto,
} from '@app/share';

@Controller()
export class ProfileController {
  constructor(private readonly profilesService: ProfileService) {}

  @MessagePattern('createProfile')
  async create(@Payload() createProfileDto: CreateProfileDto) {
    const result = await this.profilesService.create(createProfileDto);
    if (!result) throw new RpcException('Bad request');
    return result;
  }

  @MessagePattern('findAllProfiles')
  async findAll(@Payload() query: PaginationSearchI<Profile>) {
    return this.profilesService.findAll(query);
  }

  @MessagePattern('findOneProfile')
  async findOne(@Payload() id: number) {
    const result = await this.profilesService.findOne(id);
    return result;
  }

  @MessagePattern('updateProfile')
  async update(
    @Payload()
    {
      id,
      updateProfileDto,
    }: {
      id: number;
      updateProfileDto: UpdateProfileDto;
    },
  ) {
    return this.profilesService.update(id, updateProfileDto);
  }

  @MessagePattern('removeProfile')
  async remove(@Payload() id: number) {
    return this.profilesService.remove(id);
  }
}
