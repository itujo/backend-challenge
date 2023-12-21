import { BitcoinController } from '../../../../application/controllers';
import { createBitcoinService } from '../../domain/services/bitcoin-service-factory';

export function createBitcoinController(): BitcoinController {
  const bitcoinService = createBitcoinService();
  return new BitcoinController(bitcoinService);
}
