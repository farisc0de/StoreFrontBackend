import client from '../database'

export type Product = {
  name: string
  price: number
  category: string
}

export class ProductsStore {
  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect()
      const sql = 'SELECT * FROM products ORDER BY id;'

      const res = await conn.query(sql)

      conn.release()

      return res.rows
    } catch (error) {
      throw new Error(`${error}`)
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const conn = await client.connect()
      const sql = `SELECT * FROM products WHERE id = ($1);`

      const res = await conn.query(sql, [id])

      conn.release()

      return res.rows[0]
    } catch (error) {
      throw new Error(`${error}`)
    }
  }

  async showByCategory(id: string): Promise<Product[]> {
    try {
      const conn = await client.connect()
      const sql = `SELECT * FROM products WHERE category = ($1);`

      const res = await conn.query(sql, [id])

      conn.release()

      return res.rows
    } catch (error) {
      throw new Error(`${error}`)
    }
  }

  async create(p: Product): Promise<Product> {
    try {
      const conn = await client.connect()
      const sql = 'INSERT INTO products (name, price, category) VALUES ($1, $2, $3);'

      const res = await conn.query(sql, [p.name, p.price, p.category])

      conn.release()

      return res.rows[0]
    } catch (error) {
      throw new Error(`${error}`)
    }
  }
}
