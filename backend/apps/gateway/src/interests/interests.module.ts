import { Module } from '@nestjs/common';
import { InterestsService } from './interests.service';
import { InterestsController } from './interests.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'INFO_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['nats://localhost:4222'],
        },
      },
    ]),
  ],
  controllers: [InterestsController],
  providers: [InterestsService],
})
export class InterestsModule {}
