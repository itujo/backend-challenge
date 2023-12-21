import { BitcoinBalanceRepository } from '../../../../infra/repositories';
import { BitcoinService } from '../../../../domain/services';
import { createUserRepository } from '../../infra/repositories';
import { createTransactionService } from './transaction-service-factory';
import { createEmailService } from '../../infra/services';
import { createCryptoQuoteService } from './crypto-quote-service-factory';

export function createBitcoinService(): BitcoinService {
  const userRepository = createUserRepository();
  const transactionService = createTransactionService();
  const bitcoinBalanceRepository = new BitcoinBalanceRepository();
  const emailService = createEmailService();
  const cryptoQuoteService = createCryptoQuoteService();

  return new BitcoinService(
    userRepository,
    transactionService,
    bitcoinBalanceRepository,
    emailService,
    cryptoQuoteService,
  );
}
