import { randomUUID } from 'node:crypto';

export class Challenge {
  public readonly id: string;
  public readonly createdAt: Date;

  constructor(
    public title: string,
    public description: string,
    createdAt?: Date,
    id?: string,
  ) {
    this.id = id ?? randomUUID();
    this.createdAt = createdAt ?? new Date();
  }
}
