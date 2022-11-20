import supertest from 'supertest'
import app from '../index'

const request = supertest(app)

const dummy_token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJmaXJzdG5hbWUiOiJGYXJpcyIsImxhc3RuYW1lIjoiQUwtT3RhaWJpIiwidXNlcm5hbWUiOiJmYXJpcyIsInBhc3N3b3JkIjoiJDJiJDEwJFcuL1dzOEFUOE94Ny54VmlDdk5HWXVnaGRRbTB4aGhCZDZzVEx6U0x3Mm1OZXdWSDJEb2QuIn0sImlhdCI6MTY2ODkyNjAzOX0.xzImXW-3Ug5Qn2ClbYKoaogahoBGaEkHi_Blk6qyIq4'

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
