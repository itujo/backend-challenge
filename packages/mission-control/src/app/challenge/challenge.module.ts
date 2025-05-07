import { Module } from '@nestjs/common';
import { ChallengeResolver } from '@infra/graphql/challenge/challenge.resolver';
import { ChallengeService } from './challenge.service';
import { PrismaChallengeRepository } from '@infra/db/prisma/repositories/prisma-challenge.repository';
import { PrismaService } from '@infra/db/prisma/prisma.service';
import { ChallengeRepository } from '@domain/challenge/challenge.repository';

@Module({
  providers: [
    ChallengeResolver,
    ChallengeService,
    PrismaService,
    {
      provide: ChallengeRepository,
      inject: [PrismaService],
      useFactory: (prismaService: PrismaService) => {
        return new PrismaChallengeRepository(prismaService);
      },
    },
  ],
})
export class ChallengeModule {}
