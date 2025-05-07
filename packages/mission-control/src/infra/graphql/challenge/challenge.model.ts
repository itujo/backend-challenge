import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Challenge } from '@domain/challenge/challenge.entity';

@ObjectType({ description: 'challenge' })
export class ChallengeModel implements Challenge {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  createdAt: Date;
}
