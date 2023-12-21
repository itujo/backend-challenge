import { type Response } from 'express';
import { BalanceService } from '../../domain/services';
import { type AuthRequest } from '../../@types/express';

export class BalanceController {
  private readonly balanceService: BalanceService;
  constructor() {
    this.balanceService = new BalanceService();
  }

  async handle(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.user?.userId;

    const balance = await this.balanceService.getBalance(userId);

    res.status(201).json({ balance });
  }
}
