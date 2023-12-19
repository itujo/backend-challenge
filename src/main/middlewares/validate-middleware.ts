import { type z } from 'zod';
import { type Response, type NextFunction } from 'express';
import { type AuthRequest } from '../../@types/express';

export const validateMiddleware = (schema: z.ZodSchema) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
      res.status(400).json({
        message: error.issues || 'failed to validate data.',
      });
    }
  };
};
