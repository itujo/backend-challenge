import { UserService } from '../../../../domain/services';
import { createUserRepository } from '../../infra/repositories';

export function createUserService(): UserService {
  const userRepository = createUserRepository();
  return new UserService(userRepository);
}
