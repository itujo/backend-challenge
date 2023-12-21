import { UserRepository } from '../../infra/repositories';

export class BalanceService {
  private readonly userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }

  async getBalance(userId?: number): Promise<number | undefined> {
    return await this.userRepository.getBalance(userId);
  }
}
