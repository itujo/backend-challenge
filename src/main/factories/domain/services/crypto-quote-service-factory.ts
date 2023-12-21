import { CryptoQuoteService } from '../../../../infra/services/crypto-quote-service';

export function createCryptoQuoteService(): CryptoQuoteService {
  return new CryptoQuoteService();
}
