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

    try {
      if (!userId) {
        throw new Error('user not found');
      }

      const balance = await this.balanceService.getBalance(userId);

      res.status(201).json({ balance });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
