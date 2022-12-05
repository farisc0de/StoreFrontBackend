import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { DATABASE_HOST, DATABASE_USER, DATABASE_PASS, DATABASE_NAME, DATABASE_NAME_TEST, ENV } =
  process.env

let client: Pool = new Pool()

if (ENV === 'test') {
  client = new Pool({
    host: DATABASE_HOST,
    database: DATABASE_NAME_TEST,
    user: DATABASE_USER,
    password: DATABASE_PASS
  })
}

if (ENV === 'dev') {
  client = new Pool({
    host: DATABASE_HOST,
    database: DATABASE_NAME,
    user: DATABASE_USER,
    password: DATABASE_PASS
  })
}

export default client
