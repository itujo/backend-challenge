import { type Request, type Response } from 'express';
import { type CryptoQuoteService } from '../../infra/services/crypto-quote-service';

export class CryptoQuoteController {
  constructor(private readonly cryptoQuoteService: CryptoQuoteService) {}

  async getCurrentQuote(_req: Request, res: Response): Promise<void> {
    const quote = await this.cryptoQuoteService.getCurrentBitcoinQuote();
    const { buy, sell } = quote.ticker;
    res.status(200).json({ buy, sell });
  }
}
