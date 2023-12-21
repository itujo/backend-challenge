import {
  pgTable,
  serial,
  integer,
  numeric,
  timestamp,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { users } from './users';

export const transactionTypeEnum = pgEnum('transaction_type', [
  'deposit',
  'purchase',
  'sale',
]);

export const transactions = pgTable('transactions', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  type: transactionTypeEnum('transaction_type').notNull(),
  amount: numeric('amount', { precision: 19, scale: 4 }).notNull(),
  pricePerUnit: numeric('price_per_unit', { precision: 19, scale: 4 }),
  totalValue: numeric('total_value', { precision: 19, scale: 4 }).notNull(),
  date: timestamp('date').defaultNow(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
