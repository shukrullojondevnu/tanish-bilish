import { Module } from '@nestjs/common';
import { InfoController } from './info.controller';
import { InfoService } from './info.service';
import { InterestsModule } from './interests/interests.module';

@Module({
  imports: [InterestsModule],
  controllers: [InfoController],
  providers: [InfoService],
})
export class InfoModule {}
