import { TransactionRepository } from '../../../../infra/repositories';
import { InvestmentPositionService } from '../../../../domain/services';
import { createCryptoQuoteService } from './crypto-quote-service-factory';

export function createInvestmentPositionService(): InvestmentPositionService {
  const transactionRepository = new TransactionRepository();
  const cryptoQuoteService = createCryptoQuoteService();
  return new InvestmentPositionService(
    transactionRepository,
    cryptoQuoteService,
  );
}
