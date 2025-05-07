import { PrismaService } from "../prisma.service";
import { Injectable } from "@nestjs/common";
import type { PaginationInput } from "@domain/shared/pagination.interface";
import type { Prisma } from "generated/prisma";
import type {
  AnswerFilters,
  IAnswerRepository,
} from "@domain/answer/answer.repository";
import type { Answer, AnswerStatus } from "@domain/answer/answer.entity";
import { AnswerMapper } from "../mappers/answer.mapper";
import type { CreateAnswerInput } from "@infra/graphql/answer/dtos/create-answer.input";

@Injectable()
export class PrismaAnswerRepository implements IAnswerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(uuid: string): Promise<Answer | null> {
    const answer = await this.prisma.answer.findUnique({ where: { id: uuid } });
    const domainAnswer = answer ? AnswerMapper.toDomain(answer) : null;
    return domainAnswer;
  }

  async createAnswer(
    data: CreateAnswerInput,
    status: AnswerStatus,
  ): Promise<Answer> {
    const newAnswer = await this.prisma.answer.create({
      data: {
        ...data,
        status,
      },
    });

    const domainAnswer = AnswerMapper.toDomain(newAnswer);

    return domainAnswer;
  }

  async findByFiltersPaginated(
    pagination: PaginationInput = { page: 1, perPage: 10 },
    filters: AnswerFilters = {},
  ): Promise<{ data: Answer[]; total: number }> {
    const where: Prisma.AnswerWhereInput = {};

    if (filters.challengeId) {
      where.challengeId = { equals: filters.challengeId };
    }

    if (filters.status) {
      where.status = { equals: filters.status };
    }

    if (filters.startDate || filters.endDate) {
      where.createdAt = {
        ...(filters.startDate && { gte: filters.startDate }),
        ...(filters.endDate && { lte: filters.endDate }),
      };
    }

    const page = pagination.page ?? 1;
    const perPage = pagination.perPage ?? 10;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.answer.findMany({
        where,
        skip: (page - 1) * perPage,
        take: perPage,
        include: { challenge: true },
      }),
      this.prisma.answer.count({ where }),
    ]);

    console.log({ data });

    return {
      data: data.map((answer) => AnswerMapper.toDomain(answer)),
      total,
    };
  }
}
