import type { CreateChallengeInput } from '@infra/graphql/challenge/dtos/create-challenge.input';
import type { Challenge } from './challenge.entity';
import type { UpdateChallengeInput } from '@infra/graphql/challenge/dtos/update-challenge.input';
import type { PaginationInput } from '@domain/shared/pagination.interface';

export interface ChallengeFilters {
  id?: string;
  title?: string;
  description?: string;
}

export interface IChallengeRepository {
  createChallenge(data: CreateChallengeInput): Promise<Challenge>;
  findById(uuid: string): Promise<Challenge | null>;
  deleteById(uuid: string): Promise<string>;
  updateById(uuid: string, data: UpdateChallengeInput): Promise<Challenge>;
  findByFiltersPaginated(
    pagination?: PaginationInput,
    filters?: ChallengeFilters,
  ): Promise<{ data: Challenge[]; total: number }>;
}

export const ChallengeRepository = Symbol('challenge-repository');
