import { AuthService } from '../../../../domain/services';
import { createUserService } from './user-service-factory';

export function createAuthService(): AuthService {
  const userService = createUserService();
  return new AuthService(userService);
}
