import { UserRepository } from '../../../../infra/repositories';
import { BalanceService } from '../../../../domain/services';

export function createBalanceService(): BalanceService {
  const userRepository = new UserRepository();
  return new BalanceService(userRepository);
}
