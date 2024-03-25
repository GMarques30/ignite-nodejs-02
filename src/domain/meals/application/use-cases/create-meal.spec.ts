import { InMemoryMealRepository } from 'test/repositories/in-memory-meal-repository'
import { CreateMealUseCase } from './create-meal'

describe('Create Student Use Case', () => {
  let inMemoryMealRepository: InMemoryMealRepository
  let sut: CreateMealUseCase

  beforeEach(() => {
    inMemoryMealRepository = new InMemoryMealRepository()
    sut = new CreateMealUseCase(inMemoryMealRepository)
  })

  it('should be able create a new meal', async () => {
    const result = await sut.execute({
      name: 'Meal 01',
      description: 'Breakfast',
      isInTheDiet: true
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      meal: expect.objectContaining({
        name: 'Meal 01',
        description: 'Breakfast',
        isInTheDiet: true,
        createdAt: expect.any(Date)
      })
    })
  })
})
