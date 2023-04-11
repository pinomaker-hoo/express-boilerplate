import { config } from 'dotenv'
config({ path: `.env` })

export const {
  NODE_ENV,
  PORT,
  LOG_FORMAT,
  DB_HOST,
  DB_PORT,
  DB_DATABASE,
  DB_PASS,
  DB_USER,
} = process.env
