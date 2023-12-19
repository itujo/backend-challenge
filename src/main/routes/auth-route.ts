import { type Router, type Request, type Response } from 'express';
import { AuthController } from '../../application/auth';
import { validateMiddleware } from '../middlewares';
import { CreateUserSchema, LoginSchema } from '../../application/validators';

export default (router: Router): void => {
  const authController = new AuthController();

  router.post(
    '/register',
    validateMiddleware(CreateUserSchema),
    (req: Request, res: Response) => {
      void authController.registerUser(req, res);
    },
  );

  router.post('/login', validateMiddleware(LoginSchema), (req, res) => {
    void authController.loginUser(req, res);
  });
};
