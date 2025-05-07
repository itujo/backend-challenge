import { Challenge } from "@domain/challenge/challenge.entity";
import { randomUUID } from "node:crypto";

export enum AnswerStatus {
  Pending = "Pending",
  Error = "Error",
  Done = "Done",
}

export class Answer {
  public readonly id: string;
  public readonly createdAt: Date;

  constructor(
    public challengeId: string | null,
    public repositoryUrl: string,
    public status: AnswerStatus,
    public grade: number | null,
    public challenge: Challenge | null,
    createdAt?: Date,
    id?: string,
  ) {
    this.id = id ?? randomUUID();
    this.createdAt = createdAt ?? new Date();
  }
}
