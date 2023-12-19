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
}
