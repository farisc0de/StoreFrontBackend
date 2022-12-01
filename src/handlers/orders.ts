import express, { Request, Response } from 'express'
import verifyAuthToken from '../middlewares/verifyToken'
import { Order, OrderStore } from '../models/Order'

const orders_routes = (app: express.Application) => {
  app.get('/orders/:user_id/active', verifyAuthToken, showActive)
  app.get('/orders/:user_id/completed', verifyAuthToken, showCompleted)
  app.post('/orders', verifyAuthToken, create)
  app.post('/order/:user_id', verifyAuthToken, addProductToOrder)
}

const store = new OrderStore()

const showActive = async (req: Request, res: Response) => {
  try {
    res.status(200)
    res.json(await store.getCurrentOrder(req.params.user_id))
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const showCompleted = async (req: Request, res: Response) => {
  try {
    res.status(200)
    res.json(await store.getCompletedOrder(req.params.user_id))
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const create = async (req: Request, res: Response) => {
  const order: Order = {
    user_id: req.body.user_id,
    quantity: req.body.quantity,
    status: 'active'
  }

  try {
    res.status(200)
    res.json(await store.createOrder(order))
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const addProductToOrder = async (req: Request, res: Response) => {
  const order: OrdersProduct = {
    user_id: req.body.user_id,
  }
}
export default orders_routes
