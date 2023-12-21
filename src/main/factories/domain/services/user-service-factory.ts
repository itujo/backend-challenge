import { UserService } from '../../../../domain/services';
import { UserRepository } from '../../../../infra/repositories';

export function createUserService(): UserService {
  const userRepository = new UserRepository();
  return new UserService(userRepository);
}
