import { Inject, Injectable } from '@nestjs/common';
import {
  CreateInterestDto,
  Interest,
  PaginationSearchI,
  UpdateInterestDto,
} from '@app/share';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class InterestsService {
  constructor(@Inject('INFO_SERVICE') private client: ClientProxy) {}

  create(createItemDto: CreateInterestDto) {
    return this.client.send('createInterest', createItemDto);
  }

  findAll(query: PaginationSearchI<Interest>) {
    return this.client.send('findAllInterests', query);
  }

  findOne(id: number) {
    return this.client.send('findOneInterest', id);
  }

  update(id: number, updateItemDto: UpdateInterestDto) {
    return `This action updates a #${id} interest`;
  }

  remove(id: number) {
    return `This action removes a #${id} interest`;
  }
}
