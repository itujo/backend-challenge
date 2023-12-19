import '../../main/config/dotenv';

import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

import { migrationConn } from './database';

async function migration(): Promise<void> {
  const connection = migrationConn;

  const dbConn = drizzle(connection);

  await migrate(dbConn, { migrationsFolder: 'drizzle' });

  console.log('Migrations applied successfully!');

  await connection.end();

  process.exit();
}

migration().catch((err) => {
  console.log(err);
});
