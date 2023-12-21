import { type UserRepository } from '../../infra/repositories';
import argon2 from 'argon2';
import { type User } from '../entities';
import { ApplicationError } from '../../shared/errors';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  private async hashPassword(password: string): Promise<string> {
    return await argon2.hash(password);
  }

  async createUser(
    name: string,
    email: string,
    plainPassword: string,
  ): Promise<User> {
    const hashedPassword = await this.hashPassword(plainPassword);
    const userData: User = {
      name,
      email,
      password: hashedPassword,
      balance: '0.00',
    };

    const user = await this.userRepository.createUser(userData);

    return user;
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new ApplicationError('invalid credentials', 401);
    }

    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      throw new ApplicationError('invalid credentials', 401);
    }

    return user;
  }
}
