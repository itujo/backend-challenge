import type { PaginationInput } from "@domain/shared/pagination.interface";
import { AnswerStatus } from "generated/prisma";
import type { Answer } from "./answer.entity";
import { CorrectLessonResponse } from "@app/answer/answer.controller";

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
  updateById(
    id: string,
    submissionData: CorrectLessonResponse,
  ): Promise<Answer>;

  findByFiltersPaginated(
    pagination?: PaginationInput,
    filters?: AnswerFilters,
  ): Promise<{ data: Answer[]; total: number }>;
}

export const AnswerRepository = Symbol("answer-repository");
