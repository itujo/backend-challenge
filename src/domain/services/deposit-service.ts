import { ApplicationError } from '../../shared/errors';
import { UserRepository } from '../../infra/repositories';
import { type User } from '../entities';

export class DepositService {
  private readonly userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  async deposit(userId: number, amount: number): Promise<User> {
    const user = await this.userRepository.findUserById(userId);

    if (!user) {
      throw new ApplicationError('user not found', 404);
    }

    const oldBalance = user.balance;

    const amountToDeposit = +oldBalance + amount;

    if (amountToDeposit <= 0) {
      throw new ApplicationError(
        'the amount to deposit must be greater than 0',
        400,
      );
    }

    await this.userRepository.depositMoney(userId, amountToDeposit);

    return user;
  }
}
