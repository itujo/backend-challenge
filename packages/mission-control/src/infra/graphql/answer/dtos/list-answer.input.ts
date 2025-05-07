import type { AnswerStatus } from '@domain/answer/answer.entity';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ListAnswerFiltersInput {
  @Field({ nullable: true })
  challengeId?: string;

  @Field({ nullable: true })
  startDate?: Date;

  @Field({ nullable: true })
  endDate?: Date;

  @Field({ nullable: true })
  status?: AnswerStatus;
}
