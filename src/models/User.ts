import client from '../database'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

export type User = {
  firstname: string
  lastname: string
  username: string
  password: string
}

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM users;'

      const res = await conn.query(sql)

      conn.release()

      return res.rows
    } catch (error) {
      throw new Error(`${error}`)
    }
  }

  async create(u: User): Promise<User> {
    const pepper = BCRYPT_PASSWORD
    const saltRounds = SALT_ROUNDS ?? '10'
    try {
      const conn = await client.connect()
      const sql = `INSERT INTO
         users(firstname, lastname, username, password)
         VALUES
         ($1, $2, $3, $4) RETURNING *`

      const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds))

      const result = await conn.query(sql, [u.firstname, u.lastname, u.username, hash])

      conn.release()

      const user = result.rows[0]

      return user
    } catch (err) {
      throw new Error(`unable create user (${u.username}): ${err}`)
    }
  }

  async authenticate(username: string, password: string): Promise<User | null> {
    const pepper = BCRYPT_PASSWORD
    const conn = await client.connect()
    const sql = 'SELECT * FROM users WHERE username=($1)'

    const result = await conn.query(sql, [username])

    if (result.rows.length) {
      const user = result.rows[0]
      if (bcrypt.compareSync(password + pepper, user.password)) {
        return user
      }
    }

    return null
  }

  async show(user_id: string): Promise<User | null> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM users WHERE id = ($1)'
      const result = await conn.query(sql, [user_id])

      conn.release()

      return result.rows[0]
    } catch (error) {
      return null
    }
  }
}
