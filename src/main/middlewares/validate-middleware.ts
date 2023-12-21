import { z } from 'zod';
import { type Response, type NextFunction } from 'express';
import { type AuthRequest } from '../../@types/express';
import { ApplicationError } from '../../shared/errors';

export const validateMiddleware = (schema: z.ZodSchema) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          message: error.issues || 'failed to validate data',
        });
      }

      throw new ApplicationError('failed to validate data', 400);
    }
  };
};
