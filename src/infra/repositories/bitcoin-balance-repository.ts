import { type BitcoinBalance } from '../../domain/entities';
import { bitcoinBalances, dbClient } from '../database';
import { eq } from 'drizzle-orm';
import { ApplicationError } from '../../shared/errors';

export class BitcoinBalanceRepository {
  async buy(userId: number, addedBalance: number): Promise<BitcoinBalance> {
    try {
      const currentBalance = await this.getBalance(userId);

      const newBalanceInBTC = +currentBalance + addedBalance;

      const [updatedBalance] = await dbClient
        .update(bitcoinBalances)
        .set({ balance: newBalanceInBTC.toString() })
        .where(eq(bitcoinBalances.userId, userId))
        .returning();

      if (!updatedBalance) {
        throw new ApplicationError('balance update failed', 400);
      }

      return updatedBalance;
    } catch (error: any) {
      console.log(error);

      throw new ApplicationError('failed to update balance', 500);
    }
  }

  async getBalance(userId: number): Promise<BitcoinBalance> {
    const balance = await dbClient.query.bitcoinBalances.findFirst({
      where: eq(bitcoinBalances.userId, userId),
    });

    if (!balance) throw new ApplicationError('user balance not found', 404);

    return balance;
  }

  async createBalance(userId: number): Promise<BitcoinBalance> {
    const [balance] = await dbClient
      .insert(bitcoinBalances)
      .values({ userId, balance: '0' })
      .returning();

    if (!balance) throw new ApplicationError('balance not created', 400);

    return balance;
  }
}
