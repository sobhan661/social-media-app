import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const config = {
  databaseURL: process.env.DATABASE_URL,
  saltRounds: Number(process.env.SALT_ROUNDS)!,
  port: process.env.PORT,
};

export default config;
