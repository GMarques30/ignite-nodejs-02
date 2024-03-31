import { Either, left, right } from 'src/core/either'
import { MealRepository } from '../repositories/meal-repository'
import { NotFoundError } from './errors/not-found-error'
import { Meal } from '../../enterprise/entities/meal'
import { UnauthorizedError } from './errors/unauthorized-error'

interface GetMealByIdInput {
  mealId: string
  userId: string
}

type GetMealByIdOutput = Either<
  NotFoundError | UnauthorizedError,
  {
    meal: Meal
  }
>

export class GetMealByIdUseCase {
  constructor(private readonly mealRepository: MealRepository) {}

  async execute({
    mealId,
    userId
  }: GetMealByIdInput): Promise<GetMealByIdOutput> {
    const meal = await this.mealRepository.findById(mealId)

    if (!meal) return left(new NotFoundError('Meal'))

    const isMealBelongThisUser = meal.userId.toString() === userId

    if (!isMealBelongThisUser) return left(new UnauthorizedError())

    return right({
      meal
    })
  }
}
