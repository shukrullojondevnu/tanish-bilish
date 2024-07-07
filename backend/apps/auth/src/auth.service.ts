import { CreateUserDto } from '@app/share';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async signIn(payload: CreateUserDto) {}

  async signUp(payload: CreateUserDto) {}
}
