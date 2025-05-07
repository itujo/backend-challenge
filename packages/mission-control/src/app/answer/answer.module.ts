import { Module } from '@nestjs/common';
import { PrismaService } from '@infra/db/prisma/prisma.service';
import { AnswerService } from './answer.service';
import { AnswerRepository } from '@domain/answer/answer.repository';
import { PrismaAnswerRepository } from '@infra/db/prisma/repositories/prisma-answer.repository';
import { AnswerResolver } from '@infra/graphql/answer/answer.resolver';
import { ChallengeRepository } from '@domain/challenge/challenge.repository';
import { PrismaChallengeRepository } from '@infra/db/prisma/repositories/prisma-challenge.repository';

@Module({
  providers: [
    AnswerResolver,
    AnswerService,
    PrismaService,
    {
      provide: AnswerRepository,
      inject: [PrismaService],
      useFactory: (prismaService: PrismaService) => {
        return new PrismaAnswerRepository(prismaService);
      },
    },
    {
      provide: ChallengeRepository,
      inject: [PrismaService],
      useFactory: (prismaService: PrismaService) => {
        return new PrismaChallengeRepository(prismaService);
      },
    },
  ],
})
export class AnswerModule {}
