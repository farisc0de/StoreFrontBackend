import express, { json, Request, Response } from 'express'
import { User, UserStore } from '../models/User'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import verifyAuthToken from '../middlewares/verifyToken'

dotenv.config()

const users_routes = (app: express.Application) => {
  app.post('/login', authenticate)
  app.post('/register', register)
  app.get('/users', verifyAuthToken, index)
  app.get('/user', verifyAuthToken, show)
  app.post('/users/create', verifyAuthToken, create)
}

const store = new UserStore()

const { TOKEN_SECRET } = process.env

const index = async (req: Request, res: Response) => {
  try {
    const result = await store.index()
    res.status(200)
    res.json(result)
  } catch (err) {
    res.status(401)
    res.json({ err })
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
    const authorizationHeader = req.headers.authorization
    const token = authorizationHeader!.split(' ')[1]
    const user = jwt.decode(token, { json: true })
    const u = await store.show(user?.user.id)
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
    res.json({ message: 'Password is incorrect' })
  }
}

export default users_routes
