import { eq } from 'drizzle-orm';
import { type User } from '../../domain/entities';
import { dbClient } from '../database';
import { users } from '../database/schema';

export class UserRepository {
  async createUser(userData: User): Promise<User[]> {
    return await dbClient.insert(users).values(userData).returning();
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

  async depositMoney(userId: number, amount: number): Promise<User[]> {
    console.log({ userId, amount });

    return await dbClient
      .update(users)
      .set({ balance: amount.toString() })
      .where(eq(users.id, userId))
      .returning();
  }

  async getBalance(userId: number): Promise<number | undefined> {
    const user = await this.findUserById(userId);

    return Number(user?.balance);
  }
}
