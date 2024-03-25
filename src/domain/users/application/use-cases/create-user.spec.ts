import { FakeHasher } from 'test/hasher/fake-hasher'
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { CreateUserUseCase } from './create-user'

describe('Create User Use Case', () => {
  let inMemoryUserRepository: InMemoryUserRepository
  let fakeHashGenerator: FakeHasher
  let sut: CreateUserUseCase

  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    fakeHashGenerator = new FakeHasher()
    sut = new CreateUserUseCase(inMemoryUserRepository, fakeHashGenerator)
  })

  it('should be able create a new user', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      user: expect.objectContaining({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456-hashed'
      })
    })
  })

  it('should be able to hash a password before creating a user', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    const hashedPassword = await fakeHashGenerator.hash('123456')

    expect(result.isRight()).toBe(true)
    expect(inMemoryUserRepository.items[0]).toEqual(
      expect.objectContaining({
        password: hashedPassword
      })
    )
  })
})
