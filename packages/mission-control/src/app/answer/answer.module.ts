import { Module } from "@nestjs/common";
import { PrismaService } from "@infra/db/prisma/prisma.service";
import { AnswerService } from "./answer.service";
import { AnswerRepository } from "@domain/answer/answer.repository";
import { PrismaAnswerRepository } from "@infra/db/prisma/repositories/prisma-answer.repository";
import { AnswerResolver } from "@infra/graphql/answer/answer.resolver";
import { ChallengeRepository } from "@domain/challenge/challenge.repository";
import { PrismaChallengeRepository } from "@infra/db/prisma/repositories/prisma-challenge.repository";
import { KafkaProducerService } from "@infra/kafka/kafka.service";
import { AnswerController } from "./answer.controller";

@Module({
  providers: [
    AnswerResolver,
    AnswerService,
    PrismaService,
    KafkaProducerService,
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
  controllers: [AnswerController],
})
export class AnswerModule {}
