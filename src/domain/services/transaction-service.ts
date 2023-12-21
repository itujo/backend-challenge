import { type TransactionRepository } from '../../infra/repositories';
import { type Transaction } from '../entities';

export class TransactionService {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async create(transactionData: Transaction): Promise<Transaction> {
    return await this.transactionRepository.createTransaction(transactionData);
  }

  async getStatement(
    userId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<any[]> {
    const transactions =
      await this.transactionRepository.findTransactionsByUserIdAndDateRange(
        userId,
        startDate,
        endDate,
      );

    return transactions.map((transaction) => {
      return {
        date: transaction.date,
        type: transaction.type,
        amount: transaction.amount,
        pricePerUnit: transaction.pricePerUnit,
        totalValue: transaction.totalValue,
      };
    });
  }

  async findTotalBitcoinVolumeByDay(
    date: Date,
  ): Promise<{ totalBought: string; totalSold: string }> {
    return await this.transactionRepository.findTotalBitcoinVolumeByDay(date);
  }
}
