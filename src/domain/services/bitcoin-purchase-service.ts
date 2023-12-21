import {
  type UserRepository,
  type TransactionRepository,
  type BitcoinBalanceRepository,
} from '../../infra/repositories';
import {
  type EmailService,
  type CryptoQuoteService,
} from '../../infra/services';
import { ApplicationError } from '../../shared/errors';

export class BitcoinPurchaseService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly transactionRepository: TransactionRepository,
    private readonly bitcoinBalanceRepository: BitcoinBalanceRepository,
    private readonly emailService: EmailService,
    private readonly cryptoQuoteService: CryptoQuoteService,
  ) {}

  async purchaseBitcoin(userId: number, amountInBRL: number): Promise<void> {
    const user = await this.userRepository.findUserById(userId);
    if (!user) throw new ApplicationError('User not found', 404);

    const {
      ticker: { sell },
    } = await this.cryptoQuoteService.getCurrentBitcoinQuote();

    const sellPrice = +sell;
    const amountInBTC = amountInBRL / sellPrice;

    if (+user.balance < amountInBRL) {
      throw new ApplicationError('insufficient balance', 400);
    }

    await this.userRepository.withdrawMoney(userId, amountInBRL);

    await this.bitcoinBalanceRepository.buy(userId, amountInBTC);

    await this.transactionRepository.createTransaction({
      userId,
      type: 'purchase',
      amount: amountInBTC.toString(),
      pricePerUnit: sellPrice.toString(),
      totalValue: amountInBRL.toString(),
      date: new Date(),
    });

    await this.emailService.sendBitcoinPurchaseEmail(
      user.email,
      amountInBRL,
      amountInBTC,
    );
  }
}
