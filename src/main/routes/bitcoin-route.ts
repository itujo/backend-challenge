import { type Router, type Response, type NextFunction } from 'express';
import {
  createBitcoinController,
  createInvestmentPositionController,
} from '../factories/application/controllers';
import { authMiddleware, validateMiddleware } from '../middlewares';
import { BitcoinSchema } from '../../application/validators';
import { type AuthRequest } from '../../@types/express';

export default (router: Router): void => {
  const bitcoinController = createBitcoinController();
  const InvestmentPositionController = createInvestmentPositionController();

  router.post(
    '/btc/purchase',
    authMiddleware,
    validateMiddleware(BitcoinSchema),
    (req: AuthRequest, res: Response, next: NextFunction) => {
      bitcoinController.handlePurchase(req, res).catch(next);
    },
  );

  router.post(
    '/btc/sell',
    authMiddleware,
    validateMiddleware(BitcoinSchema),
    (req: AuthRequest, res: Response, next: NextFunction) => {
      bitcoinController.handleSale(req, res).catch(next);
    },
  );

  router.get(
    '/btc',
    authMiddleware,
    (req: AuthRequest, res: Response, next: NextFunction) => {
      InvestmentPositionController.handle(req, res).catch(next);
    },
  );

  router.get(
    '/btc/volume',
    authMiddleware,
    (req: AuthRequest, res: Response, next: NextFunction) => {
      bitcoinController.getTotalVolumeToday(req, res).catch(next);
    },
  );
};
