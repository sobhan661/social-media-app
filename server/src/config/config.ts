import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

const config = {
  databaseURL: process.env.DATABASE_URL,
};

export default config;
