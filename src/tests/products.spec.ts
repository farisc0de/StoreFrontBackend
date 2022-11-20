import supertest from 'supertest'
import app from '../index'

const request = supertest(app)

const dummy_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJmaXJzdG5hbWUiOiJGYXJpcyIsImxhc3RuYW1lIjoiQUwtT3RhaWJpIiwidXNlcm5hbWUiOiJmYXJpcyIsInBhc3N3b3JkIjoiJDJiJDEwJFcuL1dzOEFUOE94Ny54VmlDdk5HWXVnaGRRbTB4aGhCZDZzVEx6U0x3Mm1OZXdWSDJEb2QuIn0sImlhdCI6MTY2ODkyNjAzOX0.xzImXW-3Ug5Qn2ClbYKoaogahoBGaEkHi_Blk6qyIq4'

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
    const response = await request.get('/products/1')
    expect(response.status).toBe(200)
  })
})
