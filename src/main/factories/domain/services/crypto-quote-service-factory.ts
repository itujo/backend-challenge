import { CryptoQuoteService } from '../../../../infra/services';

export function createCryptoQuoteService(): CryptoQuoteService {
  return new CryptoQuoteService();
}
