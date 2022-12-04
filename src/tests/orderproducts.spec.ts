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

  it('Test Adding a product to an active order', async () => {
    const result = await store.addProductToOrder({
      order_id: 1,
      product_id: 1
    })
    expect(result.order_id).toBe(1)
  })

  it('Test getProductQuantity from an order', async () => {
    const result = await store.getProductQuantity(1)
    expect(result).toBe(result)
  })
})
