import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import type { PaginationInput } from '@domain/shared/pagination.interface';
import {
  AnswerRepository,
  type AnswerFilters,
  type IAnswerRepository,
} from '@domain/answer/answer.repository';
import type { CreateAnswerInput } from '@infra/graphql/answer/dtos/create-answer.input';
import { Answer, AnswerStatus } from '@domain/answer/answer.entity';
import {
  ChallengeRepository,
  type IChallengeRepository,
} from '@domain/challenge/challenge.repository';

@Injectable()
export class AnswerService {
  constructor(
    @Inject(AnswerRepository)
    private readonly answerRepository: IAnswerRepository,
    @Inject(ChallengeRepository)
    private readonly challengeRepository: IChallengeRepository,
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
}
