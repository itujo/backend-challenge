import { CryptoQuoteController } from '../../../../application/controllers';
import { createCryptoQuoteService } from '../../domain/services';

export function createCryptoQuoteController(): CryptoQuoteController {
  const cryptoQuoteService = createCryptoQuoteService();
  return new CryptoQuoteController(cryptoQuoteService);
}
