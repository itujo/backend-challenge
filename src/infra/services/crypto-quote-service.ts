import axios from 'axios';
import { ApplicationError } from '../../shared/errors';

interface CryptoQuoteResponse {
  ticker: {
    high: string;
    low: string;
    vol: string;
    last: string;
    buy: string;
    sell: string;
    open: string;
    date: number;
  };
}

export class CryptoQuoteService {
  async getCurrentBitcoinQuote(): Promise<CryptoQuoteResponse> {
    try {
      const response = await axios.get<CryptoQuoteResponse>(
        'https://www.mercadobitcoin.net/api/BTC/ticker/',
      );

      return response.data;
    } catch (error) {
      throw new ApplicationError('failed to fetch bitcoin quote', 500);
    }
  }
}
