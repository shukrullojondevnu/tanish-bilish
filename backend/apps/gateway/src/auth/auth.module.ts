import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { UsersService } from '../users/users.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({}),
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['nats://localhost:4222'],
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService],
})
export class AuthModule {}
