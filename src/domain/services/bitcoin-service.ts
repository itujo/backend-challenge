import {
  type UserRepository,
  type BitcoinBalanceRepository,
} from '../../infra/repositories';
import {
  type EmailService,
  type CryptoQuoteService,
} from '../../infra/services';
import { ApplicationError } from '../../shared/errors';
import { type TransactionService } from './transaction-service';

export class BitcoinService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly transactionService: TransactionService,
    private readonly bitcoinBalanceRepository: BitcoinBalanceRepository,
    private readonly emailService: EmailService,
    private readonly cryptoQuoteService: CryptoQuoteService,
  ) {}

  async purchaseBitcoin(userId: number, amount: number): Promise<boolean> {
    const user = await this.userRepository.findUserById(userId);
    if (!user) throw new ApplicationError('User not found', 404);

    const {
      ticker: { buy },
    } = await this.cryptoQuoteService.getCurrentBitcoinQuote();

    const buyPrice = +buy;
    const amountInBTC = amount / buyPrice;

    if (+user.balance < amount) {
      throw new ApplicationError('insufficient balance', 400);
    }

    await this.userRepository.withdrawMoney(userId, amount);

    await this.bitcoinBalanceRepository.buy(userId, amountInBTC);

    await this.transactionService.create({
      userId,
      type: 'purchase',
      amount: amountInBTC.toString(),
      pricePerUnit: buyPrice.toString(),
      totalValue: amount.toString(),
      date: new Date(),
    });

    await this.emailService.sendBitcoinPurchaseEmail(
      user.email,
      amount,
      amountInBTC,
    );

    return true;
  }
}
