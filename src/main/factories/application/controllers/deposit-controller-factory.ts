import { DepositController } from '../../../../application/controllers';
import { createDepositService } from '../../domain/services/deposit-service-factory';

export function createDepositController(): DepositController {
  const depositService = createDepositService();
  return new DepositController(depositService);
}
