import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';

@Injectable()
export class KafkaProducerService implements OnModuleInit, OnModuleDestroy {
  private kafka: Kafka;
  private producer: Producer;

  async onModuleInit() {
    this.kafka = new Kafka({
      clientId: 'challenge-producer',
      brokers: ['localhost:9092'],
    });

    this.producer = this.kafka.producer();
    await this.producer.connect();
  }

  async emit(topic: string, value: any) {
    await this.producer.send({
      topic,
      messages: [
        {
          value: JSON.stringify(value),
        },
      ],
    });
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
  }
}
