import { Entity } from 'src/core/entities/entity'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { Optional } from 'src/core/types/optional'

export interface MealProps {
  name: string
  description: string
  isInTheDiet: boolean
  createdAt: Date
}

export class Meal extends Entity<MealProps> {
  static create(props: Optional<MealProps, 'createdAt'>, id?: UniqueEntityID) {
    const meal = new Meal(
      {
        ...props,
        createdAt: props.createdAt ?? new Date()
      },
      id
    )
    return meal
  }

  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get description() {
    return this.props.description
  }

  set description(description: string) {
    this.props.description = description
  }

  get isInTheDiet() {
    return this.props.isInTheDiet
  }

  changeIsInTheDiet() {
    this.props.isInTheDiet = !this.isInTheDiet
  }

  get createdAt() {
    return this.props.createdAt
  }
}
