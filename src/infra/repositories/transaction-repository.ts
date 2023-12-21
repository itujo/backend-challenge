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

  async findTotalBitcoinVolumeByDay(
    date: Date,
  ): Promise<{ totalBought: string; totalSold: string }> {
    try {
      const startOfDay = new Date(date.setHours(0, 0, 0, 0));
      const endOfDay = new Date(date.setHours(23, 59, 59, 999));

      const dailyTransactions = await dbClient.query.transactions.findMany({
        where: and(
          gte(transactions.date, startOfDay),
          lte(transactions.date, endOfDay),
        ),
      });

      const totalBought = dailyTransactions
        .filter((t) => t.type === 'purchase')
        .reduce((sum, t) => sum + +t.amount, 0);

      const totalSold = dailyTransactions
        .filter((t) => t.type === 'sale')
        .reduce((sum, t) => sum + +t.amount, 0);

      return {
        totalBought: totalBought.toFixed(8),
        totalSold: totalSold.toFixed(8),
      };
    } catch (error: any) {
      throw new ApplicationError(
        'error retrieving bitcoin volume: ' + error.message,
        400,
      );
    }
  }
}
