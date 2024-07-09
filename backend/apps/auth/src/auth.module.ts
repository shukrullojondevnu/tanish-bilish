import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from './roles/roles.module';
import { User, Role } from '@app/share';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.AUTH_ORM_HOST,
      port: Number(process.env.AUTH_ORM_PORT),
      username: process.env.AUTH_ORM_USERNAME,
      password: process.env.AUTH_ORM_PASSWORD,
      database: process.env.AUTH_ORM_DATABASE,
      entities: [User, Role],
      synchronize: true,
    }),
    RolesModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
