import client from '../database'

export type OrderProductStore = {
  order_id: number
  product_id: number
}

export class OrderProducts {
  async addProductToOrder(o: OrderProductStore): Promise<OrderProductStore> {
    try {
      const conn = await client.connect()
      const sql = 'INSERT INTO orderproducts (order_id, product_id) VALUES ($1, $2) RETURNING *'
      const result = await conn.query(sql, [o.order_id, o.product_id])
      conn.release()
      const order = result.rows[0]
      return order
    } catch (error) {
      throw new Error(`unable create order`)
    }
  }

  async getProductQuantity(order_id: number): Promise<number> {
    try {
      var count: number = 0
      const conn = await client.connect()
      const sql = 'SELECT * FROM orderproducts WHERE order_id = $1'
      const result = await conn.query(sql, [order_id])
      conn.release()
      return result.rowCount
    } catch (error) {
      return 0
    }
  }
}
