import { createUnionType } from '@nestjs/graphql';
import { ChallengeModel } from '../challenge.model';
import { ErrorMessage } from '@infra/graphql/common/error-message.output';

export const UpdateChallengeResult = createUnionType({
  name: 'UpdateChallengeResult',
  types: () => [ChallengeModel, ErrorMessage] as const,
  resolveType(value) {
    if ('id' in value) {
      return ChallengeModel;
    }
    if ('message' in value) {
      return ErrorMessage;
    }
    return null;
  },
});
