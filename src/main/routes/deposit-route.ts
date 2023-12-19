/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Router, type Request, type Response } from 'express';
import { DepositController } from '../../application/deposit/deposit-controller';
import { authMiddleware } from '../middlewares/auth-middleware';

export default (router: Router): void => {
  const depositController = new DepositController();

  router.post(
    '/deposit',
    authMiddleware,
    async (req: Request, res: Response) => {
      await depositController.handle(req, res);
    },
  );
};
