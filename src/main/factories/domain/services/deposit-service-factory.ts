import { DepositService } from '../../../../domain/services';
import { createUserRepository } from '../../infra/repositories';
import { createEmailService } from '../../infra/services';
import { createTransactionService } from './transaction-service-factory';

export function createDepositService(): DepositService {
  const userRepository = createUserRepository();
  const emailService = createEmailService();
  const transactionService = createTransactionService();
  return new DepositService(userRepository, emailService, transactionService);
}
