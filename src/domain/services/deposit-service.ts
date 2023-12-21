import { ApplicationError } from '../../shared/errors';
import { type UserRepository } from '../../infra/repositories';
import { type User } from '../entities';
import { type EmailService } from '../../infra/services';

export class DepositService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly emailService: EmailService,
  ) {}

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
    await this.emailService.sendDepositEmail(user.email, amount);

    return user;
  }
}
