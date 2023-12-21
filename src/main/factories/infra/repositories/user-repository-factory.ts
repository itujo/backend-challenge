import {
  BitcoinBalanceRepository,
  UserRepository,
} from '../../../../infra/repositories';

export function createUserRepository(): UserRepository {
  const bitcoinBalanceRepository = new BitcoinBalanceRepository();
  return new UserRepository(bitcoinBalanceRepository);
}
