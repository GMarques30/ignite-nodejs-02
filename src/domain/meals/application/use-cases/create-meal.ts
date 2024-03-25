import { MealRepository } from './../repositories/meal-repository'
import { Meal } from '../../enterprise/entities/meal'
import { Either, right } from 'src/core/either'

interface CreateMealInput {
  name: string
  description: string
  isInTheDiet: boolean
  createdAt?: Date
}

type CreateMealOutput = Either<
  null,
  {
    meal: Meal
  }
>

export class CreateMealUseCase {
  constructor(private readonly mealRepository: MealRepository) {}

  async execute({
    name,
    description,
    isInTheDiet,
    createdAt
  }: CreateMealInput): Promise<CreateMealOutput> {
    const meal = Meal.create({
      name,
      description,
      isInTheDiet,
      createdAt
    })

    await this.mealRepository.create(meal)

    return right({
      meal
    })
  }
}
