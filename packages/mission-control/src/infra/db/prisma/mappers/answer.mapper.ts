import { Answer, AnswerStatus } from "@domain/answer/answer.entity";
import {
  Answer as PrismaAnswer,
  Challenge as PrismaChallenge,
} from "generated/prisma";

export class AnswerMapper {
  static toDomain(
    prismaAnswer: PrismaAnswer & { challenge?: PrismaChallenge | null },
  ): Answer {
    return new Answer(
      prismaAnswer.challengeId,
      prismaAnswer.repositoryUrl,
      AnswerStatus[prismaAnswer.status],
      prismaAnswer.grade ?? null,
      prismaAnswer.challenge ?? null,
      prismaAnswer.createdAt,
      prismaAnswer.id,
    );
  }

  static toPrismaCreate(answer: Answer) {
    return {
      id: answer.id,
      challengeId: answer.challengeId,
      repositoryUrl: answer.repositoryUrl,
      createdAt: answer.createdAt,
      status: answer.status,
      grade: answer.grade,
    };
  }

  static toPrismaUpdate(answer: Partial<Answer>) {
    return {
      repositoryUrl: answer.repositoryUrl,
      status: answer.status,
      grade: answer.grade,
    };
  }
}
