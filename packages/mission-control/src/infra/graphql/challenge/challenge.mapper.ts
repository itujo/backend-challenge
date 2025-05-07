import { Challenge } from '@domain/challenge/challenge.entity';
import type { ChallengeModel } from './challenge.model';

export class ChallengeMapper {
  static toGraphQL(entity: Challenge): ChallengeModel {
    return {
      id: entity.id,
      title: entity.title,
      description: entity.description,
      createdAt: entity.createdAt,
    };
  }

  static toDomain(raw: ChallengeModel): Challenge {
    return new Challenge(raw.title, raw.description, raw.createdAt, raw.id);
  }
}
