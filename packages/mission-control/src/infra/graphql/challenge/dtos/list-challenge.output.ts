import { Field, ObjectType } from '@nestjs/graphql';
import { ChallengeModel } from '../challenge.model';
import type { Challenge } from '@domain/challenge/challenge.entity';

@ObjectType()
export class ListChallengeResult {
  @Field(() => [ChallengeModel])
  data: Challenge[];

  @Field()
  total: number;

  @Field()
  page: number;

  @Field()
  perPage: number;
}
