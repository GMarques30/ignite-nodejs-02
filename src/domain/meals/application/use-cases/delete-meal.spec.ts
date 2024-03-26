import { InMemoryMealRepository } from 'test/repositories/in-memory-meal-repository'
import { makeUser } from 'test/factories/make-user'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { NotFoundError } from './errors/not-found-error'
import { DeleteMealUseCase } from './delete-meal'
import { makeMeal } from 'test/factories/make-meal'
import { UnauthorizedError } from './errors/unauthorized-error'

describe('Delete Meal Use Case', () => {
  let inMemoryMealRepository: InMemoryMealRepository
  let sut: DeleteMealUseCase

  beforeEach(() => {
    inMemoryMealRepository = new InMemoryMealRepository()
    sut = new DeleteMealUseCase(inMemoryMealRepository)
  })

  it('should be able delete a meal created by the user', async () => {
    const user = makeUser({}, new UniqueEntityID('1'))
    const meal = makeMeal(
      { userId: new UniqueEntityID(user.id.toString()) },
      new UniqueEntityID('meal-01')
    )

    await inMemoryMealRepository.create(meal)

    const result = await sut.execute({
      userId: user.id.toString(),
      mealId: meal.id.toString()
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryMealRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a meal that does not exist', async () => {
    const user = makeUser()

    const result = await sut.execute({
      userId: user.id.toString(),
      mealId: 'non-existent-meal-id'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotFoundError)
  })

  it('should not be able delete a meal that was not created by the same user', async () => {
    const meal = makeMeal()

    await inMemoryMealRepository.create(meal)

    const result = await sut.execute({
      userId: 'non-existent-user-id',
      mealId: meal.id.toString()
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UnauthorizedError)
  })
})
