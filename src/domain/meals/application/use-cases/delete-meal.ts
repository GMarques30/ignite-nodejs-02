import { Either, left, right } from 'src/core/either'
import { MealRepository } from '../repositories/meal-repository'
import { NotFoundError } from './errors/not-found-error'
import { UnauthorizedError } from './errors/unauthorized-error'

interface DeleteMealInput {
  mealId: string
  userId: string
}

type DeleteMealOutput = Either<NotFoundError | UnauthorizedError, object>

export class DeleteMealUseCase {
  constructor(private readonly mealRepository: MealRepository) {}

  async execute({
    mealId,
    userId
  }: DeleteMealInput): Promise<DeleteMealOutput> {
    const meal = await this.mealRepository.findById(mealId)

    if (!meal) return left(new NotFoundError('Meal'))

    if (userId !== meal.userId.toString()) return left(new UnauthorizedError())

    await this.mealRepository.delete(meal)

    return right({})
  }
}
