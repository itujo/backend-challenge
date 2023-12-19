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
      throw new Error('Usuário não encontrado.');
    }

    const oldBalance = user.balance;
    console.log({ oldBalance });

    const amountToDeposit = +oldBalance + amount;

    console.log({ amountToDeposit });

    await this.userRepository.depositMoney(userId, amountToDeposit);

    return user;
  }
}
