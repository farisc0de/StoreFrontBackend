import express, { Request, Response } from 'express'
import { ProductsStore, Product } from '../models/Product'
import dotenv from 'dotenv'
import verifyAuthToken from '../middlewares/verifyToken'

dotenv.config()

const products_routes = (app: express.Application) => {
  app.get('/products', index)
  app.get('/product/:id', show)
  app.get('/products/:id', showByCategory)
  app.post('/products', verifyAuthToken, create)
}

const store = new ProductsStore()

const index = async (req: Request, res: Response) => {
  try {
    const result = await store.index()
    res.json(result)
  } catch (err) {
    res.status(400)
    throw new Error(`${err}`)
  }
}

const show = async (req: Request, res: Response) => {
  try {
    const result = await store.show(req.params.id)
    res.json(result)
  } catch (err) {
    res.status(404)
    throw new Error(`${err}`)
  }
}

const showByCategory = async (req: Request, res: Response) => {
  try {
    const result = await store.showByCategory(req.params.id)
    res.json(result)
  } catch (err) {
    res.status(404)
    throw new Error(`${err}`)
  }
}

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: parseInt(req.body.price),
      category: req.body.category
    }
    const result = await store.create(product)
    res.json(result)
  } catch (err) {
    res.status(401)
    throw new Error(`${err}`)
  }
}

export default products_routes
