import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ChallengeModel } from './challenge.model';
import { Challenge } from '@domain/challenge/challenge.entity';
import { CreateChallengeInput } from './dtos/create-challenge.input';
import { ChallengeService } from '@app/challenge/challenge.service';
import { UpdateChallengeInput } from './dtos/update-challenge.input';
import { UpdateChallengeResult } from './dtos/update-challenge.output';
import { ListChallengeResult } from './dtos/list-challenge.output';
import { PaginationInput } from '../common/pagination.input';
import { ListChallengeFiltersInput } from './dtos/list-challenge.input';

@Resolver(() => ChallengeModel)
export class ChallengeResolver {
  constructor(private readonly challengeService: ChallengeService) {}

  @Mutation(() => ChallengeModel)
  async createChallenge(
    @Args('newChallengeData') newChallengeData: CreateChallengeInput,
  ): Promise<Challenge> {
    const challenge = await this.challengeService.create(newChallengeData);
    return challenge;
  }

  @Mutation(() => String)
  async deleteChallenge(
    @Args('challengeId') challengeId: string,
  ): Promise<string> {
    const { message } = await this.challengeService.remove(challengeId);
    return message;
  }

  @Mutation(() => UpdateChallengeResult)
  async updateChallenge(
    @Args('challengeId') challengeId: string,
    @Args('updateData') updateData: UpdateChallengeInput,
  ): Promise<
    | Challenge
    | {
        message: string;
      }
  > {
    const response = await this.challengeService.update(
      challengeId,
      updateData,
    );
    return response;
  }

  @Query(() => ListChallengeResult)
  async challenges(
    @Args('pagination', { nullable: true }) pagination?: PaginationInput,
    @Args('filters', { nullable: true }) filters?: ListChallengeFiltersInput,
  ): Promise<ListChallengeResult> {
    const { data, total } = await this.challengeService.findByFiltersPaginated(
      pagination,
      filters,
    );
    return {
      data,
      total,
      page: pagination?.page || 1,
      perPage: pagination?.perPage || 10,
    };
  }
}
