import supertest from 'supertest'
import app from '../index'

const request = supertest(app)

let token: string

describe('Test endpoint response', () => {
  it('test index endpoint', async () => {
    const response = await request.get('/')
    expect(response.status).toBe(200)
  })
})

describe('Test users endpoints response', () => {
  it('test POST /register endpoint', async () => {
    const response = await request.post('/register').send({
      firstname: 'Faris',
      lastname: 'AL-Otaibi',
      username: 'faris',
      password: 'faris'
    })
    token = response.body
    expect(response.status).toBe(200)
  })

  it('test POST /login endpoint', async () => {
    const response = await request.post('/login').send({
      username: 'faris',
      password: 'faris'
    })
    if (token != response.body) {
      token = response.body
    }
    expect(response.status).toBe(200)
  })

  it('test GET /users endpoint', async () => {
    const response = await request.get('/users').set('Authorization', 'bearer ' + token)
    expect(response.status).toBe(200)
  })

  it('test POST /user/:id endpoint', async () => {
    const response = await request
      .post('/register')
      .set('Authorization', 'bearer ' + token)
      .send({
        firstname: 'Faris',
        lastname: 'AL-Otaibi',
        username: 'faris',
        password: 'faris'
      })
    expect(response.status).toBe(200)
  })

  it('test GET /user endpoint', async () => {
    const response = await request.get('/user').set('Authorization', 'bearer ' + token)
    expect(response.status).toBe(200)
  })
})

describe('Test orders endpoints response', () => {
  it('Test active orders endpoint', async () => {
    const response = await request.get('/orders/1/active').set('Authorization', 'bearer ' + token)
    expect(response.status).toBe(200)
  })

  it('Test completed orders endpoint', async () => {
    const response = await request
      .get('/orders/1/completed')
      .set('Authorization', 'bearer ' + token)
    expect(response.status).toBe(200)
  })

  it('Test POST /orders endpoint', async () => {
    const response = await request
      .post('/orders')
      .set('Authorization', 'bearer ' + token)
      .send({
        user_id: 1,
        prod_id: '1, 2, 3,4',
        quantity: 5
      })
    expect(response.status).toBe(200)
  })
})

describe('Test products endpoints response', () => {
  it('Test GET /products endpoint', async () => {
    const response = await request.get('/products')
    expect(response.status).toBe(200)
  })

  it('Test POST /products endpoint', async () => {
    const response = await request
      .post('/products')
      .set('Authorization', 'bearer ' + token)
      .send({
        name: 'Ford',
        price: 5000,
        category: 1
      })
    expect(response.status).toBe(200)
  })

  it('Test GET /product/:id endpoint', async () => {
    const response = await request.get('/product/1')
    expect(response.status).toBe(200)
  })

  it('Test GET /order/add/:product_id/:order_id endpoint', async () => {
    const response = await request.get('/order/add/1/1').set('Authorization', 'bearer ' + token)
    expect(response.status).toBe(200)
  })

  it('Test GET /order/quantity/:order_id endpoint', async () => {
    const response = await request.get('/order/quantity/1').set('Authorization', 'bearer ' + token)
    expect(response.status).toBe(200)
  })
})
