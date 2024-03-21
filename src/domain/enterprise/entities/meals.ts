import { Entity } from 'src/core/entities/entity'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { Optional } from 'src/core/types/optional'

export interface MealsProps {
  name: string
  description: string
  isInTheDiet: boolean
  createdAt: Date
}

export class Meals extends Entity<MealsProps> {
  static create(
    props: Optional<MealsProps, 'createdAt' | 'isInTheDiet'>,
    id?: UniqueEntityID
  ) {
    const meals = new Meals(
      {
        createdAt: props.createdAt ?? new Date(),
        isInTheDiet: true,
        ...props
      },
      id
    )
    return meals
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
