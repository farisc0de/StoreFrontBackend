import client from '../database'
import { OrderProductStore, OrderProducts } from './OrderProducts'

export type Order = {
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
         orders (user_id, status)
         VALUES
         ($1, $2) RETURNING *`

      const result = await conn.query(sql, [o.user_id, o.status])

      conn.release()

      const order = result.rows[0]

      return order
    } catch (err) {
      throw new Error(`unable create order`)
    }
  }

  async addProductToOrder(order: OrderProductStore): Promise<OrderProductStore> {
    try {
      const o = new OrderProducts()
      return o.addProductToOrder(order)
    } catch (error) {
      throw new Error(`unable to add product to order`)
    }
  }

  async getProductQuantity(order_id: number): Promise<number> {
    try {
      const o = new OrderProducts()
      return o.getProductQuantity(order_id)
    } catch (error) {
      throw new Error(`unable to calculate quantity`)
    }
  }
}
