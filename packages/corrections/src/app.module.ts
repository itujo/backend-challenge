import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { KafkaProducerService } from './kafka-producer.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [KafkaProducerService],
})
export class AppModule {}
