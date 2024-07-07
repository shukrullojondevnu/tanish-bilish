import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from '@app/share';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('signin')
  async signIn(@Payload() payload: CreateUserDto) {
    return await this.authService.signIn(payload);
  }

  @MessagePattern('signup')
  async signUp(@Payload() payload: CreateUserDto) {
    return await this.authService.signUp(payload);
  }
}
