import supertest from 'supertest'
import app from '../index'

const request = supertest(app)

const dummy_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InBhc3N3b3JkIjoiJDJiJDEwJDBmdDVrTFBNNmxua0hneHdYbnNtZi5nTlVFOHRhc1A0UUxNWkNZYzgyeS4wOVlEN2lKQzNtIn0sImlhdCI6MTY2ODk3MDMyOX0.6MNMmHabT7R71srarlkayui1y0vRucPWKdX1ynJOdcs'

describe('Test endpoint response', () => {
  it('test hello world endpoint', async () => {
    const response = await request.get('/')
    expect(response.status).toBe(200)
  })
})

describe('Test orders endpoints response', () => {
  it('Test active orders endpoint', async () => {
    const response = await request
      .get('/orders/1/active')
      .set('Authorization', 'bearer ' + dummy_token)
    expect(response.status).toBe(200)
  })

  it('Test completed orders endpoint', async () => {
    const response = await request
      .get('/orders/1/completed')
      .set('Authorization', 'bearer ' + dummy_token)
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
      .set('Authorization', 'bearer ' + dummy_token)
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

  it('Test GET /products/:id endpoint', async () => {
    const response = await request.get('/product/1')
    expect(response.status).toBe(200)
  })
})

describe('Test users endpoints response', () => {
  it('test GET /users endpoint', async () => {
    const response = await request.get('/users').set('Authorization', 'bearer ' + dummy_token)
    expect(response.status).toBe(200)
  })

  it('test POST /login endpoint', async () => {
    const response = await request.post('/login').send({
      username: 'faris',
      password: 'faris'
    })
    expect(response.status).toBe(200)
  })

  it('test POST /register endpoint', async () => {
    const response = await request.post('/register').send({
      firstname: 'Faris',
      lastname: 'AL-Otaibi',
      username: 'faris',
      password: 'faris'
    })
    expect(response.status).toBe(200)
  })

  it('test POST /user/:id endpoint', async () => {
    const response = await request.post('/register').send({
      firstname: 'Faris',
      lastname: 'AL-Otaibi',
      username: 'faris',
      password: 'faris'
    })
    expect(response.status).toBe(200)
  })
})
