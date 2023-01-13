import express, { Request, Response } from 'express'
import verifyAuthToken from '../middlewares/verifyToken'
import { Order, OrderStore } from '../models/Order'
import { OrderProductStore } from '../models/OrderProducts'

const orders_routes = (app: express.Application) => {
  app.get('/orders/:user_id/active', verifyAuthToken, showActive)
  app.get('/orders/:user_id/completed', verifyAuthToken, showCompleted)
  app.get('/order/add/:product_id/:order_id', verifyAuthToken, addProductToOrder)
  app.get('/order/quantity/:order_id', verifyAuthToken, getProductQuantity)
  app.post('/orders', verifyAuthToken, create)
}

const store = new OrderStore()

const showActive = async (req: Request, res: Response) => {
  try {
    res.status(200)
    res.json(await store.getCurrentOrder(req.params.user_id))
  } catch (err) {
    res.status(404)
    res.json({ error: 'No active order for user' })
  }
}

const showCompleted = async (req: Request, res: Response) => {
  try {
    res.status(200)
    res.json(await store.getCompletedOrder(req.params.user_id))
  } catch (err) {
    res.status(404)
    res.json({ error: 'No complete order for user' })
  }
}

const create = async (req: Request, res: Response) => {
  const order: Order = {
    user_id: req.body.user_id,
    status: 'active'
  }

  try {
    res.status(200)
    res.json(await store.createOrder(order))
  } catch (err) {
    res.status(401)
    res.json({ error: 'Could not create an order' })
  }
}

const addProductToOrder = async (req: Request, res: Response) => {
  const order: OrderProductStore = {
    order_id: parseInt(req.params.order_id),
    product_id: parseInt(req.params.product_id)
  }

  try {
    res.status(200)
    res.json(await store.addProductToOrder(order))
  } catch (error) {
    res.status(404)
    res.json({ error: 'Could not add product to order' })
  }
}

const getProductQuantity = async (req: Request, res: Response) => {
  try {
    res.status(200)
    res.json({ quantity: await store.getProductQuantity(parseInt(req.params.order_id)) })
  } catch (error) {
    res.status(404)
    res.json({ error: 'Order not found' })
  }
}

export default orders_routes
