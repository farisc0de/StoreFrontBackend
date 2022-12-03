import client from '../database'

export type OrderProductStore = {
  order_id: number
  product_id: number
}

export class OrderProducts {
  async addProductToOrder(o: OrderProductStore): Promise<OrderProductStore> {
    try {
      const conn = await client.connect()
      const sql = 'INSERT INTO OrdersProduct (order_id, product_id) VALUES ($1, $2)'
      const result = await conn.query(sql, [o.order_id, o.product_id])
      conn.release()
      const order = result.rows[0]
      return order
    } catch (error) {
      throw new Error(`unable create order`)
    }
  }
}
