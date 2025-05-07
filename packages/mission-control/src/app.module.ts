import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'node:path';
import { ChallengeModule } from './app/challenge/challenge.module';
import { AnswerModule } from '@app/answer/answer.module';
import { DateScalar } from '@infra/graphql/scalars/date.scalar';

@Module({
  imports: [
    ChallengeModule,
    AnswerModule,
    DateScalar,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      graphiql: true,
      debug: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
})
export class AppModule {}
