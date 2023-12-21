import { BalanceController } from '../../../../application/controllers';
import { createBalanceService } from '../../domain/services';

export function createBalanceController(): BalanceController {
  const balanceService = createBalanceService();
  return new BalanceController(balanceService);
}
