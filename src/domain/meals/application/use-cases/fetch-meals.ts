import { Either, left, right } from 'src/core/either'
import { Meal } from '../../enterprise/entities/meal'
import { MealRepository } from '../repositories/meal-repository'
import { NotFoundError } from './errors/not-found-error'

interface FetchMealsInput {
  userId: string
}

type FetchMealsOutput = Either<
  NotFoundError,
  {
    meals: Meal[]
  }
>

export class FetchMealsUseCase {
  constructor(private readonly mealRepository: MealRepository) {}

  async execute({ userId }: FetchMealsInput): Promise<FetchMealsOutput> {
    const meals = await this.mealRepository.findMany(userId)

    if (!meals) return left(new NotFoundError('Meals'))

    return right({
      meals
    })
  }
}
