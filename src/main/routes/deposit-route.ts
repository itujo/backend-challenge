import { type Router, type Request, type Response } from 'express';
import { DepositController } from '../../application/deposit/deposit-controller';
import { authMiddleware } from '../middlewares/auth-middleware';
import { validateMiddleware } from '../middlewares';
import { DepositSchema } from '../../application/validators';

export default (router: Router): void => {
  const depositController = new DepositController();

  router.post(
    '/deposit',
    authMiddleware,
    validateMiddleware(DepositSchema),
    (req: Request, res: Response) => {
      void depositController.handle(req, res);
    },
  );
};
