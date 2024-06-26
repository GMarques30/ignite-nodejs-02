import { User } from '../../enterprise/entities/user'

export interface UserRepository {
  create(user: User): Promise<void>
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
}
