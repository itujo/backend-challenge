import { type Response } from 'express';
import { type TransactionService } from '../../domain/services';
import { type AuthRequest } from '../../@types/express';
import { ApplicationError } from '../../shared/errors';
import { GetTransactionSchema } from '../validators';

export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  async getStatement(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;
      const { startDate, endDate } = req.query;

      if (!userId) {
        throw new ApplicationError('user not found', 404);
      }

      GetTransactionSchema.parse({ startDate, endDate });

      const statement = await this.transactionService.getStatement(
        userId,
        new Date(startDate as string),
        new Date(endDate as string),
      );

      res.status(200).json(statement);
    } catch (error: any) {
      res.status(400).json({
        message: error.issues || 'failed to validate data.',
      });
    }
  }
}
