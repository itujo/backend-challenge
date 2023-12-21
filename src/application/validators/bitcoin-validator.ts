import { z } from 'zod';

export const PurchaseBitcoinSchema = z.object({
  amount: z
    .number()
    .nonnegative('amount should be greater than 0')
    .max(Number.MAX_VALUE),
});
