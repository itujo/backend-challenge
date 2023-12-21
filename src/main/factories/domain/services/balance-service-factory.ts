import { BalanceService } from '../../../../domain/services';
import { createUserRepository } from '../../infra/repositories';

export function createBalanceService(): BalanceService {
  const userRepository = createUserRepository();
  return new BalanceService(userRepository);
}
