import { type UserRepository } from '../../infra/repositories';

export class BalanceService {
  constructor(private readonly userRepository: UserRepository) {}

  async getBalance(
    userId?: number,
  ): Promise<{ balance: number; bitcoinBalance: number }> {
    return await this.userRepository.getBalance(userId);
  }
}
