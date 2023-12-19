import { UserRepository } from '../../infra/repositories/user-repository';
import argon2 from 'argon2';
import { type User } from '../entities/user';

export class UserService {
  private readonly userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async createUser(
    name: string,
    email: string,
    plainPassword: string,
  ): Promise<User | undefined> {
    const hashedPassword = await argon2.hash(plainPassword);
    const userData: User = {
      name,
      email,
      password: hashedPassword,
      balance: '0.00',
    };
    const user = (await this.userRepository.createUser(userData)).at(0);
    return user;
  }

  async validateUser(email: string, password: string): Promise<false | User> {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) return false;

    const isPasswordValid = await argon2.verify(user.password, password);

    return isPasswordValid ? user : false;
  }
}
