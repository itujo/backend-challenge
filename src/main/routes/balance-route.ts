import {
  type Router,
  type Request,
  type Response,
  type NextFunction,
} from 'express';
import { authMiddleware } from '../middlewares/auth-middleware';
import { BalanceController } from '../../application/controllers';

export default (router: Router): void => {
  const balanceController = new BalanceController();

  router.get(
    '/account/balance',
    authMiddleware,
    (req: Request, res: Response, next: NextFunction) => {
      void balanceController.handle(req, res).catch(next);
    },
  );
};
