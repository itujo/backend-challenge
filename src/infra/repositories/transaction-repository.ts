import { ApplicationError } from '../../shared/errors';
import { type Transaction } from '../../domain/entities';
import { dbClient, transactions } from '../database';
import { and, eq, gte, lte } from 'drizzle-orm';

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

  async findPurchasesByUserId(userId: number): Promise<Transaction[]> {
    const purchases = await dbClient.query.transactions.findMany({
      where: and(
        eq(transactions.userId, userId),
        eq(transactions.type, 'purchase'),
      ),
    });

    return purchases;
  }

  async findTransactionsByUserIdAndDateRange(
    userId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<Transaction[]> {
    try {
      const userTransactions = await dbClient.query.transactions.findMany({
        where: and(
          eq(transactions.userId, userId),
          gte(transactions.date, startDate),
          lte(transactions.date, endDate),
        ),
      });

      return userTransactions;
    } catch (error: any) {
      throw new Error('Error retrieving transactions: ' + error.message);
    }
  }
}
