import {
  type Router,
  type Request,
  type Response,
  type NextFunction,
} from 'express';
import { validateMiddleware } from '../middlewares';
import { CreateUserSchema, LoginSchema } from '../../application/validators';
import { createAuthController } from '../factories/application/controllers/auth-controller-factory';

export default (router: Router): void => {
  const authController = createAuthController();

  router.post(
    '/account',
    validateMiddleware(CreateUserSchema),
    (req: Request, res: Response, next: NextFunction) => {
      void authController.registerUser(req, res).catch(next);
    },
  );

  router.post(
    '/login',
    validateMiddleware(LoginSchema),
    (req: Request, res: Response, next: NextFunction) => {
      void authController.loginUser(req, res).catch(next);
    },
  );
};
