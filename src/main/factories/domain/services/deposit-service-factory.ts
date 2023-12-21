import { DepositService } from '../../../../domain/services';
import { UserRepository } from '../../../../infra/repositories';

export function createDepositService(): DepositService {
  const userRepository = new UserRepository();
  return new DepositService(userRepository);
}
