import { type Response } from 'express';
import { type BitcoinService } from '../../domain/services';
import { type AuthRequest } from '../../@types/express';
import { ApplicationError } from '../../shared/errors';

export class BitcoinController {
  constructor(private readonly bitcoinService: BitcoinService) {}

  async handlePurchase(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.user?.userId;
    if (!userId) throw new ApplicationError('user not logged in', 401);

    const { amount } = req.body;

    await this.bitcoinService.purchaseBitcoin(userId, +amount);

    res.status(204).send();
  }

  async handleSale(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.user?.userId;
    if (!userId) throw new ApplicationError('user not logged in', 401);

    const { amount } = req.body;

    await this.bitcoinService.sellBitcoin(userId, +amount);

    res.status(204).send();
  }

  async getTotalVolumeToday(_req: AuthRequest, res: Response): Promise<void> {
    const totalVolume = await this.bitcoinService.getTodayVolume();

    res.status(200).json(totalVolume);
  }
}
