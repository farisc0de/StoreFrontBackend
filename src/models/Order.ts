import client from '../database'

export type Order = {
  prod_id: string
  quantity: number
  user_id: number
  status: string
}

export class OrderStore {
  async getCurrentOrder(user: string): Promise<Order> {
    try {
      const query = "SELECT * FROM orders WHERE user_id = ($1) AND status = 'active'"
      const conn = await client.connect()
      const result = await conn.query(query, [user])

      conn.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`${err}`)
    }
  }

  async getCompletedOrder(user: string): Promise<Order> {
    try {
      const query = "SELECT * FROM orders WHERE user_id = ($1) AND status = 'complete'"
      const conn = await client.connect()
      const result = await conn.query(query, [user])

      conn.release()

      return result.rows[0]
    } catch (error) {
      throw new Error(`${error}`)
    }
  }

  async createOrder(o: Order): Promise<Order> {
    try {
      const conn = await client.connect()
      const sql = `INSERT INTO
         orders (prod_id, quantity, user_id, status)
         VALUES
         ($1, $2, $3, $4) RETURNING *`

      const result = await conn.query(sql, [o.prod_id, o.quantity, o.user_id, o.status])

      conn.release()

      const order = result.rows[0]

      return order
    } catch (err) {
      throw new Error(`unable create order`)
    }
  }
}
