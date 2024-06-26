import { Either, left, right } from 'src/core/either'
import { UserRepository } from '../repositories/user-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { HashGenerator } from '../hasher/hash-generator'
import { User } from '../../enterprise/entities/user'

interface CreateUserInput {
  name: string
  email: string
  password: string
}

type CreateUserOutput = Either<
  UserAlreadyExistsError,
  {
    user: User
  }
>

export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashGenerator: HashGenerator
  ) {}

  async execute({
    name,
    email,
    password
  }: CreateUserInput): Promise<CreateUserOutput> {
    const userAlreadyExists = await this.userRepository.findByEmail(email)

    if (userAlreadyExists) {
      return left(new UserAlreadyExistsError(email))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const user = User.create({
      name,
      email,
      password: hashedPassword
    })

    await this.userRepository.create(user)

    return right({
      user
    })
  }
}
