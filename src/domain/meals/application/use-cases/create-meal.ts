import { MealRepository } from './../repositories/meal-repository'
import { Meal } from '../../enterprise/entities/meal'
import { Either, right } from 'src/core/either'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'

interface CreateMealInput {
  name: string
  description: string
  isInTheDiet: boolean
  createdAt?: Date
  userId: string
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
    createdAt,
    userId
  }: CreateMealInput): Promise<CreateMealOutput> {
    const meal = Meal.create({
      name,
      description,
      isInTheDiet,
      createdAt,
      userId: new UniqueEntityID(userId)
    })

    await this.mealRepository.create(meal)

    return right({
      meal
    })
  }
}
