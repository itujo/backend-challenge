import type { PaginationInput } from "@domain/shared/pagination.interface";
import { AnswerStatus } from "generated/prisma";
import type { Answer } from "./answer.entity";

export interface AnswerFilters {
  challengeId?: string;
  startDate?: Date;
  endDate?: Date;
  status?: AnswerStatus;
}

export interface CreateAnswerInput {
  repositoryUrl: string;
  challengeId: string | null;
}

export interface IAnswerRepository {
  findById(uuid: string): Promise<Answer | null>;
  createAnswer(data: CreateAnswerInput, status: AnswerStatus): Promise<Answer>;

  findByFiltersPaginated(
    pagination?: PaginationInput,
    filters?: AnswerFilters,
  ): Promise<{ data: Answer[]; total: number }>;
}

export const AnswerRepository = Symbol("answer-repository");
