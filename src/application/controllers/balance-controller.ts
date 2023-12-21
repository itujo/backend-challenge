import { type Response } from 'express';
import { type BalanceService } from '../../domain/services';
import { type AuthRequest } from '../../@types/express';

export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  async handle(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.user?.userId;

    const balance = await this.balanceService.getBalance(userId);

    res.status(201).json({ balance });
  }
}
