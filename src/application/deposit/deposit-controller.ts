import { type Response } from 'express';
import { DepositService } from '../../domain/services';
import { type AuthRequest } from '../../@types/express';

export class DepositController {
  private readonly depositService: DepositService;
  constructor() {
    this.depositService = new DepositService();
  }

  async handle(req: AuthRequest, res: Response): Promise<void> {
    const { amount } = req.body;

    const userId = req.user?.userId;

    try {
      if (!userId) {
        throw new Error('Usuário não encontrado.');
      }

      await this.depositService.deposit(userId, +amount);

      res.status(201).json({ message: `Successfully deposited R$${amount}` });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
