import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';

import config from '../config/config';
import { users } from './schemas/users';

const pool = new Pool({
  connectionString: config.databaseURL,
});

const db = drizzle(pool, { schema: { users } });

export default db;
