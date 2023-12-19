import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import databaseEnv from '../../main/config/environments/database';
import * as schema from './schema';

const {
  postgres: { username, password, db, host },
} = databaseEnv;

const databaseUrl = `postgres://${username}:${password}@${host}:5432/${db}`;

const migrationConn = postgres(databaseUrl, { max: 1 });

const queryClient = postgres(databaseUrl);
const dbClient = drizzle(queryClient, { schema });

export { dbClient, migrationConn };
