import client from '../database'

export type Order = {
  prod_id: string
  quantity: number
  user_id: number
  status: string
}

export class OrderStore {
  async getCurrentOrder(user: string) {
    try {
      const query = "SELECT * FROM orders WHERE user_id = ($1) AND status = 'active'"
      const conn = await client.connect()
      const result = await conn.query(query, [user])

      conn.release()

      return result.rows[0]
    } catch (error) {
      return error
    }
  }

  async getCompletedOrder(user: string) {
    try {
      const query = "SELECT * FROM orders WHERE user_id = ($1) AND status = 'complete'"
      const conn = await client.connect()
      const result = await conn.query(query, [user])

      conn.release()

      return result.rows[0]
    } catch (error) {
      return error
    }
  }

  async createOrder(o: Order) {
    try {
      const conn = await client.connect()
      const sql = `INSERT INTO
         orders (prod_id, quantity, user_id, status)
         VALUES
         ($1, $2, $3, $4) RETURNING *`

      const result = await conn.query(sql, [o.prod_id, o.quantity, o.user_id, o.status])
      const order = result.rows[0]

      conn.release()

      if (order) {
        return true
      }
    } catch (err) {
      throw new Error(`unable create order`)
    }
  }
}
