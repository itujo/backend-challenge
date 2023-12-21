import { AuthController } from '../../../../application/controllers';
import { createAuthService } from '../../domain/services';

export function createAuthController(): AuthController {
  const authService = createAuthService();
  return new AuthController(authService);
}
