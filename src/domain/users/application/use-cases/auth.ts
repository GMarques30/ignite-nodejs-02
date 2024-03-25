import { Either, left, right } from 'src/core/either'
import { UserRepository } from '../repositories/user-repository'
import { WrongCredentialsError } from './errors/wrong-credentials-error'
import { HashComparer } from '../hasher/hash-comparer'
import { Encrypter } from '../hasher/encrypter'

interface AuthInput {
  email: string
  password: string
}

type AuthOutput = Either<
  WrongCredentialsError,
  {
    accessToken: string
  }
>

export class AuthUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter
  ) {}

  async execute({ email, password }: AuthInput): Promise<AuthOutput> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) return left(new WrongCredentialsError())

    const isValidPassword = await this.hashComparer.compare(
      password,
      user.password
    )

    if (!isValidPassword) return left(new WrongCredentialsError())

    const accessToken = await this.encrypter.encrypt({
      sub: user.id.toString()
    })

    return right({
      accessToken
    })
  }
}
