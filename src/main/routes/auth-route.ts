/* eslint-disable @typescript-eslint/no-misused-promises */
import { type Router, type Request, type Response } from 'express';
import { AuthController } from '../../application/auth';

export default (router: Router): void => {
  const authController = new AuthController();

  router.post('/register', async (req: Request, res: Response) => {
    await authController.registerUser(req, res);
  });

  router.post('/login', async (req, res) => {
    await authController.loginUser(req, res);
  });
};
