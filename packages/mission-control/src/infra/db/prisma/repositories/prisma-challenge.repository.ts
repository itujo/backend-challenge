import type { Challenge } from '@domain/challenge/challenge.entity';
import type {
  ChallengeFilters,
  IChallengeRepository,
} from '@domain/challenge/challenge.repository';
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import type { CreateChallengeInput } from '@infra/graphql/challenge/dtos/create-challenge.input';
import type { PaginationInput } from '@domain/shared/pagination.interface';
import type { Prisma } from 'generated/prisma';

@Injectable()
export class PrismaChallengeRepository implements IChallengeRepository {
  constructor(private readonly prisma: PrismaService) {}
  async createChallenge(data: CreateChallengeInput): Promise<Challenge> {
    const newChallenge = await this.prisma.challenge.create({
      data: {
        createdAt: new Date(),
        description: data.description,
        title: data.title,
      },
    });

    return newChallenge;
  }

  async findById(uuid: string): Promise<Challenge | null> {
    const challenge = await this.prisma.challenge.findUnique({
      where: {
        id: uuid,
      },
    });
    return challenge;
  }

  async deleteById(uuid: string): Promise<string> {
    const removedChallenge = await this.prisma.challenge.delete({
      where: { id: uuid },
    });
    return removedChallenge.id;
  }

  async updateById(
    uuid: string,
    data: CreateChallengeInput,
  ): Promise<Challenge> {
    const updatedChallenge = await this.prisma.challenge.update({
      where: { id: uuid },
      data,
    });

    return updatedChallenge;
  }

  async findByFiltersPaginated(
    pagination: PaginationInput = { page: 1, perPage: 10 },
    filters: ChallengeFilters = {},
  ): Promise<{ data: Challenge[]; total: number }> {
    const where: Prisma.ChallengeWhereInput = Object.fromEntries(
      Object.entries({
        title: filters.title && {
          contains: filters.title,
          mode: 'insensitive',
        },
        description: filters.description && {
          contains: filters.description,
          mode: 'insensitive',
        },
      }).filter(
        ([, value]) => value !== '' && value !== undefined && value !== null,
      ),
    );

    const page = pagination.page ?? 1;
    const perPage = pagination.perPage ?? 10;

    const [data, total] = await this.prisma.$transaction([
      this.prisma.challenge.findMany({
        where,
        skip: (page - 1) * perPage,
        take: perPage,
      }),
      this.prisma.challenge.count({ where }),
    ]);

    return { data, total };
  }
}
