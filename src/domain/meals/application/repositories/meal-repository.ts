import { Meal } from '../../enterprise/entities/meal'

export interface MealRepository {
  create(meal: Meal): Promise<void>
  findById(id: string): Promise<Meal | null>
  findMany(id: string): Promise<Meal[] | null>
  save(meal: Meal): Promise<void>
  delete(meal: Meal): Promise<void>
}
