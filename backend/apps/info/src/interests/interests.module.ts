import { Module } from '@nestjs/common';
import { InterestsService } from './interests.service';
import { InterestsController } from './interests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Interest, UserInterest } from '@app/share';

@Module({
  imports: [TypeOrmModule.forFeature([Interest, UserInterest])],
  controllers: [InterestsController],
  providers: [InterestsService],
})
export class InterestsModule {}
