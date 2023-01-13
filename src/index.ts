import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
import bodyparser from 'body-parser'
import client from './database'
import cors from 'cors'
import orders_routes from './handlers/orders'
import products_routes from './handlers/products'
import users_routes from './handlers/users'

dotenv.config()

const PORT = process.env.PORT || 3000

const app: Application = express()

const corsOptions = {
  origin: process.env.URL,
  optionSuccessStatus: 200
}

app.use(morgan('short'))
app.use(cors(corsOptions))
app.use(bodyparser.json())

orders_routes(app)
products_routes(app)
users_routes(app)

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello World 🌍'
  })
})

app.listen(PORT, () => {
  console.log(`Server is starting at port:${PORT}`)
})

client.connect()

export default app
