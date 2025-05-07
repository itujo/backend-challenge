import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaProducerService } from './kafka-producer.service';

interface CorrectLessonMessage {
  value: {
    submissionId: string;
    repositoryUrl: string;
  };
}

interface CorrectLessonResponse {
  submissionId: string;
  repositoryUrl: string;
  grade: number;
  status: 'Pending' | 'Error' | 'Done';
}

@Controller()
export class AppController {
  constructor(private readonly kafkaProducer: KafkaProducerService) {}

  @MessagePattern('challenge.correction')
  async correctLesson(
    @Payload() message: CorrectLessonMessage,
  ): Promise<CorrectLessonResponse> {
    const { submissionId, repositoryUrl } = message.value;

    const result: CorrectLessonResponse = {
      submissionId,
      repositoryUrl,
      grade: Math.floor(Math.random() * 10) + 1,
      status: 'Done',
    };

    await this.kafkaProducer.emit('challenge.correction.result', result);

    return result;
  }
}
