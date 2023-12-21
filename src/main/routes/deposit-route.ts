import {
  type Router,
  type Request,
  type Response,
  type NextFunction,
} from 'express';
import { authMiddleware } from '../middlewares/auth-middleware';
import { validateMiddleware } from '../middlewares';
import { DepositSchema } from '../../application/validators';
import { DepositController } from '../../application/controllers';

export default (router: Router): void => {
  const depositController = new DepositController();

  router.post(
    '/account/deposit',
    authMiddleware,
    validateMiddleware(DepositSchema),
    (req: Request, res: Response, next: NextFunction) => {
      void depositController.handle(req, res).catch(next);
    },
  );
};
