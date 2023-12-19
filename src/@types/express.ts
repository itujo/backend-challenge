import { type Request } from 'express';

export interface AuthRequest extends Request {
  user?: { userId: number };
}
