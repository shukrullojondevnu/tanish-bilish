import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { InterestsService } from './interests.service';
import {
  CreateInterestDto,
  Interest,
  PaginationSearchI,
  UpdateInterestDto,
} from '@app/share';

@Controller()
export class InterestsController {
  constructor(private readonly interestsService: InterestsService) {}

  @MessagePattern('createInterest')
  create(@Payload() createInterestDto: CreateInterestDto) {
    return this.interestsService.create(createInterestDto);
  }

  @MessagePattern('findAllInterests')
  findAll(@Payload() query: PaginationSearchI<Interest>) {
    return this.interestsService.findAll(query);
  }

  @MessagePattern('findOneInterest')
  findOne(@Payload() id: number) {
    return this.interestsService.findOne(id);
  }

  @MessagePattern('updateInterest')
  update(@Payload() updateInterestDto: UpdateInterestDto) {
    return this.interestsService.update(
      updateInterestDto.id,
      updateInterestDto,
    );
  }

  @MessagePattern('removeInterest')
  remove(@Payload() id: number) {
    return this.interestsService.remove(id);
  }
}
