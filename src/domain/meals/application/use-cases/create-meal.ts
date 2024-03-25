import { MealRepository } from './../repositories/meal-repository'
import { Meal } from '../../enterprise/entities/meal'
import { Either, left, right } from 'src/core/either'
import { UserRepository } from 'src/domain/users/application/repositories/user-repository'
import { NotFoundError } from './errors/not-found-error'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'

interface CreateMealInput {
  name: string
  description: string
  isInTheDiet: boolean
  createdAt?: Date
  userId: string
}

type CreateMealOutput = Either<
  NotFoundError,
  {
    meal: Meal
  }
>

export class CreateMealUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly mealRepository: MealRepository
  ) {}

  async execute({
    name,
    description,
    isInTheDiet,
    createdAt,
    userId
  }: CreateMealInput): Promise<CreateMealOutput> {
    const user = await this.userRepository.findById(userId)

    if (!user) return left(new NotFoundError('User'))

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
