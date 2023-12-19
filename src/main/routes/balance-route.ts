import { type Router, type Request, type Response } from 'express';
import { authMiddleware } from '../middlewares/auth-middleware';
import { BalanceController } from '../../application/controllers';

export default (router: Router): void => {
  const balanceController = new BalanceController();

  router.get('/balance', authMiddleware, (req: Request, res: Response) => {
    void balanceController.handle(req, res);
  });
};
