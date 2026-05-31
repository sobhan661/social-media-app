import { defineConfig } from 'drizzle-kit';

import config from './src/config/config';

export default defineConfig({
  schema: './src/db/schemas/*.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
