import { NotFoundError } from './errors/not-found-error'
import { InMemoryMealRepository } from 'test/repositories/in-memory-meal-repository'
import { FetchMealsUseCase } from './fetch-meals'
import { makeMeal } from 'test/factories/make-meal'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'

describe('Fetch Meals Use Case', () => {
  let inMemoryMealRepository: InMemoryMealRepository
  let sut: FetchMealsUseCase

  beforeEach(() => {
    inMemoryMealRepository = new InMemoryMealRepository()
    sut = new FetchMealsUseCase(inMemoryMealRepository)
  })

  it('should be able to return all of a user meals', async () => {
    inMemoryMealRepository.create(makeMeal({ userId: new UniqueEntityID('1') }))
    inMemoryMealRepository.create(makeMeal({ userId: new UniqueEntityID('1') }))
    inMemoryMealRepository.create(makeMeal({ userId: new UniqueEntityID('2') }))

    const result = await sut.execute({
      userId: '1'
    })

    expect(result.isRight).toBeTruthy()
    expect(result.value['meals']).toHaveLength(2)
  })

  it('should throw an error if it doesnt find any meals with the same user id', async () => {
    const result = await sut.execute({
      userId: 'any-user-id'
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(NotFoundError)
  })
})
