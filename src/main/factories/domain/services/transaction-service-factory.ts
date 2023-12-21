import { TransactionRepository } from '../../../../infra/repositories';
import { TransactionService } from '../../../../domain/services';

export function createTransactionService(): TransactionService {
  const transactionRepository = new TransactionRepository();
  return new TransactionService(transactionRepository);
}
