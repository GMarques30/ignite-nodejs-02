import { Meal } from '../../enterprise/entities/meal'

export interface MealRepository {
  create(meal: Meal): Promise<void>
}
