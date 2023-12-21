import { ApplicationError } from '../../shared/errors';
import { type UserRepository } from '../../infra/repositories';
import { type User } from '../entities';
import { type EmailService } from '../../infra/services';
import { type TransactionService } from './transaction-service';

export class DepositService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly emailService: EmailService,
    private readonly transactionService: TransactionService,
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

    await this.userRepository.depositMoney(userId, amount);

    await this.transactionService.create({
      amount: amount.toString(),
      date: new Date(),
      totalValue: amount.toString(),
      type: 'deposit',
      userId,
    });

    // this makes the response take longer, if we implement a queue system it will be better
    await this.emailService.sendDepositEmail(user.email, amount);

    return user;
  }
}
