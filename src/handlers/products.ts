import express, { Request, Response } from 'express'
import { ProductsStore } from '../models/Product'
import dotenv from 'dotenv'
import verifyAuthToken from '../middlewares/verifyToken';

dotenv.config()

const products_routes = (app: express.Application) => {
  app.get('/products', index)
  app.get('/products/:id', show)
  app.post('/products', verifyAuthToken, create)
}

const store = new ProductsStore()
const { TOKEN_SECRET } = process.env

const index = async (req: Request, res: Response) => {
  try {
    const result = await store.index()
    res.json(result)
  } catch (err) {
    throw new Error(`${err}`)
  }
}

const show = async (req: Request, res: Response) => {
  try {
    const result = await store.show(req.params.id)
    res.json(result)
  } catch (err) {
    throw new Error(`${err}`)
  }
}

const create = async (req: Request, res: Response) => {
  try {
    const result = await store.create(req)
    res.json(result)
  } catch (err) {
    throw new Error(`${err}`)
  }
}

export default products_routes
