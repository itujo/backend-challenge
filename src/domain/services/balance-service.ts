import { type UserRepository } from '../../infra/repositories';

export class BalanceService {
  constructor(private readonly userRepository: UserRepository) {}

  async getBalance(userId?: number): Promise<number | undefined> {
    return await this.userRepository.getBalance(userId);
  }
}
