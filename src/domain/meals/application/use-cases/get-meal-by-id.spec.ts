import { InMemoryMealRepository } from 'test/repositories/in-memory-meal-repository'
import { GetMealByIdUseCase } from './get-meal-by-id'
import { makeMeal } from 'test/factories/make-meal'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { NotFoundError } from './errors/not-found-error'
import { UnauthorizedError } from './errors/unauthorized-error'

describe('Get Meal By Id Use Case', () => {
  let inMemoryMealRepository: InMemoryMealRepository
  let sut: GetMealByIdUseCase

  beforeEach(() => {
    inMemoryMealRepository = new InMemoryMealRepository()
    sut = new GetMealByIdUseCase(inMemoryMealRepository)
  })

  it('should be able to return meal from user', async () => {
    await inMemoryMealRepository.create(
      makeMeal({ userId: new UniqueEntityID('1') }, new UniqueEntityID('1'))
    )

    const result = await sut.execute({ mealId: '1', userId: '1' })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual(
      expect.objectContaining({
        meal: expect.objectContaining({
          id: new UniqueEntityID('1'),
          userId: new UniqueEntityID('1')
        })
      })
    )
  })

  it('should not be able to return a missing meal', async () => {
    const result = await sut.execute({
      mealId: 'non-existent-meal-id',
      userId: '1'
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotFoundError)
  })

  it('should not be able to return a meal that does not belong to the user', async () => {
    await inMemoryMealRepository.create(
      makeMeal({ userId: new UniqueEntityID('1') }, new UniqueEntityID('1'))
    )

    const result = await sut.execute({
      mealId: '1',
      userId: 'non-existent-user-id'
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(UnauthorizedError)
  })
})
