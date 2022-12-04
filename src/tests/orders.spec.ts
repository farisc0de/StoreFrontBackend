import { OrderStore, Order } from '../models/Order'

const store = new OrderStore()

describe('Test Order Model', () => {
  it('Test create action', async () => {
    const order: Order = {
      user_id: 1,
      status: 'active'
    }
    const result = await store.createOrder(order)
    expect(result.user_id).toBe(1)
  })

  it('Test get active action', async () => {
    const result = await store.getCurrentOrder('1')
    expect(result.user_id).toBe(1)
  })

  it('Test get completed action', async () => {
    const result = await store.getCompletedOrder('1')
    expect(result.user_id).toBe(1)
  })
})
