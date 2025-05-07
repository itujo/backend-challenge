import { Inject, Injectable } from '@nestjs/common';
import type { CreateChallengeInput } from '@infra/graphql/challenge/dtos/create-challenge.input';
import { Challenge } from '@domain/challenge/challenge.entity';
import {
  ChallengeRepository,
  type ChallengeFilters,
  type IChallengeRepository,
} from '@domain/challenge/challenge.repository';
import type { UpdateChallengeInput } from '@infra/graphql/challenge/dtos/update-challenge.input';
import type { PaginationInput } from '@domain/shared/pagination.interface';

@Injectable()
export class ChallengeService {
  constructor(
    @Inject(ChallengeRepository)
    private readonly challengeRepository: IChallengeRepository,
  ) {}

  async create(data: CreateChallengeInput): Promise<Challenge> {
    const newChallenge = await this.challengeRepository.createChallenge(data);

    return newChallenge;
  }

  async remove(id: string): Promise<{ message: string }> {
    const challengeToRemove = await this.challengeRepository.findById(id);
    if (!challengeToRemove) {
      return { message: `Challenge with id: ${id} not found.` };
    }

    const removedChallengeId = await this.challengeRepository.deleteById(id);

    return {
      message: `Challenge with id: ${removedChallengeId} removed successfully`,
    };
  }

  async update(
    id: string,
    data: UpdateChallengeInput,
  ): Promise<Challenge | { message: string }> {
    const challengeToUpdate = await this.challengeRepository.findById(id);

    if (!challengeToUpdate) {
      return { message: `Challenge with id: ${id} not found.` };
    }

    const updatedChallenge = await this.challengeRepository.updateById(
      id,
      data,
    );

    return updatedChallenge;
  }

  async findByFiltersPaginated(
    pagination?: PaginationInput,
    filters?: ChallengeFilters,
  ): Promise<{ data: Challenge[]; total: number }> {
    const challengesData =
      await this.challengeRepository.findByFiltersPaginated(
        pagination,
        filters,
      );

    return challengesData;
  }
}
