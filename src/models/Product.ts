import client from '../database'

export type Products = {
  id: number
  name: string
  price: number
  catigory: string
}

export class ProductsStore {
  async index(): Promise<Products[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM products;'

      const res = await conn.query(sql)

      conn.release()

      return res.rows
    } catch (error) {
      throw new Error(`${error}`)
    }
  }

  async show(id: string): Promise<Products[]> {
    try {
      const conn = await client.connect()
      const sql = `SELECT * FROM products WHERE id = ${id};`

      const res = await conn.query(sql)

      conn.release()

      return res.rows
    } catch (error) {
      throw new Error(`${error}`)
    }
  }
}
