import { z } from 'zod';

export const GetTransactionSchema = z
  .object({
    startDate: z.string().refine((data) => !isNaN(Date.parse(data)), {
      message: 'start date must be a valid date string',
    }),
    endDate: z.string().refine((data) => !isNaN(Date.parse(data)), {
      message: 'end date must be a valid date string',
    }),
  })
  .refine((data) => new Date(data.startDate) <= new Date(data.endDate), {
    message: 'start date must be on or before end date',
  });
