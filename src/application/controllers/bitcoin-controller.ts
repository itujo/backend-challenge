import { type Response } from 'express';
import { type BitcoinService } from '../../domain/services';
import { type AuthRequest } from '../../@types/express';
import { ApplicationError } from '../../shared/errors';

export class BitcoinController {
  constructor(private readonly bitcoinPurchaseService: BitcoinService) {}

  async handle(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.user?.userId;
    if (!userId) throw new ApplicationError('user not logged in', 401);

    const { amount } = req.body;

    const purchased = await this.bitcoinPurchaseService.purchaseBitcoin(
      userId,
      +amount,
    );

    if (purchased) {
      res.status(204).send();
    }
  }
}
