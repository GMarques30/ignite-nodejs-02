import { Entity } from 'src/core/entities/entity'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { Optional } from 'src/core/types/optional'

export interface MealProps {
  name: string
  description: string
  isInTheDiet: boolean
  createdAt: Date
  userId: UniqueEntityID
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

  set isInTheDiet(isInTheDiet: boolean) {
    this.props.isInTheDiet = isInTheDiet
  }

  get createdAt() {
    return this.props.createdAt
  }

  set createdAt(cretedAt: Date) {
    this.props.createdAt = this.createdAt
  }

  get userId() {
    return this.props.userId
  }
}
