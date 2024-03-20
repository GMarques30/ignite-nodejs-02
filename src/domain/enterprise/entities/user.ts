import { Entity } from 'src/core/entities/entity'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { Optional } from 'src/core/types/optional'

export interface UserProps {
  name: string
  email: string
  password: string
  createdAt: Date
}

export class User extends Entity<UserProps> {
  static create(props: Optional<UserProps, 'createdAt'>, id?: UniqueEntityID) {
    const user = new User(
      {
        createdAt: props.createdAt ?? new Date(),
        ...props
      },
      id
    )
    return user
  }

  get name() {
    return this.name
  }

  get email() {
    return this.email
  }

  get password() {
    return this.password
  }

  get createdAt() {
    return this.createdAt
  }
}
