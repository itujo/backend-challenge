import { InvestmentPositionController } from '../../../../application/controllers';
import { createInvestmentPositionService } from '../../domain/services';

export function createInvestmentPositionController(): InvestmentPositionController {
  const investmentPositionService = createInvestmentPositionService();
  return new InvestmentPositionController(investmentPositionService);
}
