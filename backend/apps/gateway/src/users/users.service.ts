import {
  CreateUserDto,
  PaginationSearchI,
  UpdateUserDto,
  User,
} from '@app/share';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(@Inject('AUTH_SERVICE') private client: ClientProxy) {}

  create(createItemDto: CreateUserDto) {
    return this.client.send('createUser', createItemDto);
  }

  findAll(query: PaginationSearchI<User>) {
    return this.client.send('findAllUsers', query);
  }

  findOne(id: number) {
    return this.client.send('findOneUser', id);
  }

  findOneByEmail(email: string): Observable<User> {
    return this.client.send<User>('findOneUserByEmail', email);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.client.send('updateUser', { id, updateUserDto });
  }

  remove(id: number) {
    return this.client.send('removeUser', id);
  }
}
