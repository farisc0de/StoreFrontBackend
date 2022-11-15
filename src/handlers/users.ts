import express, { Request, Response } from 'express'
import { User } from '../models/User'
import jwt from 'jsonwebtoken'

const users_routes = (app: express.Application) => {
  app.get('/users', (req: Request, res: Response) => {
    res.send('this is users INDEX')
  })
  app.post('/login', authenticate)
}

//const store = new UserStore()

const authenticate = async (req: Request, res: Response) => {
  // const user: User = {
  //   username: req.body.username,
  //   password: req.body.password
  // }
  // try {
  //   const u = await store.authenticate(user.username, user.password)
  //   var token = jwt.sign({ user: u }, process.env.TOKEN_SECRET)
  //   res.json(token)
  // } catch (error) {
  //   res.status(401)
  //   res.json({ error })
  // }
}

export default users_routes
