import { MealRepository } from 'src/domain/meals/application/repositories/meal-repository'
import { Meal } from 'src/domain/meals/enterprise/entities/meal'

export class InMemoryMealRepository implements MealRepository {
  public items: Meal[] = []

  async create(meal: Meal): Promise<void> {
    this.items.push(meal)
  }

  async findMany(id: string): Promise<Meal[] | null> {
    const meals = this.items.filter((meal) => meal.userId.toString() === id)

    if (meals.length === 0) return null

    return meals
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

  async delete(meal: Meal) {
    const mealIndex = this.items.findIndex((item) => item.id === meal.id)

    this.items.splice(mealIndex, 1)
  }
}
