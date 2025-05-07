import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import type { PaginationInput } from "@domain/shared/pagination.interface";
import {
  AnswerRepository,
  type AnswerFilters,
  type IAnswerRepository,
} from "@domain/answer/answer.repository";
import type { CreateAnswerInput } from "@infra/graphql/answer/dtos/create-answer.input";
import { Answer, AnswerStatus } from "@domain/answer/answer.entity";
import {
  ChallengeRepository,
  type IChallengeRepository,
} from "@domain/challenge/challenge.repository";
import { KafkaProducerService } from "@infra/kafka/kafka.service";
import { CorrectLessonResponse } from "./answer.controller";

@Injectable()
export class AnswerService {
  constructor(
    @Inject(AnswerRepository)
    private readonly answerRepository: IAnswerRepository,
    @Inject(ChallengeRepository)
    private readonly challengeRepository: IChallengeRepository,
    private readonly kafka: KafkaProducerService,
  ) {}

  async create(data: CreateAnswerInput): Promise<Answer> {
    const isValidGithubUrl =
      /^https:\/\/github\.com\/[\w.-]+\/[\w.-]+\/?$/.test(data.repositoryUrl);

    const challenge = await this.challengeRepository.findById(data.challengeId);

    const isValidChallenge = !!challenge;

    const status =
      isValidChallenge && isValidGithubUrl
        ? AnswerStatus.Pending
        : AnswerStatus.Error;

    const answer = await this.answerRepository.createAnswer(
      {
        ...data,
        challengeId: isValidChallenge ? challenge.id : null,
      },
      status,
    );

    if (!isValidGithubUrl) {
      throw new BadRequestException(`Invalid GitHub repository URL.`);
    }

    if (!isValidChallenge) {
      throw new BadRequestException(
        `Challenge with id ${data.challengeId} not found.`,
      );
    }

    if (answer.id && isValidChallenge && isValidGithubUrl) {
      await this.kafka.emit("challenge.correction", {
        submissionId: answer.id,
        repositoryUrl: answer.repositoryUrl,
      });
    }

    return answer;
  }

  async findByFiltersPaginated(
    pagination?: PaginationInput,
    filters?: AnswerFilters,
  ): Promise<{ data: Answer[]; total: number }> {
    const answersData = await this.answerRepository.findByFiltersPaginated(
      pagination,
      filters,
    );

    return answersData;
  }

  async updateSubmission(submissionData: CorrectLessonResponse) {
    const submission = await this.answerRepository.findById(
      submissionData.submissionId,
    );

    if (!submission) {
      throw new BadRequestException(
        `Submission with id: ${submissionData.submissionId} not found`,
      );
    }

    const updatedSubmission = await this.answerRepository.updateById(
      submissionData.submissionId,
      submissionData,
    );

    return updatedSubmission;
  }
}
