import { MealRepository } from 'src/domain/meals/application/repositories/meal-repository'
import { Meal } from 'src/domain/meals/enterprise/entities/meal'

export class InMemoryMealRepository implements MealRepository {
  public items: Meal[] = []

  async create(meal: Meal): Promise<void> {
    this.items.push(meal)
  }
}
