import { Field, ObjectType } from '@nestjs/graphql';
import { AnswerModel } from '../answer.model';
import type { Answer } from '@domain/answer/answer.entity';

@ObjectType()
export class ListAnswerResult {
  @Field(() => [AnswerModel])
  data: Answer[];

  @Field()
  total: number;

  @Field()
  page: number;

  @Field()
  perPage: number;
}
