import { InMemoryMealRepository } from 'test/repositories/in-memory-meal-repository'
import { CreateMealUseCase } from './create-meal'
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { makeUser } from 'test/factories/make-user'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { NotFoundError } from './errors/not-found-error'

describe('Create Meal Use Case', () => {
  let inMemoryUserRepository: InMemoryUserRepository
  let inMemoryMealRepository: InMemoryMealRepository
  let sut: CreateMealUseCase

  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryMealRepository = new InMemoryMealRepository()
    sut = new CreateMealUseCase(inMemoryUserRepository, inMemoryMealRepository)
  })

  it('should be able create a new meal', async () => {
    const user = makeUser({}, new UniqueEntityID('1'))

    await inMemoryUserRepository.create(user)

    const result = await sut.execute({
      name: 'Meal 01',
      description: 'Breakfast',
      isInTheDiet: true,
      userId: user.id.toString()
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      meal: expect.objectContaining({
        name: 'Meal 01',
        description: 'Breakfast',
        isInTheDiet: true,
        createdAt: expect.any(Date),
        userId: new UniqueEntityID(user.id.toString())
      })
    })
  })

  it('should not be able create a new meal without an existing user', async () => {
    const result = await sut.execute({
      name: 'Meal 01',
      description: 'Breakfast',
      isInTheDiet: true,
      userId: 'non-existent-id'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotFoundError)
  })
})
