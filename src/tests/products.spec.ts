import { ProductsStore, Product } from '../models/Product'

const store = new ProductsStore()

describe('Test Product Model', () => {
  it('Test show product action', async () => {
    const result = await store.show('1')
    expect(result.name).toBe('Camry 2022')
  })

  it('Test index action', async () => {
    const result = await store.index()
    expect(result[0].name).toBe('Camry 2022')
  })

  it('Test create action', async () => {
    const p: Product = {
      name: 'Ford',
      price: 2500,
      category: '1'
    }
    const result = await store.create(p)
    expect(result).toBeUndefined()
  })

  it('Test show by category action', async () => {
    const result = await store.showByCategory('1')
    expect(result[0].name).toBe('Camry 2022')
  })
})
