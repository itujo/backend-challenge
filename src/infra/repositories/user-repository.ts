import { eq } from 'drizzle-orm';
import { type User } from '../../domain/entities';
import { dbClient } from '../database';
import { users } from '../database/schema';
import { ApplicationError } from '../../shared/errors';
import { type BitcoinBalanceRepository } from './bitcoin-balance-repository';

export class UserRepository {
  constructor(
    private readonly bitcoinBalanceRepository: BitcoinBalanceRepository,
  ) {}

  async createUser(userData: User): Promise<User> {
    const user = await this.findUserByEmail(userData.email);
    if (user) {
      throw new ApplicationError('user already exists', 400);
    }
    const [returnUser] = await dbClient
      .insert(users)
      .values(userData)
      .returning();
    if (!returnUser) throw new ApplicationError('user not created', 400);

    await this.bitcoinBalanceRepository.createBalance(returnUser.id);

    return returnUser;
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    const user = await dbClient.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    });
    return user;
  }

  async findUserById(id: number): Promise<User | undefined> {
    const user = await dbClient.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, id),
    });
    return user;
  }

  async depositMoney(userId: number, amount: number): Promise<User> {
    const { balance: oldBalance } = await this.getBalance(userId);

    const newBalance = oldBalance + amount;

    const [updatedUser] = await dbClient
      .update(users)
      .set({ balance: newBalance.toString() })
      .where(eq(users.id, userId))
      .returning();

    if (!updatedUser) throw new ApplicationError('deposit failed', 500);

    return updatedUser;
  }

  async withdrawMoney(userId: number, amount: number): Promise<User> {
    const { balance: oldBalance } = await this.getBalance(userId);

    const newBalance = oldBalance - amount;

    if (newBalance < 0) {
      throw new ApplicationError('insufficient balance', 400);
    }

    const [updatedUser] = await dbClient
      .update(users)
      .set({ balance: newBalance.toString() })
      .where(eq(users.id, userId))
      .returning();

    if (!updatedUser) throw new ApplicationError('deposit failed', 500);

    return updatedUser;
  }

  async getBalance(userId?: number): Promise<{
    balance: number;
    bitcoinBalance: number;
  }> {
    if (!userId || !Number.isInteger(userId)) {
      throw new ApplicationError('user not found', 404);
    }
    const user = await this.findUserById(userId);
    if (!user?.id) throw new ApplicationError('user not found', 404);

    const { balance: bitcoinBalance } =
      await this.bitcoinBalanceRepository.getBalance(user.id);

    const balance = Number(user.balance);
    return { balance, bitcoinBalance: Number(bitcoinBalance) };
  }
}
