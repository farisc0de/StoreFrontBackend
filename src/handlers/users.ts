import express, { Request, Response } from 'express'
import { User, UserStore } from '../models/User'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import verifyAuthToken from '../middlewares/verifyToken'

dotenv.config()

const users_routes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index)
  app.get('/users/:id', verifyAuthToken, show)
  app.get('/users/create', verifyAuthToken, create)
  app.post('/login', authenticate)
  app.post('/register', register)
}

const store = new UserStore()

const { TOKEN_SECRET } = process.env

const index = async (req: Request, res: Response) => {
  try {
    const result = await store.index()
    res.json(result)
  } catch (err) {
    throw new Error(`${err}`)
  }
}

const create = async (req: Request, res: Response) => {
  const user: User = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password
  }

  try {
    const u = await store.create(user)
    var token = jwt.sign({ user: u }, TOKEN_SECRET as string)
    res.json(token)
  } catch (error) {
    res.status(401)
    res.json({ error })
  }
}

const register = async (req: Request, res: Response) => {
  const user: User = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: req.body.password
  }

  try {
    const u = await store.create(user)
    var token = jwt.sign({ user: u }, TOKEN_SECRET as string)
    res.json(token)
  } catch (error) {
    res.status(401)
    res.json({ error })
  }
}

const show = async (req: Request, res: Response) => {
  try {
    const u = await store.show(req.params.id)
    res.status(200)
    res.json(u)
  } catch (err) {
    res.status(404)
    res.json({ err })
  }
}

const authenticate = async (req: Request, res: Response) => {
  const user: User = {
    firstname: '',
    lastname: '',
    username: req.body.username,
    password: req.body.password
  }

  const u = await store.authenticate(user.username, user.password)
  if (u != null) {
    var token = jwt.sign({ user: u }, TOKEN_SECRET as string)
    res.json(token)
  } else {
    res.status(401)
    res.json('Password is incorrect')
  }
}

export default users_routes
