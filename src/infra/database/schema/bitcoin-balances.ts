import { pgTable, integer, numeric, timestamp } from 'drizzle-orm/pg-core';
import { users } from './users';

export const bitcoinBalances = pgTable('bitcoin_balances', {
  userId: integer('user_id')
    .references(() => users.id)
    .primaryKey(),
  balance: numeric('balance', { precision: 19, scale: 4 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
