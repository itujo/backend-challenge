import { type TransactionRepository } from '../../infra/repositories';
import { type CryptoQuoteService } from '../../infra/services';

export type InvestmentPositionResponse = Array<{
  dateOfPurchase: Date | null;
  investedAmount: number;
  amountInBTC: string;
  purchasePrice: string | null | undefined;
  currentPrice: string;
  profitPercentage: number;
  currentValue: number;
}>;

export class InvestmentPositionService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly cryptoQuoteService: CryptoQuoteService,
  ) {}

  async getInvestmentPosition(
    userId: number,
  ): Promise<InvestmentPositionResponse> {
    const purchaseTransactions =
      await this.transactionRepository.findPurchasesByUserId(userId);

    const {
      ticker: { buy: currentPrice },
    } = await this.cryptoQuoteService.getCurrentBitcoinQuote();

    const investmentPositions = purchaseTransactions.map((transaction) => {
      const { amount, pricePerUnit, date } = transaction;
      let valueAtPurchase = 0;
      if (pricePerUnit) {
        valueAtPurchase = +amount * +pricePerUnit;
      }
      const currentValue = +amount * +currentPrice;
      const profit = currentValue - valueAtPurchase;
      const profitPercentage = (profit / valueAtPurchase) * 100;

      return {
        dateOfPurchase: date,
        investedAmount: valueAtPurchase,
        amountInBTC: amount,
        purchasePrice: pricePerUnit,
        currentPrice,
        profitPercentage,
        currentValue,
      };
    });

    return investmentPositions;
  }
}
