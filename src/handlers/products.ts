import express, { Request, Response } from 'express'
import { ProductsStore } from '../models/Product'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const products_routes = (app: express.Application) => {
  app.get('/products', index)
  app.get('/products/:id', show)
  app.post('/products', create)
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
    const authorizationHeader = req.headers.authorization
    const token = authorizationHeader!.split(' ')[1]
    console.log(token)
    jwt.verify(token, `${TOKEN_SECRET}`)
  } catch (err) {
    res.status(401)
    res.json('Access denied, invalid token')
    return
  }

  try {
    const result = await store.show(req.params.id)
    res.json(result)
  } catch (err) {
    throw new Error(`${err}`)
  }
}

export default products_routes
