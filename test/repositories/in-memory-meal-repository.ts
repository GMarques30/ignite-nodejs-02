import { MealRepository } from 'src/domain/meals/application/repositories/meal-repository'
import { Meal } from 'src/domain/meals/enterprise/entities/meal'

export class InMemoryMealRepository implements MealRepository {
  public items: Meal[] = []

  async create(meal: Meal): Promise<void> {
    this.items.push(meal)
  }

  async findById(id: string): Promise<Meal | null> {
    const meal = this.items.find((meal) => meal.id.toString() === id)

    if (!meal) return null

    return meal
  }

  async save(meal: Meal): Promise<void> {
    const mealIndex = this.items.findIndex(
      (item) => item.id.toString() === meal.id.toString()
    )

    this.items[mealIndex] = meal
  }
}
