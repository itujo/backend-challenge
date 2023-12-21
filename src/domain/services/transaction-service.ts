import { type TransactionRepository } from '../../infra/repositories';
import { type Transaction } from '../entities';

export class TransactionService {
  constructor(private readonly transactionRepositry: TransactionRepository) {}

  async create(transactionData: Transaction): Promise<Transaction> {
    return await this.transactionRepositry.createTransaction(transactionData);
  }
}
