import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

const config = {
  databaseURL: process.env.DATABASE_URL,
  saltRounds: Number(process.env.SALT_ROUNDS)!,
};

export default config;
