import { Module } from '@nestjs/common';
import { InfoController } from './info.controller';
import { InfoService } from './info.service';
import { InterestsModule } from './interests/interests.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interest, UserInterest } from '@app/share';
import { ProfileModule } from './profile/profile.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    InterestsModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.INFO_ORM_HOST,
      port: Number(process.env.INFO_ORM_PORT),
      username: process.env.INFO_ORM_USERNAME,
      password: process.env.INFO_ORM_PASSWORD,
      database: process.env.INFO_ORM_DATABASE,
      entities: [Interest, UserInterest],
      synchronize: true,
    }),
    ProfileModule,
  ],
  controllers: [InfoController],
  providers: [InfoService],
})
export class InfoModule {}
