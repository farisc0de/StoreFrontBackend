import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { DATABASE_HOST, DATABASE_USER, DATABASE_PASS, DATABASE_NAME } = process.env

const client = new Pool({
  host: DATABASE_HOST,
  user: DATABASE_USER,
  password: DATABASE_PASS,
  database: DATABASE_NAME
})

export default client
