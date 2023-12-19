import { type Response, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import env from '../config/environments/application';
import { type AuthRequest } from '../../@types/express';

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void => {
  const token = req.headers.authorization?.split(' ')[1];

  try {
    if (!token) {
      res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
    } else {
      const decoded = jwt.verify(token, env.jwtSecret);
      if (typeof decoded === 'string') throw new Error('Invalid token.');
      req.user = { userId: decoded.userId };
      next();
    }
  } catch (error) {
    res.status(400).json({ message: 'Token inválido.' });
  }
};
