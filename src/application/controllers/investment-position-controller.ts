import { type Response } from 'express';
import { type InvestmentPositionService } from '../../domain/services';
import { type AuthRequest } from '../../@types/express';
import { ApplicationError } from '../../shared/errors';

export class InvestmentPositionController {
  constructor(
    private readonly investmentPositionService: InvestmentPositionService,
  ) {}

  async handle(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.user?.userId;

    if (!userId) {
      throw new ApplicationError('user not logged in', 401);
    }

    const positions =
      await this.investmentPositionService.getInvestmentPosition(userId);
    res.status(200).json(positions);
  }
}
