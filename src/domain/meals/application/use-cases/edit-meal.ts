import { Either, left, right } from 'src/core/either'
import { MealRepository } from '../repositories/meal-repository'
import { NotFoundError } from './errors/not-found-error'
import { Meal } from '../../enterprise/entities/meal'
import { UnauthorizedError } from './errors/unauthorized-error'
import { RequiredFieldsError } from 'src/core/errors/errors/required-fields-error'

interface EditMealInput {
  mealId: string
  userId: string
  name?: string
  description?: string
  isInTheDiet?: boolean
  createdAt?: Date
}

type EditMealOutput = Either<
  RequiredFieldsError | NotFoundError | UnauthorizedError,
  {
    meal: Meal
  }
>

export class EditMealUseCase {
  constructor(private readonly mealRepository: MealRepository) {}

  async execute({
    mealId,
    name,
    description,
    isInTheDiet,
    createdAt,
    userId
  }: EditMealInput): Promise<EditMealOutput> {
    if (!name && !description && !isInTheDiet && !createdAt) {
      return left(new RequiredFieldsError())
    }

    const meal = await this.mealRepository.findById(mealId)

    if (!meal) return left(new NotFoundError('Meal'))

    const wasTheUserWhoCreatedThisMeal = meal.userId.toString() === userId

    if (!wasTheUserWhoCreatedThisMeal) return left(new UnauthorizedError())

    meal.name = name ?? meal.name
    meal.description = description ?? meal.description
    meal.isInTheDiet = isInTheDiet ?? meal.isInTheDiet
    meal.createdAt = createdAt ?? meal.createdAt

    await this.mealRepository.save(meal)

    return right({
      meal
    })
  }
}
