import { Module } from '@nestjs/common';
import { InfoController } from './info.controller';
import { InfoService } from './info.service';
import { InterestsModule } from './interests/interests.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interest, UserInterest } from '@app/share';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    InterestsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '2425',
      database: 'info',
      entities: [Interest, UserInterest],
      synchronize: true,
    }),
    ProfileModule,
  ],
  controllers: [InfoController],
  providers: [InfoService],
})
export class InfoModule {}
