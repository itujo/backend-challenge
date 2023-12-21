import { ApplicationError } from '../../shared/errors';
import { type UserRepository } from '../../infra/repositories';
import { type User } from '../entities';

export class DepositService {
  constructor(private readonly userRepository: UserRepository) {}

  async deposit(userId: number, amount: number): Promise<User> {
    const user = await this.userRepository.findUserById(userId);

    if (!user) {
      throw new ApplicationError('user not found', 404);
    }

    if (amount <= 0) {
      throw new ApplicationError(
        'the amount to deposit must be greater than 0',
        400,
      );
    }

    const oldBalance = user.balance;

    const amountToDeposit = +oldBalance + amount;

    await this.userRepository.depositMoney(userId, amountToDeposit);

    return user;
  }
}
