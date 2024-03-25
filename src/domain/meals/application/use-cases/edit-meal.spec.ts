import { InMemoryMealRepository } from 'test/repositories/in-memory-meal-repository'
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { makeUser } from 'test/factories/make-user'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { NotFoundError } from './errors/not-found-error'
import { EditMealUseCase } from './edit-meal'
import { makeMeal } from 'test/factories/make-meal'
import { RequiredFieldsError } from 'src/core/errors/errors/required-fields-error'
import { UnauthorizedError } from './errors/unauthorized-error'

describe('Edit Meal Use Case', () => {
  let inMemoryUserRepository: InMemoryUserRepository
  let inMemoryMealRepository: InMemoryMealRepository
  let sut: EditMealUseCase

  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryMealRepository = new InMemoryMealRepository()
    sut = new EditMealUseCase(inMemoryMealRepository, inMemoryUserRepository)
  })

  it('should be able to edit an existing meal', async () => {
    const user = makeUser()

    await inMemoryUserRepository.create(user)

    const meal = makeMeal({ userId: new UniqueEntityID(user.id.toString()) })

    await inMemoryMealRepository.create(meal)

    const result = await sut.execute({
      mealId: meal.id.toString(),
      name: 'Edit name',
      description: 'Edit description',
      isInTheDiet: false,
      userId: user.id.toString()
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      meal: expect.objectContaining({
        name: 'Edit name',
        description: 'Edit description',
        isInTheDiet: false,
        createdAt: expect.any(Date),
        userId: new UniqueEntityID(user.id.toString())
      })
    })
  })

  it('should not be able to edit an existing meal without required fields', async () => {
    const user = makeUser()

    await inMemoryUserRepository.create(user)

    const meal = makeMeal({ userId: new UniqueEntityID(user.id.toString()) })

    await inMemoryMealRepository.create(meal)

    const result = await sut.execute({
      mealId: meal.id.toString(),
      userId: user.id.toString()
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(RequiredFieldsError)
  })

  it('should not be able to edit a non-existent meal', async () => {
    const user = makeUser()

    await inMemoryUserRepository.create(user)

    const result = await sut.execute({
      mealId: 'non-existent-meal-id',
      name: 'Edit name',
      userId: user.id.toString()
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotFoundError)
  })

  it('should not be able to edit a meal without user id', async () => {
    const meal = makeMeal()

    await inMemoryMealRepository.create(meal)

    const result = await sut.execute({
      mealId: meal.id.toString(),
      description: 'Edit description',
      userId: 'non-existent-user-id'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotFoundError)
  })

  it('should not be able to edit a meal that does not belong to the user', async () => {
    const user = makeUser({}, new UniqueEntityID('1'))

    await inMemoryUserRepository.create(user)

    const meal = makeMeal({ userId: new UniqueEntityID('2') })

    await inMemoryMealRepository.create(meal)

    const result = await sut.execute({
      mealId: meal.id.toString(),
      isInTheDiet: true,
      userId: user.id.toString()
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UnauthorizedError)
  })
})
