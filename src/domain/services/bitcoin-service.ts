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

  async purchaseBitcoin(userId: number, amount: number): Promise<void> {
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
  }

  async sellBitcoin(userId: number, amountInBTC: number): Promise<void> {
    const user = await this.userRepository.findUserById(userId);
    const bitcoinBalance =
      await this.bitcoinBalanceRepository.getBalance(userId);

    if (!user || !bitcoinBalance)
      throw new ApplicationError('User not found', 404);
    if (+bitcoinBalance.balance < amountInBTC)
      throw new ApplicationError('Insufficient bitcoin balance', 400);

    const {
      ticker: { sell: sellPrice },
    } = await this.cryptoQuoteService.getCurrentBitcoinQuote();

    const amountInBRL = amountInBTC * +sellPrice;

    await this.userRepository.depositMoney(userId, amountInBRL);

    await this.bitcoinBalanceRepository.sell(userId, amountInBTC);

    await this.transactionService.create({
      userId,
      type: 'sale',
      amount: amountInBTC.toString(),
      pricePerUnit: sellPrice,
      totalValue: amountInBRL.toString(),
      date: new Date(),
    });

    await this.emailService.sendBitcoinSaleEmail(
      user.email,
      amountInBTC,
      amountInBRL,
    );
  }
}
