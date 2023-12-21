import {
  type Router,
  type Request,
  type Response,
  type NextFunction,
} from 'express';
import { authMiddleware } from '../middlewares/auth-middleware';
import { createBalanceController } from '../factories/application/controllers';

export default (router: Router): void => {
  const balanceController = createBalanceController();

  router.get(
    '/account/balance',
    authMiddleware,
    (req: Request, res: Response, next: NextFunction) => {
      balanceController.handle(req, res).catch(next);
    },
  );
};
