import { z } from 'zod';

export const DepositSchema = z.object({
  amount: z
    .number()
    .nonnegative('amount should be positive.')
    .max(Number.MAX_VALUE),
});
