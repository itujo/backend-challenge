import {
  type Router,
  type Request,
  type Response,
  type NextFunction,
} from 'express';
import { validateMiddleware } from '../middlewares';
import { CreateUserSchema, LoginSchema } from '../../application/validators';
import { createAuthController } from '../factories/application/controllers';

export default (router: Router): void => {
  const authController = createAuthController();

  router.post(
    '/account',
    validateMiddleware(CreateUserSchema),
    (req: Request, res: Response, next: NextFunction) => {
      authController.registerUser(req, res).catch(next);
    },
  );

  router.post(
    '/login',
    validateMiddleware(LoginSchema),
    (req: Request, res: Response, next: NextFunction) => {
      authController.loginUser(req, res).catch(next);
    },
  );
};
