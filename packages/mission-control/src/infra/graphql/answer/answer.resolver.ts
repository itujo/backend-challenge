import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ListAnswerResult } from './dtos/list-answer.output';
import { PaginationInput } from '../common/pagination.input';
import { ListAnswerFiltersInput } from './dtos/list-answer.input';
import { AnswerModel } from './answer.model';
import { AnswerService } from '@app/answer/answer.service';
import type { Answer } from '@domain/answer/answer.entity';
import { CreateAnswerInput } from './dtos/create-answer.input';

@Resolver(() => AnswerModel)
export class AnswerResolver {
  constructor(private readonly answerService: AnswerService) {}

  @Mutation(() => AnswerModel)
  async answerChallenge(
    @Args('newAnswerChallengeData') newAnswerChallengeData: CreateAnswerInput,
  ): Promise<Answer> {
    const answer = await this.answerService.create(newAnswerChallengeData);
    return answer;
  }

  @Query(() => ListAnswerResult)
  async answers(
    @Args('pagination', { nullable: true }) pagination?: PaginationInput,
    @Args('filters', { nullable: true }) filters?: ListAnswerFiltersInput,
  ): Promise<ListAnswerResult> {
    const { data, total } = await this.answerService.findByFiltersPaginated(
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
