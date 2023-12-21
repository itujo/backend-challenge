import { CryptoQuoteController } from '../../../../application/controllers/crypto-quote-controller';
import { createCryptoQuoteService } from '../../domain/services/crypto-quote-service-factory';

export function createCryptoQuoteController(): CryptoQuoteController {
  const cryptoQuoteService = createCryptoQuoteService();
  return new CryptoQuoteController(cryptoQuoteService);
}
