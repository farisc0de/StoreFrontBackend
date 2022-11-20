import { UserStore, User } from '../models/User'

const store = new UserStore()

describe('Test Product Model', () => {
  it('Test show product action', async () => {
    const result = await store.show('1')
    expect(result?.firstname).toBe('faris')
  })

  it('Test index action', async () => {
    const result = await store.index()
    expect(result[0].firstname).toBe('faris')
  })

  it('Test create action', async () => {
    const u: User = {
      firstname: 'ali',
      lastname: 'ali',
      username: 'ali',
      password: 'ali'
    }
    const result = await store.create(u)
    expect(result.username).toBe('ali')
  })

  it('Test authenticate action', async () => {
    const result = await store.authenticate('faris', 'faris')
    expect(result?.username).toBe('faris')
  })
})
