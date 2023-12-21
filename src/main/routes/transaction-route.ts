import { type Router, type Response, type NextFunction } from 'express';
import { authMiddleware } from '../middlewares/auth-middleware';
import { TransactionController } from '../../application/controllers/transaction-controller';
import { createTransactionService } from '../factories/domain/services';
import { type AuthRequest } from '../../@types/express';

export default (router: Router): void => {
  const transactionService = createTransactionService();
  const transactionController = new TransactionController(transactionService);

  router.get(
    '/history',
    authMiddleware,
    (req: AuthRequest, res: Response, next: NextFunction) => {
      transactionController.getStatement(req, res).catch(next);
    },
  );
};
