import { makeUser } from 'test/factories/make-user'
import { FakeHasher } from 'test/hasher/fake-hasher'
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { AuthUseCase } from './auth'
import { FakeEncrypter } from 'test/hasher/fake-encrypter'

describe('Auth Use Case', () => {
  let fakeHasher: FakeHasher
  let fakeEncrypter: FakeEncrypter
  let inMemoryUserRepository: InMemoryUserRepository
  let sut: AuthUseCase

  beforeEach(() => {
    fakeHasher = new FakeHasher()
    fakeEncrypter = new FakeEncrypter()
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new AuthUseCase(inMemoryUserRepository, fakeHasher, fakeEncrypter)
  })

  it('should be able auth a user', async () => {
    const user = makeUser({
      email: 'johndoe@example.com',
      password: await fakeHasher.hash('123456')
    })

    await inMemoryUserRepository.create(user)

    const result = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456'
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      accessToken: expect.any(String)
    })
  })
})
