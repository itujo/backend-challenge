import {
  type Router,
  type Request,
  type Response,
  type NextFunction,
} from 'express';
import { createBitcoinController } from '../factories/application/controllers';
import { authMiddleware, validateMiddleware } from '../middlewares';
import { PurchaseBitcoinSchema } from '../../application/validators';
import { createInvestmentPositionController } from '../factories/application/controllers/investment-position-controller-factory';

export default (router: Router): void => {
  const bitcoinController = createBitcoinController();
  const InvestmentPositionController = createInvestmentPositionController();

  router.post(
    '/btc/purchase',
    authMiddleware,
    validateMiddleware(PurchaseBitcoinSchema),
    (req: Request, res: Response, next: NextFunction) => {
      bitcoinController.handle(req, res).catch(next);
    },
  );

  router.get(
    '/btc',
    authMiddleware,
    (req: Request, res: Response, next: NextFunction) => {
      InvestmentPositionController.handle(req, res).catch(next);
    },
  );
};
