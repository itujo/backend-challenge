import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { AnswerStatus } from '@domain/answer/answer.entity';
import { ChallengeModel } from '../challenge/challenge.model';

registerEnumType(AnswerStatus, {
  name: 'AnswerStatus',
});

@ObjectType({ description: 'answer' })
export class AnswerModel {
  @Field(() => ID)
  id: string;

  @Field(() => ChallengeModel, { nullable: true })
  challenge: ChallengeModel;

  @Field({ nullable: true })
  challengeId: string;

  @Field()
  repositoryUrl: string;

  @Field()
  createdAt: Date;

  @Field(() => AnswerStatus)
  status: AnswerStatus;

  @Field({ nullable: true })
  grade: number;
}
