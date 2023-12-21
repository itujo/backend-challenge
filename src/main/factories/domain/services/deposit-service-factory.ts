import { DepositService } from '../../../../domain/services';
import { UserRepository } from '../../../../infra/repositories';
import { createEmailService } from '../../infra/services';

export function createDepositService(): DepositService {
  const userRepository = new UserRepository();
  const emailService = createEmailService();
  return new DepositService(userRepository, emailService);
}
