import express, { Request, Response } from 'express'
import Order from '../models/Order'

const orders_routes = (app: express.Application) => {
  app.get('/orders', (_req: Request, res: Response) => {
    try {
      res.send('this is the INDEX route')
    } catch (err) {
      res.status(400)
      res.json(err)
    }
  })

  app.get('/orders/:id', (_req: Request, res: Response) => {
    try {
      res.send('this is the SHOW route')
    } catch (err) {
      res.status(400)
      res.json(err)
    }
  })

  app.post('/orders', (req: Request, res: Response) => {
    const order: Order = {
      name: req.body.title,
      content: req.body.content
    }
    try {
      res.send('this is the CREATE route')
    } catch (err) {
      res.status(400)
      res.json(err)
    }
  })

  app.put('/orders/:id', (req: Request, res: Response) => {
    const order: Order = {
      id: req.params.id,
      name: req.body.title,
      content: req.body.content
    }
    try {
      res.send('this is the EDIT route')
    } catch (err) {
      res.status(400)
      res.json(err)
    }
  })

  app.delete('/orders/:id', (_req: Request, res: Response) => {
    try {
      res.send('this is the DELETE route')
    } catch (err) {
      res.status(400)
      res.json(err)
    }
  })
}

export default orders_routes
