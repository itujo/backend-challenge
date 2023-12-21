import { DepositController } from '../../../../application/controllers';
import { createDepositService } from '../../domain/services';

export function createDepositController(): DepositController {
  const depositService = createDepositService();
  return new DepositController(depositService);
}
