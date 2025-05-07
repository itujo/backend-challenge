import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateAnswerInput {
  @Field()
  @IsNotEmpty()
  challengeId: string;

  @Field()
  @IsNotEmpty()
  repositoryUrl: string;
}
