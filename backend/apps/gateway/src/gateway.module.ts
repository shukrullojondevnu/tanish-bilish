import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { InterestsModule } from './interests/interests.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    RolesModule,
    ConfigModule.forRoot(),
    AuthModule,
    InterestsModule,
    UsersModule,
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
