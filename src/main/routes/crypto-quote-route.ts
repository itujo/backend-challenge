import {
  type Router,
  type Request,
  type Response,
  type NextFunction,
} from 'express';
import { createCryptoQuoteController } from '../factories/application/controllers/crypto-quote-controller-factory';

export default (router: Router): void => {
  const cryptoQuoteController = createCryptoQuoteController();

  router.get(
    '/btc/price',
    (req: Request, res: Response, next: NextFunction) => {
      void cryptoQuoteController.getCurrentQuote(req, res).catch(next);
    },
  );
};
