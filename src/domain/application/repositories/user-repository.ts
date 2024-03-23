import { User } from 'src/domain/enterprise/entities/user'

export interface UserRepository {
  create(user: User): Promise<void>
  findByEmail(email: string): Promise<User | null>
}
