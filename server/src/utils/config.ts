import dotenv from 'dotenv';

dotenv.config();

const NODE_ENV = process.env.NODE_ENV || 'production';

export default {
  NODE_ENV,
  REDIS_URL: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
  BG_TASKS_QUEUE: process.env.BG_TASKS_QUEUE || 'bg-tasks',
  JWT: process.env.JWT || '',
  MONGO: process.env.MONGO || '',
};
