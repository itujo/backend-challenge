import { Controller, Logger } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { AnswerService } from "./answer.service";
import { AnswerStatus } from "@domain/answer/answer.entity";

export interface CorrectLessonResponse {
  submissionId: string;
  repositoryUrl: string;
  grade: number;
  status: AnswerStatus;
}

@Controller()
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}
  private readonly logger = new Logger(AnswerController.name);

  @MessagePattern("challenge.correction.result")
  async handleCorrectionResult(@Payload() message: CorrectLessonResponse) {
    const { submissionId, repositoryUrl, grade, status } = message;

    this.logger.log(`Received correction result for ${submissionId}:`);
    this.logger.log(
      `Status: ${status}, Grade: ${grade}, Repo: ${repositoryUrl}`,
    );

    await this.answerService.updateSubmission({
      grade,
      repositoryUrl,
      status,
      submissionId,
    });

    this.logger.log(`Updated submission`);
  }
}
