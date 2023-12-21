import { type Response } from 'express';
import { type AuthRequest } from '../../@types/express';
import { type DepositService } from '../../domain/services';

export class DepositController {
  constructor(private readonly depositService: DepositService) {}

  async handle(req: AuthRequest, res: Response): Promise<void> {
    const { amount } = req.body;

    const userId = req.user?.userId;

    try {
      if (!userId) {
        throw new Error('user not found');
      }

      await this.depositService.deposit(userId, +amount);

      res.status(201).json({ message: `successfully deposited R$${amount}` });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
