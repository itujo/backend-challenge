import { eq } from 'drizzle-orm';
import { type User } from '../../domain/entities';
import { dbClient } from '../database';
import { users } from '../database/schema';
import { ApplicationError } from '../../shared/errors';

export class UserRepository {
  async createUser(userData: User): Promise<User> {
    try {
      const [returnUser] = await dbClient
        .insert(users)
        .values(userData)
        .returning();
      if (!returnUser) throw new ApplicationError('user not created', 400);
      return returnUser;
    } catch (error: any) {
      if (error.code === '23505') {
        throw new ApplicationError('user already exists', 400);
      }
      throw new ApplicationError('user not created', 500);
    }
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
    const [updatedUser] = await dbClient
      .update(users)
      .set({ balance: amount.toString() })
      .where(eq(users.id, userId))
      .returning();

    if (!updatedUser) throw new ApplicationError('deposit failed', 500);
    return updatedUser;
  }

  async getBalance(userId?: number): Promise<number> {
    if (!userId || !Number.isInteger(userId)) {
      throw new ApplicationError('user not found', 404);
    }
    const user = await this.findUserById(userId);
    if (!user) throw new ApplicationError('user not found', 404);
    return Number(user.balance);
  }
}
