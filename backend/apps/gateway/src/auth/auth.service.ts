import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '@app/share';
import { JwtService } from '@nestjs/jwt';
import * as bcryp from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user: User = await this.usersService
      .findOneByEmail(email)
      .toPromise();
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    const passwordMatch = bcryp.compareSync(password, user.passwordHash);
    if (!passwordMatch)
      throw new HttpException('Wrong password', HttpStatus.FORBIDDEN);
    return user;
  }

  async signin(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup() {}
}
