import { ApplicationError } from '../../shared/errors';
import { type Transaction } from '../../domain/entities';
import { dbClient, transactions } from '../database';

export class TransactionRepository {
  async createTransaction(transactionData: Transaction): Promise<Transaction> {
    const [createdTransaction] = await dbClient
      .insert(transactions)
      .values(transactionData)
      .returning();

    if (!createdTransaction)
      throw new ApplicationError('transaction not created', 400);

    return createdTransaction;
  }
}
