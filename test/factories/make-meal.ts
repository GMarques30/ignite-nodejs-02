import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { faker } from '@faker-js/faker'
import { Meal, MealProps } from 'src/domain/meals/enterprise/entities/meal'

export function makeMeal(
  override: Partial<MealProps> = {},
  id?: UniqueEntityID
) {
  const meal = Meal.create(
    {
      name: faker.lorem.sentence(),
      description: faker.lorem.text(),
      isInTheDiet: true,
      userId: new UniqueEntityID(),
      ...override
    },
    id
  )

  return meal
}
